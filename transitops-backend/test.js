const http = require('http');
const { execSync } = require('child_process');

// Helper to make API requests using standard node http module
function request(method, path, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let json = null;
        try {
          if (data) json = JSON.parse(data);
        } catch (e) {
          json = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, body: json });
      });
    });

    req.on('error', err => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("\n=================== STARTING TRANSITOPS BACKEND TESTS ===================");

  let token = '';

  try {
    // 1. Run seed script
    console.log("\n[Test Prep] Running seed.js to populate database...");
    execSync('node seed.js', { stdio: 'inherit' });
    console.log("[Test Prep] Seeding complete.");

    // 2. Test Login (Auth & JWT role token)
    console.log("\n[Test 1] POST /api/auth/login - Fleet Manager login");
    const loginRes = await request('POST', '/api/auth/login', {}, {
      email: 'fleetmanager@transitops.com',
      password: 'password123'
    });

    if (loginRes.status === 200 && loginRes.body.token) {
      token = loginRes.body.token;
      console.log(`  ✓ SUCCESS: Received token. Role: ${loginRes.body.user.role}`);
    } else {
      throw new Error(`Login failed: Status ${loginRes.status}, Body: ${JSON.stringify(loginRes.body)}`);
    }

    const authHeader = { 'Authorization': `Bearer ${token}` };

    // 3. Test Cargo overload validation (cargo > max_load)
    console.log("\n[Test 2] POST /api/trips - Attempting overload trip (Cargo 25,000 lbs on Volvo 15,000 lbs)");
    // Let's create the trip first (Draft)
    const tripOverloadRes = await request('POST', '/api/trips', authHeader, {
      source: 'Houston',
      destination: 'Austin',
      vehicle_id: 1, // Volvo FH16, max_load: 15000
      driver_id: 1,  // John Doe, Available
      cargo_weight: 25000,
      planned_distance: 160
    });

    if (tripOverloadRes.status !== 201) {
      throw new Error(`Creating overload trip failed: status ${tripOverloadRes.status}`);
    }

    const overloadTripId = tripOverloadRes.body.id;
    console.log(`  Draft Overload Trip created with ID ${overloadTripId}. Now attempting to dispatch...`);

    const dispatchOverloadRes = await request('PATCH', `/api/trips/${overloadTripId}/dispatch`, authHeader);
    if (dispatchOverloadRes.status === 400 && dispatchOverloadRes.body.error === true) {
      console.log(`  ✓ SUCCESS: Dispatch blocked with status 400. Reason: "${dispatchOverloadRes.body.message}"`);
    } else {
      throw new Error(`Overload dispatch did not return 400 error! Status: ${dispatchOverloadRes.status}, Body: ${JSON.stringify(dispatchOverloadRes.body)}`);
    }

    // 4. Test dispatch trip and status transitions
    console.log("\n[Test 3] PATCH /api/trips/:id/dispatch - Dispatching a valid draft trip");
    // Create valid draft trip
    const validTripRes = await request('POST', '/api/trips', authHeader, {
      source: 'Houston',
      destination: 'Austin',
      vehicle_id: 1, // Volvo, max_load: 15000
      driver_id: 1,  // John Doe, Available, license valid
      cargo_weight: 10000,
      planned_distance: 160
    });

    const tripId = validTripRes.body.id;
    console.log(`  Draft Trip created with ID ${tripId}. Dispatching...`);

    const dispatchRes = await request('PATCH', `/api/trips/${tripId}/dispatch`, authHeader);
    if (dispatchRes.status === 200) {
      console.log("  ✓ SUCCESS: Trip dispatched.");
    } else {
      throw new Error(`Dispatch failed: status ${dispatchRes.status}, body: ${JSON.stringify(dispatchRes.body)}`);
    }

    // Verify Vehicle & Driver statuses updated to 'On Trip'
    const vehicleRes = await request('GET', '/api/vehicles/1', authHeader);
    const driverRes = await request('GET', '/api/drivers/1', authHeader);

    if (vehicleRes.body.status === 'On Trip' && driverRes.body.status === 'On Trip') {
      console.log(`  ✓ SUCCESS: Vehicle 1 status is 'On Trip'. Driver 1 status is 'On Trip'.`);
    } else {
      throw new Error(`Incorrect statuses: Vehicle='${vehicleRes.body.status}', Driver='${driverRes.body.status}'`);
    }

    // 5. Test Double Dispatch attempt on the same vehicle
    console.log("\n[Test 4] PATCH /api/trips/:id/dispatch - Double dispatch attempt on Vehicle 1 (should fail)");
    // Create another trip using vehicle 1
    const secondTripRes = await request('POST', '/api/trips', authHeader, {
      source: 'Dallas',
      destination: 'Houston',
      vehicle_id: 1, // Already On Trip
      driver_id: 3,  // Bob Johnson (Off Duty)
      cargo_weight: 8000,
      planned_distance: 240
    });

    const secondTripId = secondTripRes.body.id;
    const doubleDispatchRes = await request('PATCH', `/api/trips/${secondTripId}/dispatch`, authHeader);

    if (doubleDispatchRes.status === 400 && doubleDispatchRes.body.error === true) {
      console.log(`  ✓ SUCCESS: Double dispatch blocked with status 400. Reason: "${doubleDispatchRes.body.message}"`);
    } else {
      throw new Error(`Double dispatch did not fail! Status: ${doubleDispatchRes.status}, Body: ${JSON.stringify(doubleDispatchRes.body)}`);
    }

    // 6. Test Trip Completion and state changes
    console.log("\n[Test 5] PATCH /api/trips/:id/complete - Completing active trip");
    const completeRes = await request('PATCH', `/api/trips/${tripId}/complete`, authHeader, {
      final_odometer: 12160.0, // Initial odometer was 12000
      fuel_consumed: 40.0
    });

    if (completeRes.status === 200) {
      console.log("  ✓ SUCCESS: Trip completed.");
    } else {
      throw new Error(`Completion failed: status ${completeRes.status}, body: ${JSON.stringify(completeRes.body)}`);
    }

    // Verify Vehicle & Driver are Available, odometer updated
    const completedVehicle = await request('GET', '/api/vehicles/1', authHeader);
    const completedDriver = await request('GET', '/api/drivers/1', authHeader);

    if (completedVehicle.body.status === 'Available' && completedVehicle.body.odometer === 12160) {
      console.log(`  ✓ SUCCESS: Vehicle 1 status reset to 'Available', odometer updated to 12160.`);
    } else {
      throw new Error(`Vehicle 1 state incorrect: Status='${completedVehicle.body.status}', Odo=${completedVehicle.body.odometer}`);
    }

    if (completedDriver.body.status === 'Available') {
      console.log(`  ✓ SUCCESS: Driver 1 status reset to 'Available'.`);
    } else {
      throw new Error(`Driver 1 status incorrect: ${completedDriver.body.status}`);
    }

    // 7. Test Maintenance Logging and exclusion from Available search
    console.log("\n[Test 6] POST /api/maintenance - Placing Vehicle 2 (Ford E-Transit) in maintenance");
    const mRes = await request('POST', '/api/maintenance', authHeader, {
      vehicle_id: 2, // Ford E-Transit (currently Available)
      type: 'Battery Diagnostic',
      cost: 250.0
    });

    if (mRes.status === 201) {
      console.log("  ✓ SUCCESS: Maintenance log created.");
    } else {
      throw new Error(`Maintenance creation failed: status ${mRes.status}, body: ${JSON.stringify(mRes.body)}`);
    }

    // Check vehicle status is 'In Shop'
    const shopVehicle = await request('GET', '/api/vehicles/2', authHeader);
    if (shopVehicle.body.status === 'In Shop') {
      console.log("  ✓ SUCCESS: Vehicle 2 status is now 'In Shop'.");
    } else {
      throw new Error(`Vehicle 2 status incorrect: ${shopVehicle.body.status}`);
    }

    // Search available vehicles
    const availVehiclesRes = await request('GET', '/api/vehicles?status=Available', authHeader);
    const inShopVehicle = availVehiclesRes.body.find(v => v.id === 2);
    if (!inShopVehicle) {
      console.log("  ✓ SUCCESS: Vehicle 2 in shop excluded from Available vehicles search query.");
    } else {
      throw new Error("Vehicle 2 is still showing up in 'Available' query results!");
    }

    // 8. Test Reports KPIs
    console.log("\n[Test 7] GET /api/reports/kpis - Verifying operational reports");
    const kpiRes = await request('GET', '/api/reports/kpis', authHeader);
    if (kpiRes.status === 200 && kpiRes.body.activeVehicles !== undefined && kpiRes.body.fleetUtilization !== undefined) {
      console.log("  ✓ SUCCESS: KPIs reports endpoint returns metrics successfully.");
      console.log("  Report Data:", JSON.stringify(kpiRes.body, null, 2));
    } else {
      throw new Error(`KPI request failed: status ${kpiRes.status}, body: ${JSON.stringify(kpiRes.body)}`);
    }

    // 9. Test vehicle reports and ROI
    console.log("\n[Test 8] GET /api/reports/vehicle/1 - Individual vehicle reports & ROI");
    const vehicleReport = await request('GET', '/api/reports/vehicle/1', authHeader);
    if (vehicleReport.status === 200) {
      console.log("  ✓ SUCCESS: Individual vehicle stats and ROI computed successfully.");
      console.log("  Report Data:", JSON.stringify(vehicleReport.body, null, 2));
    } else {
      throw new Error(`Vehicle report failed: status ${vehicleReport.status}, body: ${JSON.stringify(vehicleReport.body)}`);
    }

    // 10. Test CSV exports streaming
    console.log("\n[Test 9] GET /api/reports/export/csv?type=vehicles - Stream report");
    const csvReport = await request('GET', '/api/reports/export/csv?type=vehicles', authHeader);
    if (csvReport.status === 200 && csvReport.headers['content-type'].includes('text/csv')) {
      console.log("  ✓ SUCCESS: Exported CSV report streamed back successfully.");
      console.log("  CSV Snippet:\n" + csvReport.body.split('\n').slice(0, 3).join('\n'));
    } else {
      throw new Error(`CSV Export failed: status ${csvReport.status}, content-type: ${csvReport.headers['content-type']}`);
    }

    console.log("\n=================== ALL TESTS COMPLETED SUCCESSFULLY! ===================");
    process.exit(0);

  } catch (error) {
    console.error("\n❌ TEST FAILED:", error.message);
    process.exit(1);
  }
}

// Introduce brief timeout to allow server to boot if run in the same script,
// but since server.js runs as process we expect it to be running.
setTimeout(runTests, 1000);
