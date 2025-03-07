import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Clock, Calendar, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const API_URL = process.env.REACT_APP_NEWS_API_URL;

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
      <div className="max-w-[1920px] mx-auto px-3 md:px-8 lg:px-12 py-6">
        {/* Header with Logo and Close Button */}
        <header className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-0.5">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
                <img
                  src="https://i.pinimg.com/originals/37/97/d9/3797d93321ab72678a94ff686da5c773.png"
                  alt="Logo Icon"
                  className="w-6 h-6 inline-block ml-1"
                />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                nPlay
              </h1>
            </div>
            <Link
              to="/"
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 inline-block"
            >
              <X className="w-6 h-6" />
            </Link>
          </div>
        </header>

        {/* Page Title and Description */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white bg-red-600 px-4 py-2 uppercase tracking-wide shadow-lg ml-2 mb-4 border-l-8 border-white">
            News
          </h1>
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
