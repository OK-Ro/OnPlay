import React, { useState, useEffect } from "react";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Sample sports news data
const newsData = [
  {
    id: 1,
    title: "Premier League: Manchester United vs Arsenal",
    image:
      "https://assets.khelnow.com/news/uploads/2024/07/250-Arsenal-vs-Man-United-copy.jpg",
    source: "Sky Sports",
    timestamp: "2024-05-20T10:30:00Z",
    description:
      "Catch the live action of this thrilling football match between Manchester United and Arsenal.",
  },
  {
    id: 2,
    title: "Formula 1: Monaco Grand Prix Highlights",
    image:
      "https://www.sport-tv.org/wp-content/uploads/2023/07/2307-Formule-1.jpg",
    source: "ESPN",
    timestamp: "2024-05-19T15:45:00Z",
    description: "Watch the highlights of the iconic Monaco Grand Prix race.",
  },
  {
    id: 3,
    title: "NBA Finals: Lakers vs Celtics Game 7",
    image:
      "https://bloximages.chicago2.vip.townnews.com/cecildaily.com/content/tncms/assets/v3/editorial/1/fb/1fb76a2e-c416-5bde-8590-1df40d45d08c/679328db4f8ec.image.jpg?resize=750%2C500",
    source: "NBA.com",
    timestamp: "2024-05-18T09:15:00Z",
    description:
      "The ultimate basketball showdown as the Lakers take on the Celtics in Game 7 of the NBA Finals.",
  },
  {
    id: 4,
    title: "Tyson Fury vs Oleksandr Usyk: Heavyweight Championship",
    image:
      "https://assets.khelnow.com/news/uploads/2025/01/74-israel-adesanya-vs-nassourdine-Imavov-copy.jpg",
    source: "Boxing News",
    timestamp: "2024-05-17T12:00:00Z",
    description:
      "Witness the heavyweight championship fight between Tyson Fury and Oleksandr Usyk.",
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
    <div className="min-h-auto bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d] hide-scrollbar">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Latest Sports News
          </h1>
          <p className="text-gray-400">
            Stay updated with the latest breaking sports news from around the
            world.
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
            <span className="mr-1">View All Sports News</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
