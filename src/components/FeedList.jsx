import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://your-app.railway.app';

export default function FeedList() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/api/feeds`);
      setFeeds(response.data);
    } catch (error) {
      console.error('Error loading feeds:', error);
      setError('Failed to load feeds. Please check your API connection.');
    } finally {
      setLoading(false);
    }
  };

  const deleteFeed = async (feedId) => {
    if (window.confirm('Delete this feed?')) {
      try {
        await axios.delete(`${API_BASE}/api/feeds/${feedId}`);
        await loadFeeds();
      } catch (error) {
        console.error('Error deleting feed:', error);
        setError('Failed to delete feed.');
      }
    }
  };

  const testFeed = async (feedId) => {
    try {
      const response = await axios.get(`${API_BASE}/api/test-feed/${feedId}`);
      if (response.data.success) {
        alert('Feed test successful!');
      } else {
        alert('Feed test failed.');
      }
    } catch (error) {
      console.error('Error testing feed:', error);
      alert('Failed to test feed.');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-lg">Loading feeds...</div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
      <button 
        onClick={loadFeeds}
        className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">RSS Feeds ({feeds.length})</h2>
        <button 
          onClick={loadFeeds}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feeds.map(feed => (
          <div key={feed.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{feed.name}</h3>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p><strong>Type:</strong> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{feed.feed_type}</span></p>
              
              <p><strong>URL:</strong> 
                <a 
                  href={feed.rss_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 break-all ml-1"
                >
                  {feed.rss_url.substring(0, 40)}...
                </a>
              </p>
              
              <p><strong>Discord:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  feed.discord_webhook 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {feed.discord_webhook ? '✅ Configured' : '❌ Not set'}
                </span>
              </p>
              
              <p><strong>Last Updated:</strong> {new Date(feed.updated_at).toLocaleString()}</p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => testFeed(feed.id)}
                className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600"
              >
                Test Feed
              </button>
              <button 
                onClick={() => window.open(feed.rss_url, '_blank')}
                className="flex-1 bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
              >
                View RSS
              </button>
              <button 
                onClick={() => deleteFeed(feed.id)}
                className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {feeds.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No feeds configured yet.</div>
          <div className="text-gray-400 text-sm mt-2">Add feeds through your RSS Feed Monetization API.</div>
        </div>
      )}
    </div>
  );
}