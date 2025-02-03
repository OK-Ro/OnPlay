"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar, Bookmark, Share2, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${API_KEY}`;

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const publishedDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - publishedDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);
  const [bookmarkedNews, setBookmarkedNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.articles) {
          setNewsData(
            data.articles.map((article, index) => ({
              id: index + 1,
              title: article.title,
              image: article.urlToImage || "/placeholder.svg",
              source: article.source.name,
              timestamp: article.publishedAt,
              description: article.description,
              content: article.content,
              likes: Math.floor(Math.random() * 1000),
              comments: Math.floor(Math.random() * 500),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!selectedNews && newsData.length > 0) {
        setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedNews, newsData]);

  const currentNews = newsData[currentNewsIndex];

  const handleNewsClick = (news) => setSelectedNews(news);
  const handleCloseNews = () => setSelectedNews(null);
  const handleBookmark = (newsId) => {
    setBookmarkedNews((prev) =>
      prev.includes(newsId)
        ? prev.filter((id) => id !== newsId)
        : [...prev, newsId]
    );
  };
  const handleShare = (news) => console.log(`Sharing news: ${news.title}`);
  const handleLike = (newsId) => console.log(`Liking news with ID: ${newsId}`);

  if (newsData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="text-center mb-8 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Breaking Sports News
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Stay ahead of the game with the latest updates
          </p>
        </header>

        <div className="mb-8 sm:mb-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNewsIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-300 "
            >
              <div className="relative">
                <img
                  src={currentNews.image || "/placeholder.svg"}
                  alt={currentNews.title}
                  className="w-full h-[60vh]  sm:h-64 md:h-96 object-cover shadow-2xl drop-shadow-[0_-4px_1px_rgba(0,0,0,0.9)]" // Adjusted height for mobile
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-4">
                    {currentNews.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl text-gray-300 mb-4 line-clamp-2 sm:line-clamp-none">
                    {currentNews.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                      <span className="flex items-center text-gray-400 text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{" "}
                        {/* Adjusted icon size for mobile */}
                        {formatTimeAgo(currentNews.timestamp)}
                      </span>
                      <span className="flex items-center text-gray-400 text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{" "}
                        {/* Adjusted icon size for mobile */}
                        {currentNews.source}
                      </span>
                    </div>
                    <button
                      onClick={() => handleNewsClick(currentNews)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors duration-300 text-xs sm:text-sm md:text-base" // Adjusted button text size for mobile
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center mb-8 sm:mb-16">
          <Link
            to="/all-news"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full text-l sm:text-xl font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
          >
            <span className="mr-2">View All Sports News</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 shadow-5xl drop-shadow-[0_-4px_10px_rgba(0,0,0,0.9)]">
          {newsData.slice(0, 6).map((news) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {news.description}
                </p>
                <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
                  <span>{news.source}</span>
                  <span>{formatTimeAgo(news.timestamp)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleBookmark(news.id)}
                    className={`p-2 rounded-full ${
                      bookmarkedNews.includes(news.id)
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    } hover:bg-purple-700 transition-colors duration-300`}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare(news)}
                    className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleLike(news.id)}
                    className="flex items-center space-x-1 p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-300"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{news.likes}</span>
                  </button>
                  <button
                    onClick={() => handleNewsClick(news)}
                    className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 shadow-5xl"
                  >
                    Read
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedNews && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              onClick={handleCloseNews}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedNews.image || "/placeholder.svg"}
                  alt={selectedNews.title}
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <div className="p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                    {selectedNews.title}
                  </h2>
                  <div className="flex items-center justify-between text-gray-400 text-sm mb-4 sm:mb-6">
                    <span>{selectedNews.source}</span>
                    <span>{formatTimeAgo(selectedNews.timestamp)}</span>
                  </div>
                  <p className="text-gray-300 mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {selectedNews.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 sm:space-x-4">
                      <button
                        onClick={() => handleBookmark(selectedNews.id)}
                        className={`p-2 rounded-full ${
                          bookmarkedNews.includes(selectedNews.id)
                            ? "bg-purple-600 text-white"
                            : "bg-gray-700 text-gray-300"
                        } hover:bg-purple-700 transition-colors duration-300`}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleShare(selectedNews)}
                        className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-300"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleLike(selectedNews.id)}
                        className="flex items-center space-x-1 p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-300"
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span>{selectedNews.likes}</span>
                      </button>
                    </div>
                    <button
                      onClick={handleCloseNews}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-full transition-colors duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
