import React, { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

// Mock data for demonstration when API is unavailable
const mockFeeds = [
  {
    id: 1,
    title: "Breaking: Latest Tech Innovation Transforms Industry",
    description: "Discover how cutting-edge technology is revolutionizing the way we work and live. This groundbreaking development promises to change everything.",
    link: "https://ouo.io/example1",
    pubDate: "2024-01-15T10:30:00Z",
    source: "Tech News",
    category: "Technology",
    image: "/images/innovation.jpg"
  },
  {
    id: 2,
    title: "Market Analysis: Investment Opportunities in 2024",
    description: "Expert insights into the most promising investment sectors for the coming year. Learn where smart money is heading.",
    link: "https://ouo.io/example2", 
    pubDate: "2024-01-14T15:45:00Z",
    source: "Finance Daily",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Health & Wellness: 5 Simple Tips for Better Living",
    description: "Transform your daily routine with these evidence-based wellness strategies that actually work. Start feeling better today.",
    link: "https://ouo.io/example3",
    pubDate: "2024-01-13T08:20:00Z", 
    source: "Health Hub",
    category: "Health",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Travel Guide: Hidden Gems Worth Visiting This Year",
    description: "Explore breathtaking destinations that most travelers haven't discovered yet. Your next adventure awaits.",
    link: "https://ouo.io/example4",
    pubDate: "2024-01-12T12:10:00Z",
    source: "Travel Explorer", 
    category: "Travel",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Business Strategy: How Small Companies Are Winning Big",
    description: "Learn the innovative strategies that small businesses are using to compete with industry giants and succeed.",
    link: "https://ouo.io/example5",
    pubDate: "2024-01-11T14:30:00Z",
    source: "Business Weekly",
    category: "Business", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
  },
  {
    id: 6,
    title: "Food & Culture: Authentic Recipes from Around the World",
    description: "Discover traditional cooking techniques and recipes that bring international flavors to your kitchen.",
    link: "https://ouo.io/example6",
    pubDate: "2024-01-10T09:15:00Z",
    source: "Culinary Times",
    category: "Food",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop"
  }
];

const categoryColors = {
  Technology: 'bg-blue-100 text-blue-800',
  Finance: 'bg-green-100 text-green-800', 
  Health: 'bg-red-100 text-red-800',
  Travel: 'bg-purple-100 text-purple-800',
  Business: 'bg-yellow-100 text-yellow-800',
  Food: 'bg-orange-100 text-orange-800',
  default: 'bg-gray-100 text-gray-800'
};

function App() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/feeds`);
      if (response.ok) {
        const data = await response.json();
        setFeeds(data.feeds || []);
      } else {
        setFeeds(mockFeeds);
      }
    } catch (error) {
      console.log('Using mock data - API unavailable');
      setFeeds(mockFeeds);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  const filteredFeeds = selectedCategory === 'All' 
    ? feeds 
    : feeds.filter(feed => feed.category === selectedCategory);

  const categories = ['All', ...new Set(feeds.map(feed => feed.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading feeds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Monetized RSS Feeds</h1>
          <p className="mt-2 text-gray-600">Discover the latest content from our curated feeds</p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredFeeds.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No feeds available in this category.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFeeds.map((feed) => (
              <article key={feed.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {feed.image && (
                  <img 
                    src={feed.image} 
                    alt={feed.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      categoryColors[feed.category] || categoryColors.default
                    }`}>
                      {feed.category}
                    </span>
                    <span className="text-sm text-gray-500">{feed.source}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {feed.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {feed.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {formatDate(feed.pubDate)}
                    </span>
                    <a
                      href={feed.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Read More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Monetized RSS Feeds. All content links are monetized for revenue generation.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <div className="text-sm">
                <span className="font-medium">Total Articles:</span> {feeds.length}
              </div>
              <div className="text-sm">
                <span className="font-medium">Categories:</span> {categories.length - 1}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;