import React from 'react';

const KPIMetricsGrid = ({ theme }) => {
  const isDark = theme === 'dark';

  const metrics = [
    {
      title: 'Active Vehicles',
      value: '142',
      change: '+4 vs yesterday',
      isPositive: true,
      color: isDark ? 'from-blue-500/20 to-indigo-500/5' : 'from-blue-500/8 to-indigo-500/3',
      borderColor: isDark ? 'group-hover:border-blue-500/50' : 'group-hover:border-blue-500/40',
      iconColor: isDark ? 'text-blue-400' : 'text-blue-600',
      bgColor: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16V10a2 2 0 00-2-2h-4.24a2 2 0 00-1.42.59l-2.28 2.28A2 2 0 0110.24 11H9" />
        </svg>
      )
    },
    {
      title: 'Available Vehicles',
      value: '28',
      change: 'Fully prepped',
      isPositive: true,
      color: isDark ? 'from-emerald-500/20 to-teal-500/5' : 'from-emerald-500/8 to-teal-500/3',
      borderColor: isDark ? 'group-hover:border-emerald-500/50' : 'group-hover:border-emerald-500/40',
      iconColor: isDark ? 'text-emerald-400' : 'text-emerald-600',
      bgColor: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Vehicles in Maintenance',
      value: '12',
      change: '3 scheduled today',
      isPositive: false,
      color: isDark ? 'from-amber-500/20 to-orange-500/5' : 'from-amber-500/8 to-orange-500/3',
      borderColor: isDark ? 'group-hover:border-amber-500/50' : 'group-hover:border-amber-500/40',
      iconColor: isDark ? 'text-amber-400' : 'text-amber-600',
      bgColor: isDark ? 'bg-amber-500/10' : 'bg-amber-50',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'Active Trips',
      value: '84',
      change: '+12% from last hour',
      isPositive: true,
      color: isDark ? 'from-blue-500/20 to-sky-500/5' : 'from-blue-500/8 to-sky-500/3',
      borderColor: isDark ? 'group-hover:border-blue-400/50' : 'group-hover:border-blue-400/40',
      iconColor: isDark ? 'text-sky-400' : 'text-sky-600',
      bgColor: isDark ? 'bg-sky-500/10' : 'bg-sky-50',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: 'Pending Trips',
      value: '19',
      change: 'Awaiting dispatch',
      isPositive: false,
      color: isDark ? 'from-violet-500/20 to-purple-500/5' : 'from-violet-500/8 to-purple-500/3',
      borderColor: isDark ? 'group-hover:border-violet-500/50' : 'group-hover:border-violet-500/40',
      iconColor: isDark ? 'text-violet-400' : 'text-violet-600',
      bgColor: isDark ? 'bg-violet-500/10' : 'bg-violet-50',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Drivers On Duty',
      value: '96',
      change: '8 standby drivers',
      isPositive: true,
      color: isDark ? 'from-indigo-500/20 to-purple-500/5' : 'from-indigo-500/8 to-purple-500/3',
      borderColor: isDark ? 'group-hover:border-indigo-500/50' : 'group-hover:border-indigo-500/40',
      iconColor: isDark ? 'text-indigo-400' : 'text-indigo-600',
      bgColor: isDark ? 'bg-indigo-500/10' : 'bg-indigo-50',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={metric.title}
            className={`group rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br animate-slide-up ${
              index === 0 ? '' : index === 1 ? 'delay-75' : index === 2 ? 'delay-150' : index === 3 ? 'delay-225' : 'delay-300'
            } ${
              isDark 
                ? `bg-slate-950/40 border-slate-850 hover:shadow-slate-950/40 ${metric.color} ${metric.borderColor}`
                : `bg-white/70 border-slate-200/80 hover:shadow-slate-200/30 ${metric.color} ${metric.borderColor}`
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <span className={`text-sm font-medium tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {metric.title}
                </span>
                <p className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {metric.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${metric.bgColor} ${metric.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                {metric.icon}
              </div>
            </div>
            
            <div className={`mt-4 pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-slate-900/60' : 'border-slate-100'}`}>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                {metric.change}
              </span>
              <span className={`flex items-center gap-1 font-semibold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Live Status
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
            </div>
          </div>
        ))}

        <div className={`group rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl col-span-1 sm:col-span-2 lg:col-span-3 bg-gradient-to-br animate-slide-up delay-300 ${
          isDark 
            ? 'bg-slate-950/40 border-slate-850 hover:shadow-slate-950/40 from-indigo-500/20 to-blue-500/5 hover:border-indigo-500/50'
            : 'bg-white/70 border-slate-200/80 hover:shadow-slate-200/30 from-indigo-50 to-blue-50/50 hover:border-indigo-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <span className={`text-sm font-medium tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Fleet Utilization (%)
              </span>
              <div className="flex items-baseline gap-2">
                <p className={`text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  87.4%
                </p>
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +2.1% this week
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-md w-full space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Target: 90%</span>
                <span className={isDark ? 'text-indigo-400' : 'text-indigo-600'}>87.4% Reached</span>
              </div>
              <div className={`h-3 w-full rounded-full overflow-hidden p-[2px] border ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-indigo-500/50" 
                  style={{ width: '87.4%' }}
                />
              </div>
            </div>

            <div className={`p-3.5 rounded-xl transition-transform duration-300 group-hover:scale-110 self-start sm:self-center ${
              isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
            }`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIMetricsGrid;
