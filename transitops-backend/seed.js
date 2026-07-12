const bcrypt = require('bcryptjs');
const db = require('./db');

console.log("[TransitOps Seed] Starting database seeding...");

try {
  // Clear tables
  db.prepare("DELETE FROM expenses").run();
  db.prepare("DELETE FROM fuel_logs").run();
  db.prepare("DELETE FROM maintenance").run();
  db.prepare("DELETE FROM trips").run();
  db.prepare("DELETE FROM drivers").run();
  db.prepare("DELETE FROM vehicles").run();
  db.prepare("DELETE FROM users").run();
  try {
    db.exec("DROP TABLE IF EXISTS users;");
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT CHECK(role IN ('Fleet Manager', 'Driver', 'Safety Officer', 'Financial Analyst')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (e) {
    console.error("Error recreating users table:", e);
  }
  try {
    db.prepare("DELETE FROM sqlite_sequence").run();
  } catch (e) {
    // Ignore error if sqlite_sequence doesn't exist yet
  }
  console.log("[TransitOps Seed] Cleared existing tables and auto-increment sequences.");

  // 1. Seed Users (one for each role, password: password123)
  const roles = ['Fleet Manager', 'Driver', 'Safety Officer', 'Financial Analyst'];
  const userStmt = db.prepare(`
    INSERT INTO users (name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
  `);

  roles.forEach(role => {
    const email = `${role.toLowerCase().replace(/\s+/g, '')}@transitops.com`;
    const passwordHash = bcrypt.hashSync('password123', 10);
    userStmt.run(role, email, passwordHash, role);
    console.log(`[TransitOps Seed] Seeded User: ${role} (${email})`);
  });

  // 2. Seed 5 demo vehicles (mixed statuses)
  const vehicles = [
    { reg_number: 'TX-8088', name: 'Volvo FH16 Heavy', type: 'Truck', max_load: 15000, odometer: 12000, acquisition_cost: 95000, status: 'Available', region: 'North' },
    { reg_number: 'TX-3022', name: 'Ford E-Transit EV', type: 'EV', max_load: 3000, odometer: 800, acquisition_cost: 45000, status: 'Available', region: 'West' },
    { reg_number: 'TX-9988', name: 'Mercedes Sprinter', type: 'Van', max_load: 3500, odometer: 42000, acquisition_cost: 38000, status: 'On Trip', region: 'South' },
    { reg_number: 'TX-1122', name: 'Scania R500 Heavy', type: 'Truck', max_load: 18000, odometer: 185000, acquisition_cost: 110000, status: 'In Shop', region: 'East' },
    { reg_number: 'TX-0000', name: 'Retired Peterbilt', type: 'Truck', max_load: 16000, odometer: 450000, acquisition_cost: 120000, status: 'Retired', region: 'North' }
  ];

  const vehicleStmt = db.prepare(`
    INSERT INTO vehicles (reg_number, name, type, max_load, odometer, acquisition_cost, status, region)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seededVehicles = [];
  vehicles.forEach(v => {
    const info = vehicleStmt.run(v.reg_number, v.name, v.type, v.max_load, v.odometer, v.acquisition_cost, v.status, v.region);
    seededVehicles.push({ id: Number(info.lastInsertRowid), ...v });
    console.log(`[TransitOps Seed] Seeded Vehicle: ${v.name} (Reg: ${v.reg_number}, Status: ${v.status})`);
  });

  // 3. Seed 5 demo drivers (mixed statuses, one expired, one suspended)
  const drivers = [
    { name: 'John Doe', license_number: 'LIC-001', license_category: 'Class A CDL', license_expiry: '2028-12-31', contact: '+1-555-0101', safety_score: 95.0, status: 'Available' },
    { name: 'Jane Smith', license_number: 'LIC-002', license_category: 'Class B CDL', license_expiry: '2029-06-30', contact: '+1-555-0102', safety_score: 98.5, status: 'On Trip' },
    { name: 'Bob Johnson', license_number: 'LIC-003', license_category: 'Standard', license_expiry: '2027-04-15', contact: '+1-555-0103', safety_score: 90.0, status: 'Off Duty' },
    { name: 'Suspended Driver', license_number: 'LIC-004', license_category: 'Class A CDL', license_expiry: '2028-01-01', contact: '+1-555-0104', safety_score: 45.0, status: 'Suspended' },
    { name: 'Expired License Driver', license_number: 'LIC-005', license_category: 'Class B CDL', license_expiry: '2025-05-20', contact: '+1-555-0105', safety_score: 88.0, status: 'Available' }
  ];

  const driverStmt = db.prepare(`
    INSERT INTO drivers (name, license_number, license_category, license_expiry, contact, safety_score, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const seededDrivers = [];
  drivers.forEach(d => {
    const info = driverStmt.run(d.name, d.license_number, d.license_category, d.license_expiry, d.contact, d.safety_score, d.status);
    seededDrivers.push({ id: Number(info.lastInsertRowid), ...d });
    console.log(`[TransitOps Seed] Seeded Driver: ${d.name} (License: ${d.license_number}, Status: ${d.status})`);
  });

  // Map helper
  const vMap = {}; seededVehicles.forEach(v => { vMap[v.reg_number] = v.id; });
  const dMap = {}; seededDrivers.forEach(d => { dMap[d.license_number] = d.id; });

  // 4. Seed Trips (Completed, Dispatched, Draft)
  // Completed trip
  db.prepare(`
    INSERT INTO trips (source, destination, vehicle_id, driver_id, cargo_weight, planned_distance, status, created_at, dispatched_at, completed_at, final_odometer, fuel_consumed)
    VALUES ('Austin', 'Houston', ?, ?, 6000, 160.0, 'Completed', '2026-07-10 08:00:00', '2026-07-10 08:15:00', '2026-07-10 11:30:00', 12160.0, 48.0)
  `).run(vMap['TX-8088'], dMap['LIC-001']);

  // Dispatched trip
  db.prepare(`
    INSERT INTO trips (source, destination, vehicle_id, driver_id, cargo_weight, planned_distance, status, created_at, dispatched_at)
    VALUES ('Houston', 'Dallas', ?, ?, 3200, 240.0, 'Dispatched', '2026-07-12 09:00:00', '2026-07-12 09:10:00')
  `).run(vMap['TX-9988'], dMap['LIC-002']);

  // Draft trip
  db.prepare(`
    INSERT INTO trips (source, destination, vehicle_id, driver_id, cargo_weight, planned_distance, status)
    VALUES ('Dallas', 'Austin', ?, ?, 2500, 195.0, 'Draft')
  `).run(vMap['TX-8088'], dMap['LIC-001']);
  console.log("[TransitOps Seed] Seeded 3 trips.");

  // 5. Seed Maintenance (In Shop vehicle has open log, Completed vehicle has closed log)
  db.prepare(`
    INSERT INTO maintenance (vehicle_id, type, cost, status, created_at)
    VALUES (?, 'Routine Engine Service', 500.0, 'Open', '2026-07-11 14:00:00')
  `).run(vMap['TX-1122']);

  db.prepare(`
    INSERT INTO maintenance (vehicle_id, type, cost, status, created_at, closed_at)
    VALUES (?, 'Brake Replacement', 350.0, 'Closed', '2026-07-01 09:00:00', '2026-07-01 17:00:00')
  `).run(vMap['TX-8088']);
  console.log("[TransitOps Seed] Seeded 2 maintenance logs.");

  // 6. Seed Fuel logs (for operational cost stats)
  db.prepare(`
    INSERT INTO fuel_logs (vehicle_id, liters, cost, date)
    VALUES (?, 48.0, 72.0, '2026-07-10')
  `).run(vMap['TX-8088']);
  console.log("[TransitOps Seed] Seeded 1 fuel log.");

  // 7. Seed Expenses
  db.prepare(`
    INSERT INTO expenses (vehicle_id, type, amount, date)
    VALUES (?, 'Highway Tolls', 45.0, '2026-07-10')
  `).run(vMap['TX-8088']);
  console.log("[TransitOps Seed] Seeded 1 expense log.");

  console.log("[TransitOps Seed] Seeding completed successfully!");
} catch (error) {
  console.error("[TransitOps Seed] Database seeding aborted with error:", error);
  process.exit(1);
}
