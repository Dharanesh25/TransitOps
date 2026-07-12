const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

/**
 * POST /api/fuel-logs
 * Logs a new fuel insertion for a vehicle.
 */
router.post('/', verifyToken, (req, res) => {
  const { vehicle_id, liters, cost, date } = req.body;

  if (vehicle_id === undefined || liters === undefined || cost === undefined) {
    return res.status(400).json({ error: true, message: "Missing required fields: vehicle_id, liters, cost" });
  }

  try {
    const vehicle = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ error: true, message: "Vehicle not found" });
    }

    const insertDate = date || new Date().toISOString().split('T')[0];

    const stmt = db.prepare(`
      INSERT INTO fuel_logs (vehicle_id, liters, cost, date)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(Number(vehicle_id), Number(liters), Number(cost), insertDate);

    return res.status(201).json({
      id: Number(info.lastInsertRowid),
      vehicle_id: Number(vehicle_id),
      liters: Number(liters),
      cost: Number(cost),
      date: insertDate
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;
