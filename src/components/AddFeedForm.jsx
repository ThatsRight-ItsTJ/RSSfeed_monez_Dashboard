import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://your-app.railway.app';

export default function AddFeedForm({ onFeedAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    rss_url: '',
    discord_webhook: '',
    feed_type: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE}/api/feeds`, formData);
      if (response.data.success) {
        setFormData({
          name: '',
          rss_url: '',
          discord_webhook: '',
          feed_type: 'general'
        });
        onFeedAdded();
      }
    } catch (error) {
      console.error('Error adding feed:', error);
      setError('Failed to add feed. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New RSS Feed</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Feed Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Tech News Feed"
          />
        </div>

        <div>
          <label htmlFor="rss_url" className="block text-sm font-medium text-gray-700 mb-1">
            RSS URL
          </label>
          <input
            type="url"
            id="rss_url"
            name="rss_url"
            value={formData.rss_url}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/feed.xml"
          />
        </div>

        <div>
          <label htmlFor="feed_type" className="block text-sm font-medium text-gray-700 mb-1">
            Feed Type
          </label>
          <select
            id="feed_type"
            name="feed_type"
            value={formData.feed_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">General</option>
            <option value="tech">Technology</option>
            <option value="news">News</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="science">Science</option>
          </select>
        </div>

        <div>
          <label htmlFor="discord_webhook" className="block text-sm font-medium text-gray-700 mb-1">
            Discord Webhook URL (Optional)
          </label>
          <input
            type="url"
            id="discord_webhook"
            name="discord_webhook"
            value={formData.discord_webhook}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://discord.com/api/webhooks/..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {loading ? 'Adding Feed...' : 'Add Feed'}
        </button>
      </form>
    </div>
  );
}