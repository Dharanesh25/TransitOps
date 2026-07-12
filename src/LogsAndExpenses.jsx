import React, { useState } from 'react';

const LogsAndExpenses = ({ vehicles = [], onAddExpense }) => {
  const [fuelForm, setFuelForm] = useState({
    vehicle: '',
    liters: '',
    cost: '',
    date: ''
  });

  const [maintenanceForm, setMaintenanceForm] = useState({
    vehicle: '',
    serviceType: '',
    cost: '',
    status: ''
  });

  const handleFuelChange = (e) => {
    const { name, value } = e.target;
    setFuelForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMaintenanceChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFuelSubmit = (e) => {
    e.preventDefault();
    if (onAddExpense) {
      onAddExpense({
        logType: 'fuel',
        vehicle_id: Number(fuelForm.vehicle),
        liters: Number(fuelForm.liters),
        cost: Number(fuelForm.cost),
        date: fuelForm.date
      });
    }
    setFuelForm({
      vehicle: '',
      liters: '',
      cost: '',
      date: ''
    });
  };

  const handleMaintenanceSubmit = (e) => {
    e.preventDefault();
    if (onAddExpense) {
      onAddExpense({
        logType: 'maintenance',
        vehicle_id: Number(maintenanceForm.vehicle),
        type: maintenanceForm.serviceType,
        cost: Number(maintenanceForm.cost),
        status: maintenanceForm.status === 'Active' ? 'Open' : 'Closed'
      });
    }
    setMaintenanceForm({
      vehicle: '',
      serviceType: '',
      cost: '',
      status: ''
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-950/45 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Quick Entry: Fuel Log
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Record liters consumed and purchase cost.</p>
          </div>

          <form onSubmit={handleFuelSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                Vehicle Select
              </label>
              <select
                name="vehicle"
                value={fuelForm.vehicle}
                onChange={handleFuelChange}
                required
                className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2 px-3 text-sm transition-all outline-none appearance-none"
              >
                <option value="" disabled className="bg-slate-950">Select Vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id} className="bg-slate-950">{v.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                  Liters Consumed
                </label>
                <input
                  type="number"
                  name="liters"
                  value={fuelForm.liters}
                  onChange={handleFuelChange}
                  placeholder="e.g., 85"
                  required
                  min="0.1"
                  step="0.01"
                  className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2 px-3 text-sm transition-all outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                  Fuel Cost ($)
                </label>
                <input
                  type="number"
                  name="cost"
                  value={fuelForm.cost}
                  onChange={handleFuelChange}
                  placeholder="e.g., 120.50"
                  required
                  min="0.1"
                  step="0.01"
                  className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2 px-3 text-sm transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                Entry Date
              </label>
              <input
                type="date"
                name="date"
                value={fuelForm.date}
                onChange={handleFuelChange}
                required
                className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2 px-3 text-sm transition-all outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-650 hover:bg-indigo-600 text-white font-semibold text-sm shadow-md transition-all active:scale-98"
              >
                Log Fuel Expense
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-slate-950/45 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Quick Entry: Maintenance Log
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Log garage repairs and maintenance events.</p>
          </div>

          <form onSubmit={handleMaintenanceSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                Vehicle Select
              </label>
              <select
                name="vehicle"
                value={maintenanceForm.vehicle}
                onChange={handleMaintenanceChange}
                required
                className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2 px-3 text-sm transition-all outline-none appearance-none"
              >
                <option value="" disabled className="bg-slate-950">Select Vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id} className="bg-slate-950">{v.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                Service Type
              </label>
              <input
                type="text"
                name="serviceType"
                value={maintenanceForm.serviceType}
                onChange={handleMaintenanceChange}
                placeholder="e.g., Brake Pad Replacement"
                required
                className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2 px-3 text-sm transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                  Cost ($)
                </label>
                <input
                  type="number"
                  name="cost"
                  value={maintenanceForm.cost}
                  onChange={handleMaintenanceChange}
                  placeholder="e.g., 450.00"
                  required
                  min="0.1"
                  step="0.01"
                  className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2 px-3 text-sm transition-all outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                  Log Status
                </label>
                <select
                  name="status"
                  value={maintenanceForm.status}
                  onChange={handleMaintenanceChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2 px-3 text-sm transition-all outline-none appearance-none"
                >
                  <option value="" disabled className="bg-slate-950">Select Status</option>
                  <option value="Active" className="bg-slate-950">Active</option>
                  <option value="Closed" className="bg-slate-950">Closed</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-650 hover:bg-emerald-600 text-white font-semibold text-sm shadow-md transition-all active:scale-98"
              >
                Log Maintenance Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogsAndExpenses;
