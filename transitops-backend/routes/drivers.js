const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireRole } = require('../middleware/auth');

/**
 * GET /api/drivers
 * Fetches all drivers.
 */
router.get('/', verifyToken, (req, res) => {
  const { status } = req.query;
  let sql = 'SELECT * FROM drivers WHERE 1=1';
  const params = [];

  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }

  try {
    const drivers = db.prepare(sql).all(...params);
    return res.json(drivers);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * GET /api/drivers/:id
 * Fetches a single driver by ID.
 */
router.get('/:id', verifyToken, (req, res) => {
  try {
    const driver = db.prepare('SELECT * FROM drivers WHERE id = ?').get(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: true, message: "Driver not found" });
    }
    return res.json(driver);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * POST /api/drivers
 * Creates a new driver. Limited to Fleet Manager.
 */
router.post('/', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const { name, license_number, license_category, license_expiry, contact, safety_score, status } = req.body;

  if (!name || !license_number || !license_category || !license_expiry || !contact) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  const initialStatus = status || 'Available';
  const allowedStatuses = ['Available', 'On Trip', 'Off Duty', 'Suspended'];
  if (!allowedStatuses.includes(initialStatus)) {
    return res.status(400).json({ 
      error: true, 
      message: `Invalid driver status. Must be one of: ${allowedStatuses.join(', ')}` 
    });
  }

  const score = safety_score === undefined ? 100.0 : Number(safety_score);

  try {
    const stmt = db.prepare(`
      INSERT INTO drivers (name, license_number, license_category, license_expiry, contact, safety_score, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(name, license_number, license_category, license_expiry, contact, score, initialStatus);

    return res.status(201).json({
      id: Number(info.lastInsertRowid),
      name,
      license_number,
      license_category,
      license_expiry,
      contact,
      safety_score: score,
      status: initialStatus
    });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: true, message: `Driver with license number '${license_number}' already exists.` });
    }
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * PUT /api/drivers/:id
 * Updates an existing driver. Limited to Fleet Manager.
 */
router.put('/:id', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  const { name, license_number, license_category, license_expiry, contact, safety_score, status } = req.body;

  if (!name || !license_number || !license_category || !license_expiry || !contact || !status) {
    return res.status(400).json({ error: true, message: "Missing required fields" });
  }

  const allowedStatuses = ['Available', 'On Trip', 'Off Duty', 'Suspended'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ 
      error: true, 
      message: `Invalid driver status. Must be one of: ${allowedStatuses.join(', ')}` 
    });
  }

  const score = safety_score === undefined ? 100.0 : Number(safety_score);

  try {
    const existing = db.prepare('SELECT id FROM drivers WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: true, message: "Driver not found" });
    }

    const stmt = db.prepare(`
      UPDATE drivers
      SET name = ?, license_number = ?, license_category = ?, license_expiry = ?, contact = ?, safety_score = ?, status = ?
      WHERE id = ?
    `);
    stmt.run(name, license_number, license_category, license_expiry, contact, score, status, req.params.id);

    return res.json({
      id: Number(req.params.id),
      name,
      license_number,
      license_category,
      license_expiry,
      contact,
      safety_score: score,
      status
    });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: true, message: `Driver with license number '${license_number}' already exists.` });
    }
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * DELETE /api/drivers/:id
 * Deletes an existing driver. Limited to Fleet Manager.
 */
router.delete('/:id', verifyToken, requireRole('Fleet Manager'), (req, res) => {
  try {
    const existing = db.prepare('SELECT id FROM drivers WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: true, message: "Driver not found" });
    }

    db.prepare('DELETE FROM drivers WHERE id = ?').run(req.params.id);
    return res.json({ message: "Driver deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;
