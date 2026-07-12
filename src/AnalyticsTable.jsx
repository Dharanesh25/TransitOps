import React, { useState, useEffect } from 'react';

const displayStatus = (status) => {
  if (status === 'Available' || status === 'On Trip') return 'Active';
  if (status === 'In Shop') return 'Maintenance';
  return 'Idle';
};

const AnalyticsTable = ({ token, theme }) => {
  const [vehicles, setVehicles] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const isDark = theme === 'dark';

  const fetchVehicles = async () => {
    if (!token) return;
    setLoading(true);
    try {
      let url = 'http://localhost:4000/api/vehicles';
      const queryParams = [];
      if (typeFilter !== 'All') queryParams.push(`type=${typeFilter}`);
      if (statusFilter !== 'All') {
        const backendStatus = statusFilter === 'Active' ? 'Available' : (statusFilter === 'Maintenance' ? 'In Shop' : 'Retired');
        queryParams.push(`status=${backendStatus}`);
      }
      if (regionFilter !== 'All') queryParams.push(`region=${regionFilter}`);
      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }

      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setVehicles(data);
      }
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [typeFilter, statusFilter, regionFilter, token]);

  const filteredVehicles = vehicles.filter((vehicle) => {
    return vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleExportCSV = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:4000/api/reports/export/csv?type=vehicles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `TransitOps_Fleet_Report_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("CSV Export failed:", err);
    }
  };

  return (
    <div className={`border backdrop-blur-md rounded-2xl overflow-hidden shadow-lg animate-slide-up delay-75 ${
      isDark ? 'bg-slate-950/45 border-slate-800' : 'bg-white/70 border-slate-200/80'
    }`}>
      <div className={`p-6 border-b flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between ${
        isDark ? 'border-slate-900' : 'border-slate-200/80'
      }`}>
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search fleet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm transition-colors focus:outline-none focus:border-blue-500/50 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500' 
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="flex flex-wrap gap-2.5">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className={`border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <option value="All">All Types</option>
              <option value="Truck">Trucks</option>
              <option value="Van">Vans</option>
              <option value="EV">EVs</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Idle">Idle</option>
            </select>

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className={`border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <option value="All">All Regions</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 cursor-pointer active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b text-xs font-semibold uppercase tracking-wider text-slate-500 ${
              isDark ? 'border-slate-900 bg-slate-900/30' : 'border-slate-200/80 bg-slate-50'
            }`}>
              <th className="py-4 px-6">Vehicle</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-center">Region</th>
              <th className="py-4 px-6 text-right">Fuel Efficiency</th>
              <th className="py-4 px-6 text-right">Operational Cost</th>
              <th className="py-4 px-6 text-center">ROI Index</th>
            </tr>
          </thead>
          <tbody className={`divide-y text-sm ${
            isDark ? 'divide-slate-900/60 text-slate-300' : 'divide-slate-200/60 text-slate-600'
          }`}>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className={isDark ? 'hover:bg-slate-900/20' : 'hover:bg-slate-50/50'}>
                  <td className="py-4.5 px-6 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <div>
                        <p className={isDark ? 'text-white' : 'text-slate-800 font-semibold'}>{vehicle.name}</p>
                        <p className={`text-xs font-normal mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{vehicle.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4.5 px-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                      displayStatus(vehicle.status) === 'Active' ? 'bg-emerald-500/10 text-emerald-450' :
                      displayStatus(vehicle.status) === 'Maintenance' ? 'bg-amber-500/10 text-amber-450' :
                      isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${
                        displayStatus(vehicle.status) === 'Active' ? 'bg-emerald-500' :
                        displayStatus(vehicle.status) === 'Maintenance' ? 'bg-amber-500' :
                        'bg-slate-400'
                      }`} />
                      {displayStatus(vehicle.status)}
                    </span>
                  </td>
                  <td className={`py-4.5 px-6 text-center font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {vehicle.region}
                  </td>
                  <td className={`py-4.5 px-6 text-right font-mono ${isDark ? 'text-slate-200' : 'text-slate-700 font-semibold'}`}>
                    {vehicle.efficiency}
                  </td>
                  <td className={`py-4.5 px-6 text-right font-mono ${isDark ? 'text-slate-200' : 'text-slate-700 font-semibold'}`}>
                    ${vehicle.cost.toLocaleString()}/mo
                  </td>
                  <td className="py-4.5 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                        vehicle.roi >= 200 ? 'text-emerald-500 bg-emerald-500/5' :
                        vehicle.roi >= 120 ? 'text-blue-500 bg-blue-500/5' :
                        'text-amber-500 bg-amber-500/5'
                      }`}>
                        {vehicle.roi}%
                      </span>
                      <div className={`w-16 h-1.5 rounded-full overflow-hidden p-[1px] ${
                        isDark ? 'bg-slate-900' : 'bg-slate-100'
                      }`}>
                        <div
                          className={`h-full rounded-full ${
                            vehicle.roi >= 200 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                            vehicle.roi >= 120 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                            'bg-gradient-to-r from-amber-500 to-orange-400'
                          }`}
                          style={{ width: `${Math.min(vehicle.roi / 4, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  <svg className="w-10 h-10 mx-auto text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No matching vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsTable;
