import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://your-app.railway.app';

export default function WebhookManager() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFeed, setEditingFeed] = useState(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saving, setSaving] = useState(false);

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

  const startEditWebhook = (feed) => {
    setEditingFeed(feed);
    setWebhookUrl(feed.discord_webhook || '');
  };

  const cancelEdit = () => {
    setEditingFeed(null);
    setWebhookUrl('');
  };

  const saveWebhook = async () => {
    if (!editingFeed) return;

    setSaving(true);
    try {
      const response = await axios.put(`${API_BASE}/api/feeds/${editingFeed.id}`, {
        ...editingFeed,
        discord_webhook: webhookUrl.trim() || null
      });

      if (response.data.success) {
        await loadFeeds();
        setEditingFeed(null);
        setWebhookUrl('');
      } else {
        setError('Failed to update webhook');
      }
    } catch (error) {
      console.error('Error updating webhook:', error);
      setError('Failed to update webhook. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const removeWebhook = async (feed) => {
    if (!window.confirm(`Remove Discord webhook from "${feed.name}"?`)) return;

    try {
      const response = await axios.put(`${API_BASE}/api/feeds/${feed.id}`, {
        ...feed,
        discord_webhook: null
      });

      if (response.data.success) {
        await loadFeeds();
      } else {
        setError('Failed to remove webhook');
      }
    } catch (error) {
      console.error('Error removing webhook:', error);
      setError('Failed to remove webhook. Please try again.');
    }
  };

  const testWebhook = async (feed) => {
    if (!feed.discord_webhook) {
      alert('No webhook configured for this feed');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/api/test-webhook`, {
        webhook_url: feed.discord_webhook,
        feed_name: feed.name
      });

      if (response.data.success) {
        alert('Webhook test message sent successfully!');
      } else {
        alert('Webhook test failed: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error testing webhook:', error);
      alert('Failed to test webhook. Please check the webhook URL.');
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
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Webhook Management</h2>
          <p className="text-gray-600 mt-1">Assign Discord webhooks to your RSS feeds</p>
        </div>
        <button 
          onClick={loadFeeds}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {/* Edit Modal */}
      {editingFeed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Webhook for "{editingFeed.name}"
            </h3>
            
            <div className="mb-4">
              <label htmlFor="webhook_url" className="block text-sm font-medium text-gray-700 mb-2">
                Discord Webhook URL
              </label>
              <input
                type="url"
                id="webhook_url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://discord.com/api/webhooks/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to remove webhook
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelEdit}
                disabled={saving}
                className="px-4 py-2 text-gray-600 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={saveWebhook}
                disabled={saving}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Webhook'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feeds List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Feed → Webhook Assignments</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {feeds.map(feed => (
            <div key={feed.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-gray-900">{feed.name}</h4>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {feed.feed_type}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-4">
                    <p className="text-sm text-gray-600">
                      <strong>RSS:</strong> 
                      <a 
                        href={feed.rss_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 ml-1"
                      >
                        {feed.rss_url.length > 50 ? feed.rss_url.substring(0, 50) + '...' : feed.rss_url}
                      </a>
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      <strong>Discord Webhook:</strong>
                      {feed.discord_webhook ? (
                        <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          ✅ Configured ({feed.discord_webhook.length > 40 ? feed.discord_webhook.substring(0, 40) + '...' : feed.discord_webhook})
                        </span>
                      ) : (
                        <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          ❌ Not configured
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {feed.discord_webhook && (
                    <button
                      onClick={() => testWebhook(feed)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                    >
                      Test
                    </button>
                  )}
                  
                  <button
                    onClick={() => startEditWebhook(feed)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    {feed.discord_webhook ? 'Edit' : 'Add'} Webhook
                  </button>

                  {feed.discord_webhook && (
                    <button
                      onClick={() => removeWebhook(feed)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {feeds.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="text-gray-500 text-lg">No feeds found.</div>
            <div className="text-gray-400 text-sm mt-2">Add feeds first, then configure their webhooks here.</div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{feeds.length}</div>
          <div className="text-sm text-gray-600">Total Feeds</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {feeds.filter(f => f.discord_webhook).length}
          </div>
          <div className="text-sm text-gray-600">With Webhooks</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {feeds.filter(f => !f.discord_webhook).length}
          </div>
          <div className="text-sm text-gray-600">Without Webhooks</div>
        </div>
      </div>
    </div>
  );
}