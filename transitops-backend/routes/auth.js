const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is missing!");
}

/**
 * Helper to generate JWT for a user
 */
function generateToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

/**
 * POST /api/auth/signup
 * Registers a new user and returns a JWT token. (Legacy)
 */
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: true, message: "Missing required fields: name, email, password, role" });
  }

  const allowedRoles = ['Fleet Manager', 'Driver', 'Safety Officer', 'Financial Analyst'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ 
      error: true, 
      message: `Invalid role. Must be one of: ${allowedRoles.join(', ')}` 
    });
  }

  try {
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: true, message: "Email is already registered" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const stmt = db.prepare('INSERT INTO users (name, email, password_hash, role, password) VALUES (?, ?, ?, ?, ?)');
    const info = stmt.run(name, email, passwordHash, role, passwordHash);

    const newUser = {
      id: Number(info.lastInsertRowid),
      name,
      email,
      role
    };

    const token = generateToken(newUser);
    return res.status(201).json({ token, user: newUser });
  } catch (err) {
    return res.status(500).json({ error: true, message: `Server error during signup: ${err.message}` });
  }
});

/**
 * POST /api/auth/register
 * Validates inputs, hashes password, inserts user, returns success/error.
 */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: true, message: "Name, email, and password are required" });
  }

  // Basic email pattern check
  if (!email.includes('@') || email.length < 5) {
    return res.status(400).json({ error: true, message: "Invalid email address format" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: true, message: "Password must be at least 6 characters long" });
  }

  try {
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: true, message: "Email is already registered" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const stmt = db.prepare('INSERT INTO users (name, email, password_hash, password) VALUES (?, ?, ?, ?)');
    const info = stmt.run(name, email, passwordHash, passwordHash);

    const newUser = {
      id: Number(info.lastInsertRowid),
      name,
      email
    };

    return res.status(201).json({ 
      success: true,
      message: "User registered successfully", 
      user: newUser 
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: `Server error during registration: ${err.message}` });
  }
});

/**
 * POST /api/auth/login
 * Validates credentials and returns a JWT token.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: true, message: "Email and password are required" });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: true, message: "Invalid email or password" });
    }

    const hashToCheck = user.password || user.password_hash;
    if (!hashToCheck) {
      return res.status(401).json({ error: true, message: "Invalid email or password" });
    }

    const matches = await bcrypt.compare(password, hashToCheck);
    if (!matches) {
      return res.status(401).json({ error: true, message: "Invalid email or password" });
    }

    const token = generateToken(user);
    
    // Returns flat response properties while maintaining the nested "user" object for legacy support
    return res.json({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: `Server error during login: ${err.message}` });
  }
});

module.exports = router;
