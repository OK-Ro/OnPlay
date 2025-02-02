import React, { useState } from "react";
import { Search, Clock, Calendar, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Global Markets Rally as Inflation Fears Ease",
    image:
      "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    source: "Financial Times",
    timestamp: "2024-05-20T10:30:00Z",
    description:
      "Global stock markets surged as investors welcomed signs that inflation pressures may be easing.",
  },
  {
    id: 2,
    title: "Tech Giants Announce Major AI Breakthroughs",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    source: "TechCrunch",
    timestamp: "2024-05-19T15:45:00Z",
    description:
      "Leading tech companies unveiled groundbreaking advancements in artificial intelligence.",
  },
  {
    id: 3,
    title: "Climate Change Summit Yields Historic Agreement",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    source: "BBC News",
    timestamp: "2024-05-18T09:15:00Z",
    description:
      "World leaders reached a landmark agreement to combat climate change at the global summit.",
  },
  {
    id: 4,
    title: "SpaceX Launches New Satellite Constellation",
    image:
      "https://images.unsplash.com/photo-1457364887197-9150188c107b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    source: "Space.com",
    timestamp: "2024-05-17T12:00:00Z",
    description:
      "SpaceX successfully launched a new batch of satellites to expand its global internet coverage.",
  },
  {
    id: 5,
    title: "New COVID Variant Detected in Several Countries",
    image:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    source: "Reuters",
    timestamp: "2024-05-16T18:20:00Z",
    description:
      "Health officials are monitoring a new COVID-19 variant detected in multiple regions.",
  },
  // Add more news articles here...
];

// Helper function to format the timestamp
const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const publishedDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - publishedDate) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};

export default function AllNewsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsData.filter(
    (news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-auto bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d] hide-scrollbar">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-8">
        {/* Header with Logo and Close Button */}
        <header className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gradient-to-r from-yellow-400 to-red-500 p-1 rounded-lg shadow-lg animate-blink">
                <span className="text-white text-2xl font-extrabold">O</span>
                <img
                  src="https://i.pinimg.com/originals/37/97/d9/3797d93321ab72678a94ff686da5c773.png"
                  alt="Logo Icon"
                  className="w-6 h-6 ml-2"
                />
              </div>
            </div>
            <Link
              to="/" // Navigate back to the homepage
              className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </Link>
          </div>
        </header>

        {/* Page Title and Description */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            All News
          </h1>
          <p className="text-gray-400">
            Explore all the latest news from around the world.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{formatTimeAgo(news.timestamp)}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {news.title}
                </h2>
                <p className="text-gray-400 mb-4">{news.description}</p>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{news.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (Optional) */}
        <div className="flex justify-center mt-8">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50">
            Load More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
