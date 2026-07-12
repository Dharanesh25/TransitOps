const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const dbPath = path.join(__dirname, 'transitops.db');
const db = new DatabaseSync(dbPath);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

// Polyfill transaction helper to match better-sqlite3's API
db.transaction = function(fn) {
  return function(...args) {
    db.exec('BEGIN TRANSACTION;');
    try {
      const result = fn(...args);
      db.exec('COMMIT;');
      return result;
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
  };
};

// Create tables on startup if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('Fleet Manager', 'Driver', 'Safety Officer', 'Financial Analyst')) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reg_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    max_load REAL NOT NULL,
    odometer REAL NOT NULL,
    acquisition_cost REAL NOT NULL,
    status TEXT CHECK(status IN ('Available', 'On Trip', 'In Shop', 'Retired')) NOT NULL DEFAULT 'Available',
    region TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    license_number TEXT UNIQUE NOT NULL,
    license_category TEXT NOT NULL,
    license_expiry TEXT NOT NULL, -- Format: YYYY-MM-DD
    contact TEXT NOT NULL,
    safety_score REAL NOT NULL DEFAULT 100.0,
    status TEXT CHECK(status IN ('Available', 'On Trip', 'Off Duty', 'Suspended')) NOT NULL DEFAULT 'Available'
  );

  CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    destination TEXT NOT NULL,
    vehicle_id INTEGER NOT NULL,
    driver_id INTEGER NOT NULL,
    cargo_weight REAL NOT NULL,
    planned_distance REAL NOT NULL,
    status TEXT CHECK(status IN ('Draft', 'Dispatched', 'Completed', 'Cancelled')) NOT NULL DEFAULT 'Draft',
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    dispatched_at TEXT,
    completed_at TEXT,
    final_odometer REAL,
    fuel_consumed REAL,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY(driver_id) REFERENCES drivers(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    cost REAL NOT NULL,
    status TEXT CHECK(status IN ('Open', 'Closed')) NOT NULL DEFAULT 'Open',
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    closed_at TEXT,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS fuel_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    liters REAL NOT NULL,
    cost REAL NOT NULL,
    date TEXT NOT NULL DEFAULT (date('now', 'localtime')),
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL DEFAULT (date('now', 'localtime')),
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
  );
`);

module.exports = db;
