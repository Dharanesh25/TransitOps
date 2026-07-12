const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

/**
 * GET /api/reports/kpis
 * Returns key operational metrics across the fleet.
 */
router.get('/kpis', verifyToken, (req, res) => {
  try {
    const activeVehicles = db.prepare("SELECT COUNT(*) as count FROM vehicles WHERE status = 'On Trip'").get().count;
    const availableVehicles = db.prepare("SELECT COUNT(*) as count FROM vehicles WHERE status = 'Available'").get().count;
    const vehiclesInMaintenance = db.prepare("SELECT COUNT(*) as count FROM vehicles WHERE status = 'In Shop'").get().count;
    const activeTrips = db.prepare("SELECT COUNT(*) as count FROM trips WHERE status = 'Dispatched'").get().count;
    const pendingTrips = db.prepare("SELECT COUNT(*) as count FROM trips WHERE status = 'Draft'").get().count;
    const driversOnDuty = db.prepare("SELECT COUNT(*) as count FROM drivers WHERE status IN ('Available', 'On Trip')").get().count;

    const totalVehicles = db.prepare("SELECT COUNT(*) as count FROM vehicles").get().count;
    const fleetUtilization = totalVehicles > 0 ? (activeVehicles / totalVehicles) * 100 : 0.0;

    return res.json({
      activeVehicles,
      availableVehicles,
      vehiclesInMaintenance,
      activeTrips,
      pendingTrips,
      driversOnDuty,
      fleetUtilization: Number(fleetUtilization.toFixed(2))
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * GET /api/reports/vehicle/:id
 * Returns fuel efficiency, total operational cost, and ROI for a specific vehicle.
 */
router.get('/vehicle/:id', verifyToken, (req, res) => {
  const vehicleId = req.params.id;

  try {
    const vehicle = db.prepare("SELECT * FROM vehicles WHERE id = ?").get(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: true, message: "Vehicle not found" });
    }

    // 1. Fuel efficiency: distance / fuel
    const tripsStats = db.prepare("SELECT SUM(planned_distance) as total_distance FROM trips WHERE vehicle_id = ? AND status = 'Completed'").get(vehicleId);
    const fuelStats = db.prepare("SELECT SUM(liters) as total_liters, SUM(cost) as total_cost FROM fuel_logs WHERE vehicle_id = ?").get(vehicleId);

    const totalDistance = tripsStats.total_distance || 0;
    const totalFuelLiters = fuelStats.total_liters || 0;
    const totalFuelCost = fuelStats.total_cost || 0;

    const fuelEfficiency = totalFuelLiters > 0 ? (totalDistance / totalFuelLiters) : 0;

    // 2. Operational Cost: SUM fuel + SUM maintenance + SUM expenses
    const maintenanceStats = db.prepare("SELECT SUM(cost) as total_maintenance FROM maintenance WHERE vehicle_id = ?").get(vehicleId);
    const expensesStats = db.prepare("SELECT SUM(amount) as total_expenses FROM expenses WHERE vehicle_id = ?").get(vehicleId);

    const totalMaintenanceCost = maintenanceStats.total_maintenance || 0;
    const totalExpenses = expensesStats.total_expenses || 0;

    const totalOperationalCost = totalFuelCost + totalMaintenanceCost + totalExpenses;

    // 3. ROI: (revenue - operational_cost) / acquisition_cost
    // revenue = SUM(planned_distance * 3.0) for Completed trips
    const revenue = totalDistance * 3.0;
    const acquisitionCost = vehicle.acquisition_cost || 1; // avoid divide by zero if not set or 0
    const roi = acquisitionCost > 0 ? ((revenue - totalOperationalCost) / acquisitionCost) * 100 : 0;

    return res.json({
      vehicleId: vehicle.id,
      regNumber: vehicle.reg_number,
      name: vehicle.name,
      fuelEfficiency: Number(fuelEfficiency.toFixed(2)),
      totalOperationalCost: Number(totalOperationalCost.toFixed(2)),
      roi: Number(roi.toFixed(2))
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * GET /api/reports/export/csv
 * Exports vehicles, trips, or expenses as structured CSV text without external libraries.
 */
router.get('/export/csv', verifyToken, (req, res) => {
  const { type } = req.query;

  if (!type || !['vehicles', 'trips', 'expenses'].includes(type)) {
    return res.status(400).json({ 
      error: true, 
      message: "Invalid or missing 'type' query parameter. Must be one of: vehicles, trips, expenses" 
    });
  }

  // Simple CSV escape helper
  function escapeCSV(val) {
    if (val === null || val === undefined) return '';
    let str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      str = '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  try {
    let rows = [];
    let headers = [];

    if (type === 'vehicles') {
      headers = ['ID', 'Registration Number', 'Name', 'Type', 'Max Load', 'Odometer', 'Acquisition Cost', 'Status', 'Region'];
      const data = db.prepare("SELECT * FROM vehicles").all();
      rows = data.map(v => [
        v.id, v.reg_number, v.name, v.type, v.max_load, v.odometer, v.acquisition_cost, v.status, v.region
      ]);
    } else if (type === 'trips') {
      headers = ['ID', 'Source', 'Destination', 'Vehicle ID', 'Driver ID', 'Cargo Weight', 'Planned Distance', 'Status', 'Created At', 'Dispatched At', 'Completed At', 'Final Odometer', 'Fuel Consumed'];
      const data = db.prepare("SELECT * FROM trips").all();
      rows = data.map(t => [
        t.id, t.source, t.destination, t.vehicle_id, t.driver_id, t.cargo_weight, t.planned_distance, t.status, t.created_at, t.dispatched_at, t.completed_at, t.final_odometer, t.fuel_consumed
      ]);
    } else if (type === 'expenses') {
      headers = ['ID', 'Vehicle ID', 'Type', 'Amount', 'Date'];
      const data = db.prepare("SELECT * FROM expenses").all();
      rows = data.map(e => [
        e.id, e.vehicle_id, e.type, e.amount, e.date
      ]);
    }

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(escapeCSV).join(','))
    ].join('\r\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=report_${type}_${Date.now()}.csv`);
    return res.send(csvContent);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;
