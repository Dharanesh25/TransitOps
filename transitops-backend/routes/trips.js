const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireRole } = require('../middleware/auth');
const { canDispatch } = require('../services/rules');

/**
 * GET /api/trips
 * Fetches all trips.
 */
router.get('/', verifyToken, (req, res) => {
  const { status } = req.query;
  let sql = 'SELECT * FROM trips WHERE 1=1';
  const params = [];

  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }

  try {
    const trips = db.prepare(sql).all(...params);
    return res.json(trips);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * POST /api/trips
 * Creates a new trip (defaults to 'Draft' status). Limited to Fleet Manager.
 */
router.post('/', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const { source, destination, vehicle_id, driver_id, cargo_weight, planned_distance, status } = req.body;

  if (!source || !destination || vehicle_id === undefined || driver_id === undefined || cargo_weight === undefined || planned_distance === undefined) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  const initialStatus = status || 'Draft';
  const allowedStatuses = ['Draft', 'Dispatched', 'Completed', 'Cancelled'];
  if (!allowedStatuses.includes(initialStatus)) {
    return res.status(400).json({ 
      error: true, 
      message: `Invalid trip status. Must be one of: ${allowedStatuses.join(', ')}` 
    });
  }

  try {
    const vehicle = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ error: true, message: "Vehicle not found" });
    }

    const driver = db.prepare('SELECT id FROM drivers WHERE id = ?').get(driver_id);
    if (!driver) {
      return res.status(404).json({ error: true, message: "Driver not found" });
    }

    const stmt = db.prepare(`
      INSERT INTO trips (source, destination, vehicle_id, driver_id, cargo_weight, planned_distance, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(source, destination, Number(vehicle_id), Number(driver_id), Number(cargo_weight), Number(planned_distance), initialStatus);

    return res.status(201).json({
      id: Number(info.lastInsertRowid),
      source,
      destination,
      vehicle_id: Number(vehicle_id),
      driver_id: Number(driver_id),
      cargo_weight: Number(cargo_weight),
      planned_distance: Number(planned_distance),
      status: initialStatus
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * PATCH /api/trips/:id/dispatch
 * Dispatches a draft trip. Ensures vehicle, driver constraints.
 * Runs atomically inside a db.transaction.
 */
router.patch('/:id/dispatch', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const tripId = req.params.id;

  try {
    db.transaction(() => {
      // 1. Fetch trip details
      const trip = db.prepare('SELECT * FROM trips WHERE id = ?').get(tripId);
      if (!trip) {
        throw new Error("TRIP_NOT_FOUND");
      }

      if (trip.status !== 'Draft') {
        throw new Error(`TRIP_INVALID_STATUS: Trip must be in 'Draft' status to dispatch. Current: '${trip.status}'`);
      }

      // 2. Fetch vehicle and driver details
      const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(trip.vehicle_id);
      const driver = db.prepare('SELECT * FROM drivers WHERE id = ?').get(trip.driver_id);

      // 3. Centralized validation rules check
      const ruleResult = canDispatch(vehicle, driver, trip.cargo_weight);
      if (!ruleResult.ok) {
        throw new Error(`RULE_VIOLATION: ${ruleResult.reason}`);
      }

      // 4. Commit updates
      db.prepare(`
        UPDATE trips 
        SET status = 'Dispatched', dispatched_at = strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime') 
        WHERE id = ?
      `).run(tripId);

      db.prepare(`UPDATE vehicles SET status = 'On Trip' WHERE id = ?`).run(trip.vehicle_id);
      db.prepare(`UPDATE drivers SET status = 'On Trip' WHERE id = ?`).run(trip.driver_id);
    })();

    return res.json({ message: "Trip successfully dispatched" });
  } catch (err) {
    if (err.message === "TRIP_NOT_FOUND") {
      return res.status(404).json({ error: true, message: "Trip not found" });
    }
    if (err.message.startsWith("TRIP_INVALID_STATUS:") || err.message.startsWith("RULE_VIOLATION:")) {
      const msg = err.message.substring(err.message.indexOf(':') + 1).trim();
      return res.status(400).json({ error: true, message: msg });
    }
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * PATCH /api/trips/:id/complete
 * Completes a dispatched trip, updates odometer, inserts fuel log.
 * Runs atomically inside a db.transaction.
 */
router.patch('/:id/complete', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const tripId = req.params.id;
  const { final_odometer, fuel_consumed, fuel_cost } = req.body;

  if (final_odometer === undefined || fuel_consumed === undefined) {
    return res.status(400).json({ error: true, message: "Missing final_odometer or fuel_consumed" });
  }

  try {
    db.transaction(() => {
      // 1. Fetch trip details
      const trip = db.prepare('SELECT * FROM trips WHERE id = ?').get(tripId);
      if (!trip) {
        throw new Error("TRIP_NOT_FOUND");
      }

      if (trip.status !== 'Dispatched') {
        throw new Error(`TRIP_INVALID_STATUS: Trip must be in 'Dispatched' status to complete. Current: '${trip.status}'`);
      }

      // 2. Check odometer
      const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(trip.vehicle_id);
      if (Number(final_odometer) < Number(vehicle.odometer)) {
        throw new Error(`INVALID_ODOMETER: Final odometer (${final_odometer}) cannot be less than vehicle's current odometer (${vehicle.odometer})`);
      }

      // 3. Commit updates
      db.prepare(`
        UPDATE trips 
        SET status = 'Completed', 
            completed_at = strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'),
            final_odometer = ?,
            fuel_consumed = ?
        WHERE id = ?
      `).run(Number(final_odometer), Number(fuel_consumed), tripId);

      db.prepare(`UPDATE vehicles SET status = 'Available', odometer = ? WHERE id = ?`)
        .run(Number(final_odometer), trip.vehicle_id);

      db.prepare(`UPDATE drivers SET status = 'Available' WHERE id = ?`)
        .run(trip.driver_id);

      // Insert new fuel log record
      const liters = Number(fuel_consumed);
      const cost = fuel_cost !== undefined ? Number(fuel_cost) : liters * 1.50; // default cost multiplier
      db.prepare(`
        INSERT INTO fuel_logs (vehicle_id, liters, cost)
        VALUES (?, ?, ?)
      `).run(trip.vehicle_id, liters, cost);
    })();

    return res.json({ message: "Trip successfully completed and fuel log registered" });
  } catch (err) {
    if (err.message === "TRIP_NOT_FOUND") {
      return res.status(404).json({ error: true, message: "Trip not found" });
    }
    if (err.message.startsWith("TRIP_INVALID_STATUS:") || err.message.startsWith("INVALID_ODOMETER:")) {
      const msg = err.message.substring(err.message.indexOf(':') + 1).trim();
      return res.status(400).json({ error: true, message: msg });
    }
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * PATCH /api/trips/:id/cancel
 * Cancels a draft or dispatched trip.
 * Runs atomically inside a db.transaction.
 */
router.patch('/:id/cancel', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const tripId = req.params.id;

  try {
    db.transaction(() => {
      // 1. Fetch trip
      const trip = db.prepare('SELECT * FROM trips WHERE id = ?').get(tripId);
      if (!trip) {
        throw new Error("TRIP_NOT_FOUND");
      }

      if (trip.status === 'Completed' || trip.status === 'Cancelled') {
        throw new Error(`TRIP_INVALID_STATUS: Trip is already completed or cancelled. Current: '${trip.status}'`);
      }

      // 2. Perform updates
      db.prepare(`UPDATE trips SET status = 'Cancelled' WHERE id = ?`).run(tripId);

      // Revert vehicle and driver to 'Available' only if trip was in 'Dispatched' status
      if (trip.status === 'Dispatched') {
        db.prepare(`UPDATE vehicles SET status = 'Available' WHERE id = ?`).run(trip.vehicle_id);
        db.prepare(`UPDATE drivers SET status = 'Available' WHERE id = ?`).run(trip.driver_id);
      }
    })();

    return res.json({ message: "Trip successfully cancelled" });
  } catch (err) {
    if (err.message === "TRIP_NOT_FOUND") {
      return res.status(404).json({ error: true, message: "Trip not found" });
    }
    if (err.message.startsWith("TRIP_INVALID_STATUS:")) {
      const msg = err.message.substring(err.message.indexOf(':') + 1).trim();
      return res.status(400).json({ error: true, message: msg });
    }
    return res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;
