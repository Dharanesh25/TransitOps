import React, { useState } from 'react';
import SidebarLayout from './SidebarLayout';
import KPIMetricsGrid from './KPIMetricsGrid';
import AnalyticsTable from './AnalyticsTable';

const DriversView = () => {
  const drivers = [
    { name: 'Michael Cole', avatar: 'MC', status: 'On Duty', vehicle: 'Volvo FH16', rating: '4.9', trip: 'Boston ➔ New York' },
    { name: 'Sarah Jenkins', avatar: 'SJ', status: 'On Duty', vehicle: 'Ford E-Transit', rating: '4.8', trip: 'Seattle ➔ Portland' },
    { name: 'David Smith', avatar: 'DS', status: 'On Break', vehicle: 'Mercedes Sprinter', rating: '4.7', trip: 'Rest Stop (I-95)' },
    { name: 'Emma Wilson', avatar: 'EW', status: 'Off Duty', vehicle: 'None', rating: '4.95', trip: 'N/A' },
    { name: 'Carlos Diaz', avatar: 'CD', status: 'On Duty', vehicle: 'Scania R500', rating: '4.6', trip: 'Miami ➔ Orlando' }
  ];

  return (
    <div className="bg-slate-950/45 border border-slate-800 rounded-2xl backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-slate-850">
        <h2 className="text-xl font-semibold text-white">Active Drivers Roster</h2>
        <p className="text-sm text-slate-500 mt-0.5">Real-time status tracking, active vehicle assignments, and ratings.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-850 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-900/30">
              <th className="py-4 px-6">Driver</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6">Assigned Vehicle</th>
              <th className="py-4 px-6">Current Trip / Location</th>
              <th className="py-4 px-6 text-center">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/50 text-sm text-slate-300">
            {drivers.map((driver, index) => (
              <tr key={index} className="hover:bg-slate-900/20 transition-colors">
                <td className="py-4.5 px-6 font-medium text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-sm text-indigo-400 border border-slate-700">
                      {driver.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{driver.name}</p>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">ID: DRV-00{index + 104}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4.5 px-6 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                    driver.status === 'On Duty' ? 'bg-emerald-500/10 text-emerald-400' :
                    driver.status === 'On Break' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${
                      driver.status === 'On Duty' ? 'bg-emerald-500' :
                      driver.status === 'On Break' ? 'bg-amber-500' :
                      'bg-slate-400'
                    }`} />
                    {driver.status}
                  </span>
                </td>
                <td className="py-4.5 px-6 text-slate-200">
                  {driver.vehicle}
                </td>
                <td className="py-4.5 px-6 text-slate-400 font-medium">
                  {driver.trip}
                </td>
                <td className="py-4.5 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-white">{driver.rating}</span>
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

const TripsView = () => {
  const trips = [
    { id: 'TRIP-9082', route: 'Chicago to Detroit', progress: 75, driver: 'Michael Cole', vehicle: 'Volvo FH16', status: 'In Transit', eta: '45 mins' },
    { id: 'TRIP-9083', route: 'Los Angeles to Phoenix', progress: 10, driver: 'Carlos Diaz', vehicle: 'Scania R500', status: 'In Transit', eta: '4 hrs 12 mins' },
    { id: 'TRIP-9084', route: 'Atlanta to Savannah', progress: 0, driver: 'Sarah Jenkins', vehicle: 'Ford E-Transit', status: 'Scheduled', eta: 'Departs 11:30 AM' },
    { id: 'TRIP-9085', route: 'Dallas to Houston', progress: 100, driver: 'Emma Wilson', vehicle: 'Rivian EDV', status: 'Completed', eta: 'Arrived' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Trips & Route Dispatches</h2>
          <p className="text-sm text-slate-500 mt-0.5">Live monitoring of logistics routes and delivery completions.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-slate-950/45 border border-slate-800 rounded-2xl p-6 space-y-4 backdrop-blur-md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                  {trip.id}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">{trip.route}</h3>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                trip.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400' :
                trip.status === 'Scheduled' ? 'bg-purple-500/10 text-purple-400' :
                'bg-emerald-500/10 text-emerald-400'
              }`}>
                {trip.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2 text-xs">
              <div>
                <p className="text-slate-500 font-medium">Driver</p>
                <p className="text-slate-200 font-semibold mt-0.5">{trip.driver}</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Vehicle</p>
                <p className="text-slate-200 font-semibold mt-0.5">{trip.vehicle}</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">ETA / Arrival</p>
                <p className="text-slate-200 font-semibold mt-0.5">{trip.eta}</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Status Update</p>
                <p className="text-slate-200 font-semibold mt-0.5">GPS signal active</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Progress</span>
                <span className="text-indigo-400">{trip.progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${trip.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExpensesView = () => {
  const expenses = [
    { id: 'EXP-1049', category: 'Fuel/Charging', vehicle: 'Volvo FH16', date: 'Jul 12, 2026', amount: 340.50, status: 'Paid' },
    { id: 'EXP-1050', category: 'Maintenance (Tires)', vehicle: 'Mercedes Sprinter', date: 'Jul 11, 2026', amount: 890.00, status: 'Paid' },
    { id: 'EXP-1051', category: 'Insurance Renewal', vehicle: 'Fleet Wide', date: 'Jul 10, 2026', amount: 4500.00, status: 'Pending' },
    { id: 'EXP-1052', category: 'Tolls', vehicle: 'Scania R500', date: 'Jul 09, 2026', amount: 45.20, status: 'Paid' },
    { id: 'EXP-1053', category: 'Charging Session', vehicle: 'Rivian EDV', date: 'Jul 09, 2026', amount: 22.80, status: 'Paid' }
  ];

  return (
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
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6 text-right">Amount</th>
              <th className="py-4 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/50 text-sm text-slate-300">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-slate-900/20 transition-colors">
                <td className="py-4.5 px-6 font-mono font-semibold text-white">
                  {expense.id}
                </td>
                <td className="py-4.5 px-6 text-slate-200">
                  {expense.category}
                </td>
                <td className="py-4.5 px-6 text-slate-400 font-medium">
                  {expense.vehicle}
                </td>
                <td className="py-4.5 px-6 text-slate-400 font-medium">
                  {expense.date}
                </td>
                <td className="py-4.5 px-6 text-right font-mono text-white font-semibold">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="py-4.5 px-6 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                    expense.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-amber-500/10 text-amber-400'
                  }`}>
                    {expense.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-8">
            <KPIMetricsGrid />
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Fleet Performance & ROI</h2>
                <p className="text-sm text-slate-500 mt-0.5">Filter, search, and analyze fuel efficiency and operational return rates.</p>
              </div>
              <AnalyticsTable />
            </div>
          </div>
        );
      case 'Vehicles':
        return <AnalyticsTable />;
      case 'Drivers':
        return <DriversView />;
      case 'Trips':
        return <TripsView />;
      case 'Expenses':
        return <ExpensesView />;
      default:
        return null;
    }
  };

  return (
    <SidebarLayout activeItem={activeTab} setActiveItem={setActiveTab}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{activeTab} Overview</h1>
          <p className="text-slate-400 mt-1">Real-time operational analytics and fleet logistics monitoring.</p>
        </div>
        {renderContent()}
      </div>
    </SidebarLayout>
  );
}

export default App;
