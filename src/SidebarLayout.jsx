import React, { useState } from 'react';

<<<<<<< HEAD
const SidebarLayout = ({ children, activeItem, setActiveItem, theme, setTheme }) => {
=======
const SidebarLayout = ({ children, activeItem, setActiveItem, user, onLogout }) => {
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const userInitials = user && user.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'OP';

  const userRole = user && user.role ? user.role : 'Operator';
  const userName = user && user.name ? user.name : 'Operator';

  const navigation = [
    {
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    {
      name: 'Vehicles',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16V10a2 2 0 00-2-2h-4.24a2 2 0 00-1.42.59l-2.28 2.28A2 2 0 0110.24 11H9" />
        </svg>
      )
    },
    {
      name: 'Drivers',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: 'Trips',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      name: 'Expenses',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: 'Forms',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${
      isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100' : 'bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/70 text-slate-800'
    }`}>
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
            isDark ? 'bg-slate-950/60 backdrop-blur-sm' : 'bg-slate-900/40 backdrop-blur-sm'
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col backdrop-blur-md transition-all duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} ${
          isDark ? 'bg-slate-950/70 border-r border-slate-900' : 'bg-white/75 border-r border-slate-200/80'
        }`}
      >
        <div className={`h-16 flex items-center justify-between px-6 border-b ${
          isDark ? 'border-slate-900' : 'border-slate-200/80'
        }`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`font-bold text-lg tracking-tight transition-opacity duration-300 whitespace-nowrap ${
              isCollapsed ? 'lg:opacity-0 lg:w-0' : 'opacity-100'
            } ${
              isDark ? 'bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent' : 'text-slate-900'
            }`}>
              TransitOps
            </span>
          </div>

          {!isCollapsed && (
            <div className="hidden lg:flex items-center gap-1.5">
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isDark ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900' : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isDark ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setIsCollapsed(true)}
                className={`w-7-5 h-7.5 flex items-center justify-center rounded-lg border transition-colors cursor-pointer p-1.5 ${
                  isDark ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900' : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}

          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg border transition-colors cursor-pointer ${
                isDark ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900' : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveItem(item.name);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-r from-blue-600/10 to-indigo-600/5 text-blue-400 border border-blue-500/20'
                      : 'bg-gradient-to-r from-blue-600/10 to-indigo-600/5 text-blue-600 border border-blue-600/25'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md bg-blue-500" />
                )}
                <div className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive 
                    ? isDark ? 'text-blue-400' : 'text-blue-600'
                    : isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-700'
                }`}>
                  {item.icon}
                </div>
                <span className={`font-medium text-sm transition-opacity duration-300 whitespace-nowrap ${isCollapsed ? 'lg:opacity-0 lg:w-0' : 'opacity-100'}`}>
                  {item.name}
                </span>
                {isCollapsed && (
                  <div className={`absolute left-full ml-4 px-2.5 py-1.5 text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-50 ${
                    isDark ? 'bg-slate-950 border border-slate-800 text-slate-200' : 'bg-white border border-slate-200 text-slate-800'
                  }`}>
                    {item.name}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

<<<<<<< HEAD
        <div className={`p-4 border-t ${isDark ? 'border-slate-900' : 'border-slate-200/80'}`}>
          <div className={`flex items-center gap-3 p-2 rounded-xl transition-colors duration-200 group relative cursor-pointer ${
            isDark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-100/50'
          }`}>
            <div className="relative flex-shrink-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold border shadow-md ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                JD
=======
        <div className="p-4 border-t border-slate-850">
          <div 
            onClick={onLogout}
            title="Click to logout"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 group relative cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-slate-850 flex items-center justify-center text-sm font-semibold border border-slate-700 shadow-md text-indigo-400 group-hover:text-red-400 transition-colors">
                {userInitials}
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-transparent animate-pulse" />
            </div>
            <div className={`flex-1 min-w-0 transition-opacity duration-300 ${isCollapsed ? 'lg:opacity-0 lg:w-0' : 'opacity-100'}`}>
<<<<<<< HEAD
              <p className={`text-sm font-semibold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>John Doe</p>
              <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Fleet Manager</p>
            </div>
            {isCollapsed && (
              <div className={`absolute left-full ml-4 p-3 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-50 ${
                isDark ? 'bg-slate-950 border border-slate-800' : 'bg-white border border-slate-200'
              }`}>
                <p className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>John Doe</p>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Fleet Manager</p>
=======
              <p className="text-sm font-semibold text-slate-200 truncate group-hover:text-red-400 transition-colors">{userName}</p>
              <p className="text-xs text-slate-500 truncate group-hover:text-red-500/70 transition-colors">{userRole} (Sign Out)</p>
            </div>
            {isCollapsed && (
              <div className="absolute left-full ml-4 p-3 bg-slate-950 border border-red-500/20 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-50">
                <p className="text-sm font-semibold text-red-400">{userName}</p>
                <p className="text-xs text-red-500/70">Click to Logout</p>
>>>>>>> 4c1310019f515736fb9be4aa1646c8ec6341d683
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className={`h-16 flex items-center justify-between px-6 backdrop-blur-md border-b lg:hidden ${
          isDark ? 'bg-slate-950/50 border-slate-900' : 'bg-white/50 border-slate-200/85'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`font-bold text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>TransitOps</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
