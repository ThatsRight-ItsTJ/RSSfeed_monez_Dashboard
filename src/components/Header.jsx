import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">📡</div>
          <h1 className="text-2xl font-bold text-gray-900">RSS Feed Monetization Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Manage your RSS feeds and monitor system performance
          </div>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;