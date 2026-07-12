import React, { useState, useEffect } from 'react';
import SidebarLayout from './SidebarLayout';
import KPIMetricsGrid from './KPIMetricsGrid';
import AnalyticsTable from './AnalyticsTable';
import RegistrationForms from './RegistrationForms';
import TripDispatchForm from './TripDispatchForm';
import LogsAndExpenses from './LogsAndExpenses';

<<<<<<< HEAD
const DriversView = ({ theme }) => {
  const isDark = theme === 'dark';
  const drivers = [
    { name: 'Michael Cole', avatar: 'MC', status: 'On Duty', vehicle: 'Volvo FH16', rating: '4.9', trip: 'Boston ➔ New York' },
    { name: 'Sarah Jenkins', avatar: 'SJ', status: 'On Duty', vehicle: 'Ford E-Transit', rating: '4.8', trip: 'Seattle ➔ Portland' },
    { name: 'David Smith', avatar: 'DS', status: 'On Break', vehicle: 'Mercedes Sprinter', rating: '4.7', trip: 'Rest Stop (I-95)' },
    { name: 'Emma Wilson', avatar: 'EW', status: 'Off Duty', vehicle: 'None', rating: '4.95', trip: 'N/A' },
    { name: 'Carlos Diaz', avatar: 'CD', status: 'On Duty', vehicle: 'Scania R500', rating: '4.6', trip: 'Miami ➔ Orlando' }
  ];
=======
const API_BASE = 'http://localhost:4000/api';
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683

const DriversView = ({ drivers = [] }) => {
  return (
<<<<<<< HEAD
    <div className={`border backdrop-blur-md rounded-2xl overflow-hidden shadow-lg animate-slide-up ${
      isDark ? 'bg-slate-950/45 border-slate-800' : 'bg-white/70 border-slate-200/80'
    }`}>
      <div className={`p-6 border-b ${isDark ? 'border-slate-900' : 'border-slate-200/80'}`}>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Active Drivers Roster</h2>
        <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Real-time status tracking, active vehicle assignments, and ratings.</p>
=======
    <div className="bg-slate-950/45 border border-slate-800 rounded-2xl backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-slate-850">
        <h2 className="text-xl font-semibold text-white">Active Drivers Roster</h2>
        <p className="text-sm text-slate-500 mt-0.5">Real-time status tracking, license category, and CDL expiry details.</p>
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b text-xs font-semibold uppercase tracking-wider text-slate-500 ${
              isDark ? 'border-slate-900 bg-slate-900/30' : 'border-slate-200/80 bg-slate-50'
            }`}>
              <th className="py-4 px-6">Driver</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6">License Details</th>
              <th className="py-4 px-6 text-center">Safety Score</th>
              <th className="py-4 px-6">Contact</th>
            </tr>
          </thead>
<<<<<<< HEAD
          <tbody className={`divide-y text-sm ${
            isDark ? 'divide-slate-900/60 text-slate-300' : 'divide-slate-200/60 text-slate-600'
          }`}>
            {drivers.map((driver, index) => (
              <tr key={index} className={isDark ? 'hover:bg-slate-900/20' : 'hover:bg-slate-50/50'}>
                <td className="py-4.5 px-6 font-medium">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border ${
                      isDark ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-slate-100 border-slate-200 text-indigo-600'
                    }`}>
                      {driver.avatar}
                    </div>
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-850'}`}>{driver.name}</p>
                      <p className={`text-xs font-normal mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>ID: DRV-00{index + 104}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4.5 px-6 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                    driver.status === 'On Duty' ? 'bg-emerald-500/10 text-emerald-500' :
                    driver.status === 'On Break' ? 'bg-amber-500/10 text-amber-500' :
                    isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      driver.status === 'On Duty' ? 'bg-emerald-500' :
                      driver.status === 'On Break' ? 'bg-amber-500' :
                      'bg-slate-400'
                    }`} />
                    {driver.status}
                  </span>
                </td>
                <td className={isDark ? 'text-slate-200 font-semibold' : 'text-slate-700 font-semibold'}>
                  {driver.vehicle}
                </td>
                <td className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {driver.trip}
                </td>
                <td className="py-4.5 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{driver.rating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TripsView = ({ theme }) => {
  const isDark = theme === 'dark';
  const trips = [
    { id: 'TRIP-9082', route: 'Chicago to Detroit', progress: 75, driver: 'Michael Cole', vehicle: 'Volvo FH16', status: 'In Transit', eta: '45 mins' },
    { id: 'TRIP-9083', route: 'Los Angeles to Phoenix', progress: 10, driver: 'Carlos Diaz', vehicle: 'Scania R500', status: 'In Transit', eta: '4 hrs 12 mins' },
    { id: 'TRIP-9084', route: 'Atlanta to Savannah', progress: 0, driver: 'Sarah Jenkins', vehicle: 'Ford E-Transit', status: 'Scheduled', eta: 'Departs 11:30 AM' },
    { id: 'TRIP-9085', route: 'Dallas to Houston', progress: 100, driver: 'Emma Wilson', vehicle: 'Rivian EDV', status: 'Completed', eta: 'Arrived' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Trips & Route Dispatches</h2>
        <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Live monitoring of logistics routes and delivery completions.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips.map((trip, index) => (
          <div key={trip.id} className={`border rounded-2xl p-6 space-y-4 backdrop-blur-md shadow-lg animate-slide-up ${
            index === 0 ? '' : index === 1 ? 'delay-75' : index === 2 ? 'delay-150' : 'delay-225'
          } ${
            isDark ? 'bg-slate-950/45 border-slate-800' : 'bg-white/70 border-slate-200/80'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200/80 text-slate-500'
                }`}>
                  {trip.id}
                </span>
                <h3 className={`text-lg font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-850'}`}>{trip.route}</h3>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                trip.status === 'In Transit' ? 'bg-blue-500/10 text-blue-500' :
                trip.status === 'Scheduled' ? 'bg-purple-500/10 text-purple-500' :
                'bg-emerald-500/10 text-emerald-500'
              }`}>
                {trip.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2 text-xs">
              <div>
                <p className={isDark ? 'text-slate-500 font-medium' : 'text-slate-400 font-semibold'}>Driver</p>
                <p className={`font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{trip.driver}</p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-500 font-medium' : 'text-slate-400 font-semibold'}>Vehicle</p>
                <p className={`font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{trip.vehicle}</p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-500 font-medium' : 'text-slate-400 font-semibold'}>ETA / Arrival</p>
                <p className={`font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{trip.eta}</p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-500 font-medium' : 'text-slate-400 font-semibold'}>Status Update</p>
                <p className={`font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>GPS signal active</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Progress</span>
                <span className={isDark ? 'text-indigo-400' : 'text-indigo-600'}>{trip.progress}%</span>
              </div>
              <div className={`h-2 w-full rounded-full overflow-hidden p-[1px] ${
                isDark ? 'bg-slate-900' : 'bg-slate-100'
              }`}>
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${trip.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
=======
          <tbody className="divide-y divide-slate-850/50 text-sm text-slate-300">
            {drivers.map((driver) => {
              const initials = driver.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
              return (
                <tr key={driver.id} className="hover:bg-slate-900/20 transition-colors">
                  <td className="py-4.5 px-6 font-medium text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-850 flex items-center justify-center font-bold text-sm text-indigo-400 border border-slate-700">
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold">{driver.name}</p>
                        <p className="text-xs text-slate-500 font-normal mt-0.5">ID: DRV-00{driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4.5 px-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                      driver.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400' :
                      driver.status === 'On Trip' ? 'bg-blue-500/10 text-blue-400' :
                      driver.status === 'Suspended' ? 'bg-rose-500/10 text-rose-455' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${
                        driver.status === 'Available' ? 'bg-emerald-500' :
                        driver.status === 'On Trip' ? 'bg-blue-500' :
                        driver.status === 'Suspended' ? 'bg-rose-500' :
                        'bg-slate-400'
                      }`} />
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-4.5 px-6 text-slate-200">
                    <p className="font-semibold text-xs text-indigo-300">{driver.license_category}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Num: {driver.license_number}</p>
                    <p className="text-[10px] text-slate-500">Expires: {driver.license_expiry}</p>
                  </td>
                  <td className="py-4.5 px-6 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-white">{driver.safety_score}</span>
                    </div>
                  </td>
                  <td className="py-4.5 px-6 text-slate-400 font-mono text-xs">
                    {driver.contact_number}
                  </td>
                </tr>
              );
            })}
            {drivers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">No drivers logged in database.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TripsView = ({ trips = [], vehicles = [], drivers = [], onDispatch, onComplete, onCancel }) => {
  const [completingTripId, setCompletingTripId] = useState(null);
  const [finalOdo, setFinalOdo] = useState('');
  const [fuelConsumed, setFuelConsumed] = useState('');

  const handleCompleteSubmit = (e, tripId) => {
    e.preventDefault();
    onComplete(tripId, { final_odometer: Number(finalOdo), fuel_consumed: Number(fuelConsumed) });
    setCompletingTripId(null);
    setFinalOdo('');
    setFuelConsumed('');
  };

  return (
    <div className="space-y-8">
      <TripDispatchForm vehicles={vehicles} drivers={drivers} onDispatch={onDispatch} />

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Active Trips & Route Dispatches</h2>
          <p className="text-sm text-slate-500 mt-0.5">Live monitoring of logistics routes and driver assignments.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip) => {
            const vehicleObj = vehicles.find(v => v.id === trip.vehicle_id);
            const driverObj = drivers.find(d => d.id === trip.driver_id);
            return (
              <div key={trip.id} className="bg-slate-950/45 border border-slate-800 rounded-2xl p-6 space-y-4 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                        TRIP-00{trip.id}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-2">{trip.source} ➔ {trip.destination}</h3>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                      trip.status === 'Dispatched' ? 'bg-blue-500/10 text-blue-400' :
                      trip.status === 'Draft' ? 'bg-purple-500/10 text-purple-400' :
                      trip.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {trip.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-2 text-xs">
                    <div>
                      <p className="text-slate-500 font-medium">Driver</p>
                      <p className="text-slate-200 font-semibold mt-0.5">{driverObj ? driverObj.name : 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Vehicle</p>
                      <p className="text-slate-200 font-semibold mt-0.5">{vehicleObj ? vehicleObj.name : 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Cargo Load</p>
                      <p className="text-slate-200 font-semibold mt-0.5">{trip.cargo_weight.toLocaleString()} kg</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Planned Distance</p>
                      <p className="text-slate-200 font-semibold mt-0.5">{trip.planned_distance} km</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 space-y-3">
                  {trip.status === 'Draft' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onDispatch(trip.id)}
                        className="flex-1 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                      >
                        Dispatch Route
                      </button>
                      <button
                        onClick={() => onCancel(trip.id)}
                        className="py-2 px-3 text-xs font-bold rounded-xl border border-slate-800 text-slate-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {trip.status === 'Dispatched' && completingTripId !== trip.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCompletingTripId(trip.id)}
                        className="flex-1 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                      >
                        Complete Delivery
                      </button>
                      <button
                        onClick={() => onCancel(trip.id)}
                        className="py-2 px-3 text-xs font-bold rounded-xl border border-slate-800 text-slate-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {completingTripId === trip.id && (
                    <form onSubmit={(e) => handleCompleteSubmit(e, trip.id)} className="space-y-3 p-3 bg-slate-900/50 border border-slate-800 rounded-xl">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Final Odometer (km)
                        </label>
                        <input
                          type="number"
                          value={finalOdo}
                          onChange={(e) => setFinalOdo(e.target.value)}
                          placeholder="e.g. 125000"
                          required
                          className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white rounded-lg p-1.5 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Fuel Consumed (Liters)
                        </label>
                        <input
                          type="number"
                          value={fuelConsumed}
                          onChange={(e) => setFuelConsumed(e.target.value)}
                          placeholder="e.g. 80"
                          required
                          className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white rounded-lg p-1.5 outline-none"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          className="flex-1 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setCompletingTripId(null)}
                          className="py-1.5 px-2.5 text-xs font-bold rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {trip.status === 'Completed' && (
                    <p className="text-xs text-slate-500 font-medium italic text-center">
                      Trip successfully completed and archived.
                    </p>
                  )}

                  {trip.status === 'Cancelled' && (
                    <p className="text-xs text-rose-500/70 font-medium italic text-center">
                      Trip was cancelled.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          {trips.length === 0 && (
            <div className="col-span-2 py-8 text-center text-slate-500 text-sm">No routes currently dispatched.</div>
          )}
        </div>
      </div>
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
    </div>
  );
};

<<<<<<< HEAD
const ExpensesView = ({ theme }) => {
  const isDark = theme === 'dark';
  const expenses = [
    { id: 'EXP-1049', category: 'Fuel/Charging', vehicle: 'Volvo FH16', date: 'Jul 12, 2026', amount: 340.50, status: 'Paid' },
    { id: 'EXP-1050', category: 'Maintenance (Tires)', vehicle: 'Mercedes Sprinter', date: 'Jul 11, 2026', amount: 890.00, status: 'Paid' },
    { id: 'EXP-1051', category: 'Insurance Renewal', vehicle: 'Fleet Wide', date: 'Jul 10, 2026', amount: 4500.00, status: 'Pending' },
    { id: 'EXP-1052', category: 'Tolls', vehicle: 'Scania R500', date: 'Jul 09, 2026', amount: 45.20, status: 'Paid' },
    { id: 'EXP-1053', category: 'Charging Session', vehicle: 'Rivian EDV', date: 'Jul 09, 2026', amount: 22.80, status: 'Paid' }
  ];

  return (
    <div className={`border backdrop-blur-md rounded-2xl overflow-hidden shadow-lg animate-slide-up ${
      isDark ? 'bg-slate-950/45 border-slate-800' : 'bg-white/70 border-slate-200/80'
    }`}>
      <div className={`p-6 border-b ${isDark ? 'border-slate-900' : 'border-slate-200/80'}`}>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Expense Ledger</h2>
        <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Detailed accounting of fuel, charging, tolls, and maintenance logs.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b text-xs font-semibold uppercase tracking-wider text-slate-500 ${
              isDark ? 'border-slate-900 bg-slate-900/30' : 'border-slate-200/80 bg-slate-50'
            }`}>
              <th className="py-4 px-6">Expense ID</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Vehicle</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6 text-right">Amount</th>
              <th className="py-4 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y text-sm ${
            isDark ? 'divide-slate-900/60 text-slate-300' : 'divide-slate-200/60 text-slate-600'
          }`}>
            {expenses.map((expense) => (
              <tr key={expense.id} className={isDark ? 'hover:bg-slate-900/20' : 'hover:bg-slate-50/50'}>
                <td className="py-4.5 px-6 font-mono font-semibold">
                  {expense.id}
                </td>
                <td className={isDark ? 'text-slate-200' : 'text-slate-700 font-semibold'}>
                  {expense.category}
                </td>
                <td className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>
                  {expense.vehicle}
                </td>
                <td className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>
                  {expense.date}
                </td>
                <td className={`py-4.5 px-6 text-right font-mono font-bold ${isDark ? 'text-white' : 'text-slate-850'}`}>
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="py-4.5 px-6 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                    expense.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' :
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {expense.status}
                  </span>
                </td>
=======
const ExpensesView = ({ expenses = [], vehicles = [], onAddExpense }) => {
  return (
    <div className="space-y-8">
      <LogsAndExpenses vehicles={vehicles} onAddExpense={onAddExpense} />

      <div className="bg-slate-950/45 border border-slate-800 rounded-2xl backdrop-blur-md overflow-hidden">
        <div className="p-6 border-b border-slate-850">
          <h2 className="text-xl font-semibold text-white">Expense Ledger</h2>
          <p className="text-sm text-slate-500 mt-0.5">Detailed accounting of fuel, charging, tolls, and maintenance logs.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-850 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-900/30">
                <th className="py-4 px-6">Expense ID</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Vehicle</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-center">Status</th>
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/50 text-sm text-slate-300">
              {expenses.map((expense) => {
                return (
                  <tr key={expense.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="py-4.5 px-6 font-mono font-semibold text-white">
                      EXP-00{expense.id}
                    </td>
                    <td className="py-4.5 px-6 text-slate-200">
                      {expense.type}
                    </td>
                    <td className="py-4.5 px-6 text-slate-400 font-medium">
                      {expense.vehicle_name || 'Fleet Wide'}
                    </td>
                    <td className="py-4.5 px-6 text-right font-mono text-white font-semibold">
                      ${expense.amount.toFixed(2)}
                    </td>
                    <td className="py-4.5 px-6 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400">
                        Paid
                      </span>
                    </td>
                  </tr>
                );
              })}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">No expenses logged in ledger.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [theme, setTheme] = useState('dark');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup states
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupName, setSignupName] = useState('');

  // Operational states
  const [kpis, setKpis] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email }));
        setToken(data.token);
        setUser({ id: data.id, name: data.name, email: data.email });
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (err) {
      setLoginError('Server connection error. Is backend running?');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (password.length < 6) {
      setLoginError('Password must be at least 6 characters long');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: signupName, email, password })
      });
      const data = await res.json();
      if (res.status === 201) {
        // Automatically login the user after successful register
        const resLogin = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const dataLogin = await resLogin.json();
        if (resLogin.status === 200) {
          localStorage.setItem('token', dataLogin.token);
          localStorage.setItem('user', JSON.stringify({ id: dataLogin.id, name: dataLogin.name, email: dataLogin.email }));
          setToken(dataLogin.token);
          setUser({ id: dataLogin.id, name: dataLogin.name, email: dataLogin.email });
          setIsSigningUp(false);
          setSignupName('');
        } else {
          setIsSigningUp(false);
          setLoginError('Account created successfully! Please sign in.');
        }
      } else {
        setLoginError(data.message || 'Registration failed');
      }
    } catch (err) {
      setLoginError('Server connection error. Is backend running?');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const fetchAllData = async () => {
    if (!token) return;
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // Parallel fetching
      const [resKpis, resVehicles, resDrivers, resTrips, resExpenses] = await Promise.all([
        fetch(`${API_BASE}/reports/kpis`, { headers }),
        fetch(`${API_BASE}/vehicles`, { headers }),
        fetch(`${API_BASE}/drivers`, { headers }),
        fetch(`${API_BASE}/trips`, { headers }),
        fetch(`${API_BASE}/expenses`, { headers })
      ]);

      if (resKpis.ok) setKpis(await resKpis.json());
      if (resVehicles.ok) setVehicles(await resVehicles.json());
      if (resDrivers.ok) setDrivers(await resDrivers.json());
      if (resTrips.ok) setTrips(await resTrips.json());
      if (resExpenses.ok) setExpenses(await resExpenses.json());
    } catch (err) {
      console.error("Data fetch error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllData();
    }
  }, [token]);

  // Trip dispatches
  const handleDispatchTrip = async (tripPayload) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      
      // 1. Create draft trip
      const resCreate = await fetch(`${API_BASE}/trips`, {
        method: 'POST',
        headers,
        body: JSON.stringify(tripPayload)
      });
      const dataCreate = await resCreate.json();

      if (resCreate.status === 201) {
        // 2. Dispatch trip
        const resDispatch = await fetch(`${API_BASE}/trips/${dataCreate.id}/dispatch`, {
          method: 'PATCH',
          headers
        });
        const dataDispatch = await resDispatch.json();
        
        if (resDispatch.status === 200) {
          fetchAllData();
        } else {
          alert(`Dispatch failed: ${dataDispatch.message}`);
        }
      } else {
        alert(`Creation failed: ${dataCreate.message}`);
      }
    } catch (err) {
      alert(`Network error: ${err.message}`);
    }
  };

  // Dispatch existing draft trip
  const handleDispatchDraft = async (tripId) => {
    try {
      const res = await fetch(`${API_BASE}/trips/${tripId}/dispatch`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchAllData();
      } else {
        const errData = await res.json();
        alert(`Dispatch failed: ${errData.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Complete active trip
  const handleCompleteTrip = async (tripId, completionPayload) => {
    try {
      const res = await fetch(`${API_BASE}/trips/${tripId}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(completionPayload)
      });
      if (res.ok) {
        fetchAllData();
      } else {
        const errData = await res.json();
        alert(`Completion failed: ${errData.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Cancel trip
  const handleCancelTrip = async (tripId) => {
    try {
      const res = await fetch(`${API_BASE}/trips/${tripId}/cancel`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchAllData();
      } else {
        const errData = await res.json();
        alert(`Cancellation failed: ${errData.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add fuel/maintenance/expense log
  const handleAddExpenseOrLog = async (logPayload) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      let endpoint = '';
      if (logPayload.logType === 'fuel') endpoint = '/fuel-logs';
      else if (logPayload.logType === 'maintenance') endpoint = '/maintenance';
      else endpoint = '/expenses';

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(logPayload)
      });

      if (res.ok) {
        fetchAllData();
      } else {
        const data = await res.json();
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert(`Network error: ${err.message}`);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center font-sans antialiased p-6">
        <div className="max-w-md w-full bg-slate-950/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-4">
              {isSigningUp ? 'Create Account' : 'TransitOps Portal'}
            </h1>
            <p className="text-sm text-slate-500">
              {isSigningUp ? 'Sign up to register as a fleet operator.' : 'Sign in to manage fleet telemetry and CDL logistics.'}
            </p>
          </div>

          {loginError && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-455 rounded-xl p-3 text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          {isSigningUp ? (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                  placeholder="e.g. Jane Doe"
                  className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. operator@transitops.com"
                  className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimum 6 characters"
                  className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-950/50 transition-all active:scale-98"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. fleetmanager@transitops.com"
                  className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-950/50 transition-all active:scale-98"
              >
                Sign In
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-slate-900 flex flex-col items-center gap-2.5 text-center">
            {isSigningUp ? (
              <button 
                onClick={() => { setIsSigningUp(false); setLoginError(''); }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
              >
                Already have an account? Sign In
              </button>
            ) : (
              <button 
                onClick={() => { setIsSigningUp(true); setLoginError(''); }}
                className="text-xs text-slate-400 hover:text-slate-300 font-semibold transition-colors cursor-pointer border border-slate-850 hover:border-slate-750 px-4 py-1.5 rounded-lg"
              >
                Create New Account (Sign Up)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-8">
<<<<<<< HEAD
            <KPIMetricsGrid theme={theme} />
=======
            <KPIMetricsGrid kpis={kpis} />
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
            <div className="space-y-4">
              <div>
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Fleet Performance & ROI</h2>
                <p className={`text-sm mt-0.5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Filter, search, and analyze fuel efficiency and operational return rates.</p>
              </div>
<<<<<<< HEAD
              <AnalyticsTable theme={theme} />
=======
              <AnalyticsTable token={token} />
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
            </div>
          </div>
        );
      case 'Vehicles':
<<<<<<< HEAD
        return <AnalyticsTable theme={theme} />;
      case 'Drivers':
        return <DriversView theme={theme} />;
      case 'Trips':
        return <TripsView theme={theme} />;
      case 'Expenses':
        return <ExpensesView theme={theme} />;
=======
        return <AnalyticsTable token={token} />;
      case 'Drivers':
        return <DriversView drivers={drivers} />;
      case 'Trips':
        return (
          <TripsView
            trips={trips}
            vehicles={vehicles}
            drivers={drivers}
            onDispatch={handleDispatchDraft}
            onComplete={handleCompleteTrip}
            onCancel={handleCancelTrip}
          />
        );
      case 'Expenses':
        return <ExpensesView expenses={expenses} vehicles={vehicles} onAddExpense={handleAddExpenseOrLog} />;
      case 'Forms':
        return <RegistrationForms token={token} onSuccess={fetchAllData} />;
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
      default:
        return null;
    }
  };

  const isDark = theme === 'dark';

  return (
<<<<<<< HEAD
    <SidebarLayout activeItem={activeTab} setActiveItem={setActiveTab} theme={theme} setTheme={setTheme}>
=======
    <SidebarLayout activeItem={activeTab} setActiveItem={setActiveTab} user={user} onLogout={handleLogout}>
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
      <div className="space-y-6">
        <div className="animate-slide-up">
          <h1 className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {activeTab} Overview
          </h1>
          <p className={`mt-1 transition-colors duration-300 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Real-time operational analytics and fleet logistics monitoring.
          </p>
        </div>
        <div key={activeTab}>
          {renderContent()}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default App;
