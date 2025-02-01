import React, { useState, useRef } from "react";
import { X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ChannelList from "./data";

export default function AllChannelsPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const videoRef = useRef(null);

  const handleWatchNow = (url) => {
    setSelectedVideoUrl(url);
    setIsVideoOpen(true);
  };

  const handleClosePlayer = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const filteredChannels = ChannelList.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-auto bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d] hide-scrollbar">
      <div className="max-w-[1920px] mx-auto px-1.5 md:px-6 lg:px-10">
        {/* Header */}
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
              to="/"
              className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </Link>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mt-8 px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* All Channels Section */}
        <section className="mt-8 pb-8 md:mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 t-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-1">
            {filteredChannels.map((channel) => (
              <div
                key={channel.tvgId}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer"
                onClick={() => handleWatchNow(channel.url)}
              >
                <div className="relative aspect-square">
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-full h-full object-contain p-4 bg-black/40"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[7px] font-bold px-2 py-1 rounded-lg">
                    LIVE
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-white truncate">
                    {channel.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Player Modal */}
        {isVideoOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-1000 z-50 flex flex-col">
            <div className="flex justify-end p-4">
              <button
                onClick={handleClosePlayer}
                className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full"
                autoPlay
                controls
                playsInline
              >
                <source src={selectedVideoUrl} type="application/x-mpegURL" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
