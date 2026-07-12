const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireRole } = require('../middleware/auth');

/**
 * GET /api/vehicles
 * Fetches all vehicles, optionally filtered by type, status, and region.
 */
router.get('/', verifyToken, (req, res) => {
  const { type, status, region } = req.query;
  
  let sql = 'SELECT * FROM vehicles WHERE 1=1';
  const params = [];

  if (type) {
    sql += ' AND type = ?';
    params.push(type);
  }
  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }
  if (region) {
    sql += ' AND region = ?';
    params.push(region);
  }

  try {
    const vehicles = db.prepare(sql).all(...params);

    const enhancedVehicles = vehicles.map(v => {
      // Fuel efficiency: completed trips planned distance / fuel logs liters
      const tripsStats = db.prepare("SELECT SUM(planned_distance) as total_distance FROM trips WHERE vehicle_id = ? AND status = 'Completed'").get(v.id);
      const fuelStats = db.prepare("SELECT SUM(liters) as total_liters, SUM(cost) as total_cost FROM fuel_logs WHERE vehicle_id = ?").get(v.id);

      const totalDistance = tripsStats.total_distance || 0;
      const totalFuelLiters = fuelStats.total_liters || 0;
      const totalFuelCost = fuelStats.total_cost || 0;

      const fuelEfficiency = totalFuelLiters > 0 ? (totalDistance / totalFuelLiters) : 0;

      // Operational Cost: SUM fuel + SUM maintenance + SUM expenses
      const maintenanceStats = db.prepare("SELECT SUM(cost) as total_maintenance FROM maintenance WHERE vehicle_id = ?").get(v.id);
      const expensesStats = db.prepare("SELECT SUM(amount) as total_expenses FROM expenses WHERE vehicle_id = ?").get(v.id);

      const totalMaintenanceCost = maintenanceStats.total_maintenance || 0;
      const totalExpenses = expensesStats.total_expenses || 0;

      const totalOperationalCost = totalFuelCost + totalMaintenanceCost + totalExpenses;

      // ROI = (revenue - operational_cost) / acquisition_cost
      const revenue = totalDistance * 3.0;
      const acquisitionCost = v.acquisition_cost || 1;
      const roi = acquisitionCost > 0 ? ((revenue - totalOperationalCost) / acquisitionCost) * 100 : 0;

      return {
        id: Number(v.id),
        reg_number: v.reg_number,
        name: v.name,
        type: v.type,
        max_load: Number(v.max_load),
        odometer: Number(v.odometer),
        acquisition_cost: Number(v.acquisition_cost),
        status: v.status,
        region: v.region,
        efficiency: fuelEfficiency > 0 ? `${fuelEfficiency.toFixed(1)} km/L` : 'N/A',
        cost: totalOperationalCost,
        roi: Number(roi.toFixed(1))
      };
    });

    return res.json(enhancedVehicles);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * GET /api/vehicles/:id
 * Fetches a single vehicle by ID.
 */
router.get('/:id', verifyToken, (req, res) => {
  try {
    const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: true, message: "Vehicle not found" });
    }
    return res.json(vehicle);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * POST /api/vehicles
 * Creates a new vehicle record. Limited to Fleet Manager.
 */
router.post('/', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const { reg_number, name, type, max_load, odometer, acquisition_cost, status, region } = req.body;

  if (!reg_number || !name || !type || max_load === undefined || odometer === undefined || acquisition_cost === undefined || !region) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  const initialStatus = status || 'Available';
  const allowedStatuses = ['Available', 'On Trip', 'In Shop', 'Retired'];
  if (!allowedStatuses.includes(initialStatus)) {
    return res.status(400).json({ 
      error: true, 
      message: `Invalid vehicle status. Must be one of: ${allowedStatuses.join(', ')}` 
    });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO vehicles (reg_number, name, type, max_load, odometer, acquisition_cost, status, region)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(reg_number, name, type, Number(max_load), Number(odometer), Number(acquisition_cost), initialStatus, region);
    
    return res.status(201).json({
      id: Number(info.lastInsertRowid),
      reg_number,
      name,
      type,
      max_load: Number(max_load),
      odometer: Number(odometer),
      acquisition_cost: Number(acquisition_cost),
      status: initialStatus,
      region
    });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: true, message: `Vehicle with registration number '${reg_number}' already exists.` });
    }
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * PUT /api/vehicles/:id
 * Updates an existing vehicle record. Limited to Fleet Manager.
 */
router.put('/:id', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const { reg_number, name, type, max_load, odometer, acquisition_cost, status, region } = req.body;

  if (!reg_number || !name || !type || max_load === undefined || odometer === undefined || acquisition_cost === undefined || !status || !region) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  const allowedStatuses = ['Available', 'On Trip', 'In Shop', 'Retired'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ 
      error: true, 
      message: `Invalid vehicle status. Must be one of: ${allowedStatuses.join(', ')}` 
    });
  }

  try {
    const existing = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: true, message: "Vehicle not found" });
    }

    const stmt = db.prepare(`
      UPDATE vehicles
      SET reg_number = ?, name = ?, type = ?, max_load = ?, odometer = ?, acquisition_cost = ?, status = ?, region = ?
      WHERE id = ?
    `);
    stmt.run(reg_number, name, type, Number(max_load), Number(odometer), Number(acquisition_cost), status, region, req.params.id);

    return res.json({
      id: Number(req.params.id),
      reg_number,
      name,
      type,
      max_load: Number(max_load),
      odometer: Number(odometer),
      acquisition_cost: Number(acquisition_cost),
      status,
      region
    });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: true, message: `Vehicle with registration number '${reg_number}' already exists.` });
    }
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * DELETE /api/vehicles/:id
 * Deletes an existing vehicle. Limited to Fleet Manager.
 */
router.delete('/:id', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  try {
    const existing = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: true, message: "Vehicle not found" });
    }

    db.prepare('DELETE FROM vehicles WHERE id = ?').run(req.params.id);
    return res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;
