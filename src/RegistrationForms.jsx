import React, { useState } from 'react';

const RegistrationForms = () => {
  const [activeForm, setActiveForm] = useState('vehicle');
  const [formData, setFormData] = useState({
    registrationNumber: '',
    model: '',
    type: '',
    maxLoadCapacity: '',
    currentOdometer: '',
    acquisitionCost: '',
    vehicleStatus: '',
    fullName: '',
    licenseNumber: '',
    licenseCategory: '',
    licenseExpiryDate: '',
    contactNumber: '',
    safetyScore: '',
    driverStatus: ''
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({
      formType: activeForm,
      timestamp: new Date().toLocaleTimeString(),
      data: activeForm === 'vehicle' ? {
        registrationNumber: formData.registrationNumber,
        model: formData.model,
        type: formData.type,
        maxLoadCapacity: formData.maxLoadCapacity,
        currentOdometer: formData.currentOdometer,
        acquisitionCost: formData.acquisitionCost,
        vehicleStatus: formData.vehicleStatus
      } : {
        fullName: formData.fullName,
        licenseNumber: formData.licenseNumber,
        licenseCategory: formData.licenseCategory,
        licenseExpiryDate: formData.licenseExpiryDate,
        contactNumber: formData.contactNumber,
        safetyScore: formData.safetyScore,
        driverStatus: formData.driverStatus
      }
    });
  };

  const handleReset = () => {
    if (activeForm === 'vehicle') {
      setFormData((prev) => ({
        ...prev,
        registrationNumber: '',
        model: '',
        type: '',
        maxLoadCapacity: '',
        currentOdometer: '',
        acquisitionCost: '',
        vehicleStatus: ''
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        fullName: '',
        licenseNumber: '',
        licenseCategory: '',
        licenseExpiryDate: '',
        contactNumber: '',
        safetyScore: '',
        driverStatus: ''
      }));
    }
    setSubmittedData(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => {
            setActiveForm('vehicle');
            setSubmittedData(null);
          }}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-semibold text-sm transition-all ${
            activeForm === 'vehicle'
              ? 'border-blue-500 text-blue-400 bg-blue-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16V10a2 2 0 00-2-2h-4.24a2 2 0 00-1.42.59l-2.28 2.28A2 2 0 0110.24 11H9" />
          </svg>
          Vehicle Registration
        </button>
        <button
          onClick={() => {
            setActiveForm('driver');
            setSubmittedData(null);
          }}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-semibold text-sm transition-all ${
            activeForm === 'driver'
              ? 'border-blue-500 text-blue-400 bg-blue-500/5'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Driver Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-950/45 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {activeForm === 'vehicle' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Vehicle Details</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Register a new fleet asset with full specifications.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Registration Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      placeholder="e.g., TX-892-LOG"
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Model <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g., Volvo FH16 Globetrotter"
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none appearance-none"
                    >
                      <option value="" disabled className="bg-slate-950">Select Vehicle Type</option>
                      <option value="Semi-Truck" className="bg-slate-950">Semi-Truck</option>
                      <option value="Box Truck" className="bg-slate-950">Box Truck</option>
                      <option value="Delivery Van" className="bg-slate-950">Delivery Van</option>
                      <option value="Electric Van" className="bg-slate-950">Electric Van</option>
                      <option value="Flatbed" className="bg-slate-950">Flatbed</option>
                      <option value="SUV" className="bg-slate-950">SUV</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Max Load Capacity (kg) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="maxLoadCapacity"
                      value={formData.maxLoadCapacity}
                      onChange={handleChange}
                      placeholder="e.g., 18000"
                      required
                      min="1"
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Current Odometer <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="currentOdometer"
                      value={formData.currentOdometer}
                      onChange={handleChange}
                      placeholder="e.g., 124500"
                      required
                      min="0"
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Acquisition Cost <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="acquisitionCost"
                      value={formData.acquisitionCost}
                      onChange={handleChange}
                      placeholder="e.g., 145000"
                      required
                      min="1"
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="vehicleStatus"
                      value={formData.vehicleStatus}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none appearance-none"
                    >
                      <option value="" disabled className="bg-slate-950">Select Status</option>
                      <option value="Active" className="bg-slate-950">Active</option>
                      <option value="Maintenance" className="bg-slate-950">Maintenance</option>
                      <option value="Out of Service" className="bg-slate-950">Out of Service</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Driver Info</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Establish a new driver profile with safety parameters.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g., Michael Cole"
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      License Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="e.g., DL-981023A"
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      License Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="licenseCategory"
                      value={formData.licenseCategory}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none appearance-none"
                    >
                      <option value="" disabled className="bg-slate-950">Select Category</option>
                      <option value="Class A CDL" className="bg-slate-950">Class A CDL</option>
                      <option value="Class B CDL" className="bg-slate-950">Class B CDL</option>
                      <option value="Class C CDL" className="bg-slate-950">Class C CDL</option>
                      <option value="Standard Class D" className="bg-slate-950">Standard Class D</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      License Expiry Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="licenseExpiryDate"
                      value={formData.licenseExpiryDate}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Contact Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="e.g., +1 (555) 019-2834"
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Safety Score <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="safetyScore"
                      value={formData.safetyScore}
                      onChange={handleChange}
                      placeholder="e.g., 95"
                      required
                      min="0"
                      max="100"
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Status <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="driverStatus"
                      value={formData.driverStatus}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white rounded-xl py-2.5 px-3.5 transition-all outline-none appearance-none"
                    >
                      <option value="" disabled className="bg-slate-950">Select Status</option>
                      <option value="Active" className="bg-slate-950">Active</option>
                      <option value="On Break" className="bg-slate-950">On Break</option>
                      <option value="Off Duty" className="bg-slate-950">Off Duty</option>
                      <option value="Suspended" className="bg-slate-950">Suspended</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-900">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors text-sm font-semibold"
              >
                Reset Fields
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-950/50 active:scale-95 transition-all"
              >
                Submit Profile
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-950/45 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col h-full min-h-[300px]">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Live State Monitor
          </h3>
          <p className="text-xs text-slate-500 mt-1">Real-time visualization of single object state.</p>

          <div className="mt-4 flex-1 font-mono text-xs bg-slate-950 border border-slate-900 rounded-xl p-4 text-emerald-400 overflow-y-auto max-h-[400px]">
            <pre className="whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(
                activeForm === 'vehicle' ? {
                  registrationNumber: formData.registrationNumber,
                  model: formData.model,
                  type: formData.type,
                  maxLoadCapacity: formData.maxLoadCapacity,
                  currentOdometer: formData.currentOdometer,
                  acquisitionCost: formData.acquisitionCost,
                  vehicleStatus: formData.vehicleStatus
                } : {
                  fullName: formData.fullName,
                  licenseNumber: formData.licenseNumber,
                  licenseCategory: formData.licenseCategory,
                  licenseExpiryDate: formData.licenseExpiryDate,
                  contactNumber: formData.contactNumber,
                  safetyScore: formData.safetyScore,
                  driverStatus: formData.driverStatus
                },
                null,
                2
              )}
            </pre>
          </div>

          {submittedData && (
            <div className="mt-4 p-4 border border-emerald-500/20 bg-emerald-500/5 rounded-xl">
              <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Submission Received! ({submittedData.timestamp})
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Data was successfully bound to the React state and validated.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForms;
