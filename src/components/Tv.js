"use client";

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
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll state
  const [isMobile, setIsMobile] = useState(false); // Track if the device is mobile
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = currentChannel.url;
      videoRef.current
        .play()
        .catch((error) => console.log("Autoplay prevented:", error));
    }
  }, [currentChannel]);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the breakpoint for mobile devices
    };

    // Check on initial load
    checkIfMobile();

    // Add resize listener to update on window resize
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Add scroll event listener (only for mobile devices)
  useEffect(() => {
    if (!isMobile) return; // Exit if not on a mobile device

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Enable fixed positioning and blur
      } else {
        setIsScrolled(false); // Disable fixed positioning and blur
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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
      {/* Header */}
      <header
        className={`${
          isMobile && isScrolled
            ? "fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d] backdrop-blur-md shadow-lg transition-all duration-300"
            : "relative"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 py-4">
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
                <Search className="w-5 h-5 " />
              </motion.button>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/"
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 inline-block"
                >
                  <X className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Video Player */}
      <div
        className={`${
          isMobile && isScrolled
            ? "fixed top-20 left-0 w-full z-40 backdrop-blur-md transition-all duration-300"
            : "relative"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-3xl transform rotate-1 scale-105 blur-2xl opacity-80"></div>
            <div className="relative bg-gray-400 rounded-2xl overflow-hidden shadow-2xl drop-shadow-[0_-1px_5px_rgba(0,0,0,0.9)]">
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                controls
                autoPlay
                playsInline
              >
                <source src={currentChannel.url} type="application/x-mpegURL" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-1 left-1 p-2 rounded-lg flex items-center space-x-2">
                <img
                  src={currentChannel.logo || "/placeholder.svg"}
                  alt={currentChannel.name}
                  width={32}
                  height={30}
                  className="p-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`${
              isMobile && isScrolled
                ? "fixed top-24 left-0 w-full z-30 backdrop-blur-md transition-all duration-300"
                : "relative"
            }`}
          >
            <div className="max-w-[1920px] mx-auto px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-lg"
                />
                <Search className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Channels Section */}
      <div className={`${isMobile && isScrolled ? "pt-64" : "pt-4"} pb-8 px-4`}>
        <section className="max-w-[1920px] mx-auto">
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
                <div className="p-3 bg-gradient-to-r from-purple-800 to-pink-800">
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
