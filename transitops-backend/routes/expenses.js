const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

/**
 * GET /api/expenses
 * Fetches all expenses joined with vehicle details.
 */
router.get('/', verifyToken, (req, res) => {
  try {
    const expenses = db.prepare(`
      SELECT e.*, v.name as vehicle_name 
      FROM expenses e
      JOIN vehicles v ON e.vehicle_id = v.id
      ORDER BY e.date DESC, e.id DESC
    `).all();
    return res.json(expenses);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * POST /api/expenses
 * Logs an operational expense for a vehicle.
 */
router.post('/', verifyToken, (req, res) => {
  const { vehicle_id, type, amount, date } = req.body;

  if (vehicle_id === undefined || !type || amount === undefined) {
    return res.status(400).json({ error: true, message: "Missing required fields: vehicle_id, type, amount" });
  }

  try {
    const vehicle = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({ error: true, message: "Vehicle not found" });
    }

    const insertDate = date || new Date().toISOString().split('T')[0];

    const stmt = db.prepare(`
      INSERT INTO expenses (vehicle_id, type, amount, date)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(Number(vehicle_id), type, Number(amount), insertDate);

    return res.status(201).json({
      id: Number(info.lastInsertRowid),
      vehicle_id: Number(vehicle_id),
      type,
      amount: Number(amount),
      date: insertDate
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;
