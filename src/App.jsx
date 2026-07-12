import React, { useState } from 'react';
import SidebarLayout from './SidebarLayout';
import KPIMetricsGrid from './KPIMetricsGrid';
import AnalyticsTable from './AnalyticsTable';

const DriversView = ({ theme }) => {
  const isDark = theme === 'dark';
  const drivers = [
    { name: 'Michael Cole', avatar: 'MC', status: 'On Duty', vehicle: 'Volvo FH16', rating: '4.9', trip: 'Boston ➔ New York' },
    { name: 'Sarah Jenkins', avatar: 'SJ', status: 'On Duty', vehicle: 'Ford E-Transit', rating: '4.8', trip: 'Seattle ➔ Portland' },
    { name: 'David Smith', avatar: 'DS', status: 'On Break', vehicle: 'Mercedes Sprinter', rating: '4.7', trip: 'Rest Stop (I-95)' },
    { name: 'Emma Wilson', avatar: 'EW', status: 'Off Duty', vehicle: 'None', rating: '4.95', trip: 'N/A' },
    { name: 'Carlos Diaz', avatar: 'CD', status: 'On Duty', vehicle: 'Scania R500', rating: '4.6', trip: 'Miami ➔ Orlando' }
  ];

  return (
    <div className={`border backdrop-blur-md rounded-2xl overflow-hidden shadow-lg animate-slide-up ${
      isDark ? 'bg-slate-950/45 border-slate-800' : 'bg-white/70 border-slate-200/80'
    }`}>
      <div className={`p-6 border-b ${isDark ? 'border-slate-900' : 'border-slate-200/80'}`}>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Active Drivers Roster</h2>
        <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Real-time status tracking, active vehicle assignments, and ratings.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b text-xs font-semibold uppercase tracking-wider text-slate-500 ${
              isDark ? 'border-slate-900 bg-slate-900/30' : 'border-slate-200/80 bg-slate-50'
            }`}>
              <th className="py-4 px-6">Driver</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6">Assigned Vehicle</th>
              <th className="py-4 px-6">Current Trip / Location</th>
              <th className="py-4 px-6 text-center">Rating</th>
            </tr>
          </thead>
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
    </div>
  );
};

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
  const [theme, setTheme] = useState('dark');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-8">
            <KPIMetricsGrid theme={theme} />
            <div className="space-y-4">
              <div>
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Fleet Performance & ROI</h2>
                <p className={`text-sm mt-0.5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Filter, search, and analyze fuel efficiency and operational return rates.</p>
              </div>
              <AnalyticsTable theme={theme} />
            </div>
          </div>
        );
      case 'Vehicles':
        return <AnalyticsTable theme={theme} />;
      case 'Drivers':
        return <DriversView theme={theme} />;
      case 'Trips':
        return <TripsView theme={theme} />;
      case 'Expenses':
        return <ExpensesView theme={theme} />;
      default:
        return null;
    }
  };

  const isDark = theme === 'dark';

  return (
    <SidebarLayout activeItem={activeTab} setActiveItem={setActiveTab} theme={theme} setTheme={setTheme}>
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
