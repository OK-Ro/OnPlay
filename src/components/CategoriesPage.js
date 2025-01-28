"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Star,
  Clock,
  TrendingUp,
  ChevronRight,
  Cast,
  RefreshCw,
} from "lucide-react";

const Image = ({ src, alt, width, height, className, fill }) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={fill ? { objectFit: "cover", width: "100%", height: "100%" } : {}}
    />
  );
};

const categories = [
  { id: 1, name: "All Sports", icon: TrendingUp },
  { id: 2, name: "Football", icon: Play },
  { id: 3, name: "Basketball", icon: Clock },
  { id: 4, name: "Tennis", icon: Star },
];

export default function CategoriesPage({ onChannelSelect, onCast }) {
  const [sportsChannels, setSportsChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Sports");
  const [refreshTime, setRefreshTime] = useState(30);

  const fetchChannels = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/dtankdempse/daddylive-m3u/refs/heads/main/playlist.m3u8"
      );
      const text = await response.text();
      const lines = text.split("\n");
      const parsedChannels = [];

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("#EXTINF")) {
          const info = lines[i];
          const url = lines[i + 1];
          const nameMatch = info.match(/tvg-name="([^"]+)"/);
          const logoMatch = info.match(/tvg-logo="([^"]+)"/);
          const groupMatch = info.match(/group-title="([^"]+)"/);
          const tvgIdMatch = info.match(/tvg-id="([^"]+)"/);

          if (nameMatch && url) {
            parsedChannels.push({
              name: nameMatch[1],
              url: url.trim(),
              logo: logoMatch ? logoMatch[1] : "",
              group: groupMatch ? groupMatch[1] : "Unknown",
              tvgId: tvgIdMatch ? tvgIdMatch[1] : "",
              isLive: Math.random() > 0.5,
              viewerCount: Math.floor(Math.random() * 100000) + 1000,
              startTime: new Date(
                Date.now() + Math.random() * 7200000
              ).toISOString(),
            });
          }
        }
      }

      const sports = parsedChannels.filter(
        (channel) =>
          channel.group.toLowerCase().includes("sport") ||
          channel.name.toLowerCase().includes("sport") ||
          channel.name.toLowerCase().includes("football")
      );
      setSportsChannels(sports);
      setFilteredChannels(sports);
    } catch (error) {
      console.error("Failed to fetch channels:", error);
      setError("Failed to load channels. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
    const interval = setInterval(fetchChannels, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshTime((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedCategory === "All Sports") {
      setFilteredChannels(sportsChannels);
    } else {
      setFilteredChannels(
        sportsChannels.filter((channel) =>
          channel.name.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }
  }, [selectedCategory, sportsChannels]);

  const getTimeUntilStart = (startTime) => {
    const diff = new Date(startTime) - new Date();
    const minutes = Math.floor(diff / 60000);
    return minutes > 0 ? `Starts in ${minutes}m` : "Live";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d]">
      {/* Featured Content */}
      <div className="relative h-[70vh] mb-8">
        <div className="absolute inset-0">
          <Image
            src="https://sjc.microlink.io/v2LmQDwsgrGWiusuRafiK6vDRmEtWy_EBvLrlXg-0c8ouKgIwkVNyuAxVY9dIKSv7r9EeOZYPG048Uj9IqLh_w.jpeg"
            alt="Featured content"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
          <span className="inline-block px-2 py-1 bg-purple-500 text-white text-sm font-medium rounded mb-4">
            Featured
          </span>
          <h1 className="text-5xl font-bold mb-4 text-white">
            Champions League Final
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Experience the ultimate showdown live from Wembley Stadium. Don't
            miss a moment of this historic match.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/30">
            <Play className="w-5 h-5" /> Watch Now
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Auto-refresh indicator */}
        <div className="flex items-center justify-end mb-4 text-gray-400">
          <RefreshCw
            className={`w-4 h-4 mr-2 ${
              refreshTime === 30 ? "animate-spin" : ""
            }`}
          />
        </div>

        {/* Categories */}
        <div className="w-full whitespace-nowrap mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all duration-200 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30"
                      : "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Live Sports */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Live Sports</h2>
            <button className="text-purple-400 hover:text-purple-300 flex items-center">
              See All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChannels.map((channel) => (
                <motion.div
                  key={channel.tvgId}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg">
                    <div className="relative aspect-video">
                      <Image
                        src={channel.logo || "/placeholder.svg"}
                        alt={channel.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 rounded text-sm font-medium text-white">
                        {channel.isLive
                          ? "Live"
                          : getTimeUntilStart(channel.startTime)}
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-sm text-white">
                        {channel.viewerCount.toLocaleString()} watching
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-purple-400 mb-1">
                        {channel.group}
                      </div>
                      <h3 className="font-semibold text-white mb-4 truncate">
                        {channel.name}
                      </h3>
                      <div className="flex justify-between">
                        <button
                          onClick={() => onChannelSelect(channel)}
                          className="flex-1 mr-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg shadow-purple-500/20"
                        >
                          <Play className="w-4 h-4 mr-2" /> Watch
                        </button>
                        <button
                          onClick={() => onCast(channel)}
                          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                        >
                          <Cast className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Popular Movies */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Popular Movies
            </h2>
            <button className="text-purple-400 hover:text-purple-300 flex items-center">
              Browse All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((movie) => (
              <motion.div
                key={movie}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="https://sjc.microlink.io/v2LmQDwsgrGWiusuRafiK6vDRmEtWy_EBvLrlXg-0c8ouKgIwkVNyuAxVY9dIKSv7r9EeOZYPG048Uj9IqLh_w.jpeg"
                      alt="Movie thumbnail"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg shadow-purple-500/30">
                        <Play className="w-5 h-5" /> Play Now
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">Movie Title</h3>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm">9.0</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>2023</span>
                      <span className="mx-2">•</span>
                      <span>2h 30min</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* News Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Latest News</h2>
            <button className="text-purple-400 hover:text-purple-300 flex items-center">
              More News <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((news) => (
              <motion.div
                key={news}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <div className="relative aspect-[2/1]">
                    <Image
                      src="https://sjc.microlink.io/v2LmQDwsgrGWiusuRafiK6vDRmEtWy_EBvLrlXg-0c8ouKgIwkVNyuAxVY9dIKSv7r9EeOZYPG048Uj9IqLh_w.jpeg"
                      alt="News thumbnail"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2">
                      Breaking Sports News Headline
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>Sports News</span>
                      <span className="mx-2">•</span>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
