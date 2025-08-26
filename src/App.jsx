import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FeedList from './components/FeedList';
import AddFeedForm from './components/AddFeedForm';
import SystemStats from './components/SystemStats';

function App() {
  const [activeTab, setActiveTab] = useState('feeds');
  const [refreshFeeds, setRefreshFeeds] = useState(0);

  const handleFeedAdded = () => {
    setRefreshFeeds(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feeds':
        return <FeedList key={refreshFeeds} />;
      case 'add-feed':
        return <AddFeedForm onFeedAdded={handleFeedAdded} />;
      case 'stats':
        return <SystemStats />;
      default:
        return <FeedList key={refreshFeeds} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <div className="w-64 bg-white shadow-sm border-r border-gray-200">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('feeds')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'feeds' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📡 RSS Feeds
            </button>
            <button
              onClick={() => setActiveTab('add-feed')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'add-feed' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              ➕ Add Feed
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'stats' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📊 System Stats
            </button>
          </nav>
        </div>
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;