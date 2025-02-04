import React, { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ChannelList from "./data";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";

export default function Tv() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChannel, setCurrentChannel] = useState(ChannelList[0]);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = currentChannel.url;
      videoRef.current
        .play()
        .catch((error) => console.log("Autoplay prevented:", error));
    }
  }, [currentChannel]);

  const handleChannelClick = (channel) => {
    setCurrentChannel(channel);
  };

  const filteredChannels = ChannelList.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d]">
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
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
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <Search className="w-6 h-6 " />
              </motion.button>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/"
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 inline-block"
                >
                  <X className="w-6 h-6" />
                </Link>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-lg"
                />
                <Search className="absolute right-4 top-3.5 text-gray-400 w-5 h-5 " />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Player */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl transform rotate-1 scale-105 blur-lg opacity-50"></div>
          <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-3xl">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover drop-shadow-[0_-1px_1px_rgba(0,0,0,0.9)]"
              controls
              autoPlay
              playsInline
            >
              <source src={currentChannel.url} type="application/x-mpegURL" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
              <img
                src={currentChannel.logo || "/placeholder.svg"}
                alt={currentChannel.name}
                width={32}
                height={32}
                className="rounded-md"
              />
            </div>
          </div>
        </div>

        {/* All Channels Section */}
        <section className="pb-8">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Channel Guide
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 drop-shadow-[0_-5px_2px_rgba(0,0,0,0.9)]">
            {filteredChannels.map((channel) => (
              <motion.div
                key={channel.tvgId}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${
                  currentChannel.tvgId === channel.tvgId
                    ? "ring-2 ring-purple-800"
                    : ""
                }`}
                onClick={() => handleChannelClick(channel)}
              >
                <div className="relative h-28 w-full aspect-square">
                  <img
                    src={channel.logo || "/placeholder.svg"}
                    alt={channel.name}
                    className="w-full h-full object-contain p-4 bg-black/40"
                  />
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-900 to-pink-900">
                  <h3 className="text-sm font-medium text-white truncate">
                    {channel.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
