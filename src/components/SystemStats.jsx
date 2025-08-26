import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://your-app.railway.app';

export default function SystemStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      setError(null);
      const response = await axios.get(`${API_BASE}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
      setError('Failed to load system statistics.');
    } finally {
      setLoading(false);
    }
  };

  const triggerProcessing = async () => {
    try {
      const response = await axios.post(`${API_BASE}/trigger-processing`);
      if (response.data.success) {
        alert('Processing triggered successfully!');
        loadStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error triggering processing:', error);
      alert('Failed to trigger processing.');
    }
  };

  const cleanupCache = async () => {
    try {
      await axios.post(`${API_BASE}/cache/cleanup`);
      alert('Cache cleanup completed!');
      loadStats(); // Refresh stats
    } catch (error) {
      console.error('Error cleaning cache:', error);
      alert('Failed to cleanup cache.');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-32">
      <div className="text-lg">Loading system statistics...</div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {error}
      <button 
        onClick={loadStats}
        className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">System Statistics</h2>
        <div className="space-x-2">
          <button 
            onClick={triggerProcessing}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Trigger Processing
          </button>
          <button 
            onClick={cleanupCache}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Cleanup Cache
          </button>
          <button 
            onClick={loadStats}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* System Info */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">System</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Uptime:</strong> {Math.floor(stats?.system?.uptime / 3600)}h {Math.floor((stats?.system?.uptime % 3600) / 60)}m</p>
            <p><strong>Environment:</strong> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{stats?.system?.environment}</span></p>
            <p><strong>Node Version:</strong> {stats?.system?.nodeVersion}</p>
          </div>
        </div>

        {/* Processing Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Processing</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Interval:</strong> {stats?.config?.processingInterval} min</p>
            <p><strong>Total Processed:</strong> {stats?.processing?.totalProcessed || 0}</p>
            <p><strong>Last Run:</strong> {stats?.processing?.lastRun ? new Date(stats.processing.lastRun).toLocaleString() : 'Never'}</p>
          </div>
        </div>

        {/* Cache Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Cache</h3>
          <div className="space-y-2 text-sm">
            <p><strong>TTL:</strong> {stats?.config?.cacheTTL} min</p>
            <p><strong>Hits:</strong> {stats?.cache?.hits || 0}</p>
            <p><strong>Misses:</strong> {stats?.cache?.misses || 0}</p>
            <p><strong>Size:</strong> {stats?.cache?.size || 0} items</p>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Rate Limits</h3>
          <div className="space-y-2 text-sm">
            <p><strong>OUO:</strong> {stats?.config?.ouoRateLimit}/hour</p>
            <p><strong>Discord:</strong> {stats?.config?.discordRateLimit}/min</p>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Last updated: {stats?.system?.timestamp ? new Date(stats.system.timestamp).toLocaleString() : 'Unknown'}
      </div>
    </div>
  );
}