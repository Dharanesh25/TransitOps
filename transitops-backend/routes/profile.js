const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

/**
 * GET /api/profile
 * Returns the authenticated user's profile information.
 * Protected by verifyToken middleware.
 */
router.get('/', verifyToken, (req, res) => {
  const userId = req.user.id;

  try {
    const user = db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // Explicitly make sure rowid is cast to number if returned as BigInt
    return res.json({
      id: Number(user.id),
      name: user.name,
      email: user.email,
      created_at: user.created_at
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: `Server error retrieving profile: ${err.message}` });
  }
});

module.exports = router;
