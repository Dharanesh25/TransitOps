const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireRole } = require('../middleware/auth');

/**
 * POST /api/maintenance
 * Logs a new maintenance event and sets vehicle status to 'In Shop'.
 * Runs atomically inside a db.transaction.
 */
router.post('/', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const { vehicle_id, type, cost, status } = req.body;

  if (vehicle_id === undefined || !type || cost === undefined) {
    return res.status(400).json({ error: true, message: "Missing required fields: vehicle_id, type, cost" });
  }

  const finalStatus = status === 'Closed' ? 'Closed' : 'Open';

  try {
    let newId;
    db.transaction(() => {
      // 1. Fetch vehicle status
      const vehicle = db.prepare('SELECT status FROM vehicles WHERE id = ?').get(vehicle_id);
      if (!vehicle) {
        throw new Error("VEHICLE_NOT_FOUND");
      }

      if (vehicle.status === 'Retired') {
        throw new Error("VEHICLE_RETIRED");
      }

      // 2. Insert maintenance record
      if (finalStatus === 'Closed') {
        const stmt = db.prepare(`
          INSERT INTO maintenance (vehicle_id, type, cost, status, closed_at)
          VALUES (?, ?, ?, 'Closed', strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
        `);
        const info = stmt.run(vehicle_id, type, Number(cost));
        newId = Number(info.lastInsertRowid);
      } else {
        const stmt = db.prepare(`
          INSERT INTO maintenance (vehicle_id, type, cost, status)
          VALUES (?, ?, ?, 'Open')
        `);
        const info = stmt.run(vehicle_id, type, Number(cost));
        newId = Number(info.lastInsertRowid);

        // 3. Update vehicle status to 'In Shop' only if it's Open
        db.prepare(`UPDATE vehicles SET status = 'In Shop' WHERE id = ?`).run(vehicle_id);
      }
    })();

    return res.status(201).json({
      id: newId,
      vehicle_id: Number(vehicle_id),
      type,
      cost: Number(cost),
      status: finalStatus
    });
  } catch (err) {
    if (err.message === "VEHICLE_NOT_FOUND") {
      return res.status(404).json({ error: true, message: "Vehicle not found" });
    }
    if (err.message === "VEHICLE_RETIRED") {
      return res.status(400).json({ error: true, message: "Cannot put a retired vehicle in maintenance" });
    }
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * PATCH /api/maintenance/:id/close
 * Closes maintenance log and updates vehicle status.
 * Runs atomically inside a db.transaction.
 */
router.patch('/:id/close', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const maintenanceId = req.params.id;

  try {
    db.transaction(() => {
      // 1. Fetch maintenance record
      const log = db.prepare('SELECT * FROM maintenance WHERE id = ?').get(maintenanceId);
      if (!log) {
        throw new Error("MAINTENANCE_NOT_FOUND");
      }

      if (log.status === 'Closed') {
        throw new Error("MAINTENANCE_ALREADY_CLOSED");
      }

      // 2. Close maintenance log
      db.prepare(`
        UPDATE maintenance 
        SET status = 'Closed', closed_at = strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime') 
        WHERE id = ?
      `).run(maintenanceId);

      // 3. Restore vehicle status unless it has been marked 'Retired'
      const vehicle = db.prepare('SELECT status FROM vehicles WHERE id = ?').get(log.vehicle_id);
      if (vehicle && vehicle.status !== 'Retired') {
        db.prepare(`UPDATE vehicles SET status = 'Available' WHERE id = ?`).run(log.vehicle_id);
      }
    })();

    return res.json({ message: "Maintenance record closed successfully" });
  } catch (err) {
    if (err.message === "MAINTENANCE_NOT_FOUND") {
      return res.status(404).json({ error: true, message: "Maintenance record not found" });
    }
    if (err.message === "MAINTENANCE_ALREADY_CLOSED") {
      return res.status(400).json({ error: true, message: "Maintenance record is already closed" });
    }
    return res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;
