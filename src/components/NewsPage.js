import React, { useState, useEffect } from "react";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Global Markets Rally as Inflation Fears Ease",
    image:
      "https://investorplace.com/wp-content/uploads/2019/07/stock-market-rally-large.jpg",
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

export default function NewsPage() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Auto-rotate news every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 5000); // Change news every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentNews = newsData[currentNewsIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d] hide-scrollbar">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Latest Breaking News
          </h1>
          <p className="text-gray-400">
            Stay updated with the latest breaking news from around the world.
          </p>
        </header>

        {/* Latest Breaking News Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Latest News Card */}
          <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={currentNews.image}
              alt={currentNews.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center text-gray-400 text-sm mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>{formatTimeAgo(currentNews.timestamp)}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                {currentNews.title}
              </h2>
              <p className="text-gray-400 mb-4">{currentNews.description}</p>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{currentNews.source}</span>
              </div>
            </div>
          </div>

          {/* Button to All News Page */}
          <Link
            to="/all-news"
            className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
          >
            <span className="mr-2">View All News</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
