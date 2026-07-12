import React, { useState } from 'react';

const TripDispatchForm = ({ vehicles = [], drivers = [], onDispatch }) => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    cargoWeight: '',
    plannedDistance: '',
    vehicleId: '',
    driverId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter for available assets
  const availableVehicles = vehicles.filter(v => v.status === 'Available');
  const availableDrivers = drivers.filter(d => d.status === 'Available');

  const selectedVehicle = vehicles.find((v) => String(v.id) === String(formData.vehicleId));
  const selectedCapacity = selectedVehicle ? selectedVehicle.max_load : 0;
  const isOverCapacity = formData.vehicleId && formData.cargoWeight && Number(formData.cargoWeight) > selectedCapacity;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOverCapacity) return;

    const selectedDriver = drivers.find((d) => String(d.id) === String(formData.driverId));
    
    if (onDispatch) {
      onDispatch({
        source: formData.source,
        destination: formData.destination,
        cargo_weight: Number(formData.cargoWeight),
        planned_distance: Number(formData.plannedDistance),
        vehicle_id: Number(formData.vehicleId),
        driver_id: Number(formData.driverId),
        driverName: selectedDriver ? selectedDriver.name : '',
        vehicleName: selectedVehicle ? selectedVehicle.name : ''
      });
    }

    setFormData({
      source: '',
      destination: '',
      cargoWeight: '',
      plannedDistance: '',
      vehicleId: '',
      driverId: ''
    });
  };

  return (
    <div className="bg-slate-950/45 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Dispatch New Trip</h3>
        <p className="text-xs text-slate-500 mt-0.5">Assign drivers, vehicles, and cargo loads to route networks.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Source
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="e.g., Chicago, IL"
              required
              className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Detroit, MI"
              required
              className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Cargo Weight (kg)
            </label>
            <input
              type="number"
              name="cargoWeight"
              value={formData.cargoWeight}
              onChange={handleChange}
              placeholder="e.g., 5000"
              required
              min="1"
              className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Planned Distance (km)
            </label>
            <input
              type="number"
              name="plannedDistance"
              value={formData.plannedDistance}
              onChange={handleChange}
              placeholder="e.g., 450"
              required
              min="1"
              className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Select Available Vehicle
            </label>
            <select
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none appearance-none"
            >
              <option value="" disabled className="bg-slate-950">Choose a vehicle</option>
              {availableVehicles.map((v) => (
                <option key={v.id} value={v.id} className="bg-slate-950">
                  {v.name} (Max: {v.max_load.toLocaleString()} kg)
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Select Available Driver
            </label>
            <select
              name="driverId"
              value={formData.driverId}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none appearance-none"
            >
              <option value="" disabled className="bg-slate-950">Choose a driver</option>
              {availableDrivers.map((d) => (
                <option key={d.id} value={d.id} className="bg-slate-950">
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isOverCapacity && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-450 rounded-xl p-4 text-xs font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Cargo exceeds vehicle capacity!
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isOverCapacity}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-650 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-lg shadow-blue-950/50 transition-all active:scale-98"
          >
            Dispatch Trip
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripDispatchForm;
