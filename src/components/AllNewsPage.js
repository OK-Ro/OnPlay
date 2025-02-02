import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Clock, Calendar, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

// News API key and base URL
const API_KEY = "49a0e9d90c634d808d9e1ba41ae2ad78";
const API_URL = "https://newsapi.org/v2/top-headlines";

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
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch news from NewsAPI
  const fetchNews = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          apiKey: API_KEY,
          country: "us", // You can change this to a different country code if needed
          pageSize: 10, // Adjust number of articles per request
        },
      });
      setNewsData(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Fetch news when component mounts
  useEffect(() => {
    fetchNews();
  }, []);

  // Filter news based on the search query
  const filteredNews = newsData.filter(
    (news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.source.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          {filteredNews.map((news, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={news.urlToImage}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{formatTimeAgo(news.publishedAt)}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {news.title}
                </h2>
                <p className="text-gray-400 mb-4">{news.description}</p>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{news.source.name}</span>
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
