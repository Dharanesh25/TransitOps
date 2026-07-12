/**
 * Centralized business rules validation
 */

/**
 * Checks if a vehicle and driver can be dispatched for a trip with the given cargo weight.
 * 
 * @param {Object} vehicle - Vehicle db record
 * @param {Object} driver - Driver db record
 * @param {number} cargoWeight - Cargo weight for the trip
 * @returns {Object} { ok: boolean, reason?: string }
 */
function canDispatch(vehicle, driver, cargoWeight) {
  if (!vehicle) {
    return { ok: false, reason: "Vehicle record is missing" };
  }
  if (!driver) {
    return { ok: false, reason: "Driver record is missing" };
  }

  // Vehicle status checks: vehicle not Retired/In Shop/On Trip
  if (['Retired', 'In Shop', 'On Trip'].includes(vehicle.status)) {
    return { ok: false, reason: `Vehicle is in '${vehicle.status}' status and cannot be dispatched` };
  }

  // Driver status checks: driver not Suspended/On Trip
  if (['Suspended', 'On Trip'].includes(driver.status)) {
    return { ok: false, reason: `Driver is in '${driver.status}' status and cannot be dispatched` };
  }

  // License expiry checks: license_expiry in the future
  const todayStr = new Date().toISOString().split('T')[0];
  if (driver.license_expiry < todayStr) {
    return { ok: false, reason: `Driver's license has expired (Expiry: ${driver.license_expiry})` };
  }

  // Cargo weight check: cargoWeight <= max_load
  if (Number(cargoWeight) > Number(vehicle.max_load)) {
    return { 
      ok: false, 
      reason: `Cargo weight (${cargoWeight}) exceeds vehicle maximum load capacity (${vehicle.max_load})` 
    };
  }

  return { ok: true };
}

module.exports = {
  canDispatch
};
