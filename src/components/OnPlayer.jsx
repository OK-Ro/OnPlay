import React, { useState, useEffect, useMemo, useRef } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Search,
  Star,
  StarOff,
  Rewind,
  FastForward,
  Menu,
} from "lucide-react";
import { MdCast } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";

// Custom Image Component (replaces next/image)
const Image = ({ src, alt, width, height, className, fill }) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={
        fill ? { objectFit: "contain", width: "100%", height: "100%" } : {}
      }
    />
  );
};

export default function OnPlayer() {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [availableDevices, setAvailableDevices] = useState([]);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchChannels = async () => {
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
              });
            }
          }
        }

        setChannels(parsedChannels);

        // Automatically play the first channel
        if (parsedChannels.length > 0) {
          setCurrentChannel(parsedChannels[0]);
        }
      } catch (error) {
        console.error("Failed to fetch channels:", error);
      }
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    if (currentChannel && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferLength: 30,
          maxBufferSize: 60 * 1000 * 1000,
          maxMaxBufferLength: 600,
        });
        hls.loadSource(currentChannel.url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = currentChannel.url;
        videoRef.current.play();
      } else {
        console.error("HLS is not supported in this browser.");
      }
      setIsPlaying(true);
    }
  }, [currentChannel]);

  const debouncedSetSearchQuery = useMemo(
    () => debounce(setSearchQuery, 300),
    []
  );

  const filteredChannels = useMemo(() => {
    return channels.filter((channel) => {
      const matchesSearch = channel.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGroup =
        selectedGroup === "Favorites"
          ? favorites.includes(channel.tvgId)
          : !selectedGroup || channel.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [channels, searchQuery, selectedGroup, favorites]);

  const handleChannelSelect = (channel) => {
    setCurrentChannel(channel);
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferLength: 30,
          maxBufferSize: 60 * 1000 * 1000,
          maxMaxBufferLength: 600,
        });
        hls.loadSource(channel.url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = channel.url;
        videoRef.current.play();
      } else {
        console.error("HLS is not supported in this browser.");
      }
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const toggleFavorite = (tvgId) => {
    setFavorites((prev) =>
      prev.includes(tvgId)
        ? prev.filter((id) => id !== tvgId)
        : [...prev, tvgId]
    );
  };

  const rewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const fastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const toggleCast = () => {
    const devices = ["Living Room TV", "Bedroom Speaker", "Office Monitor"];
    setAvailableDevices(devices);
    setShowDevices(!showDevices);
  };

  const handleDeviceSelect = (device) => {
    console.log(`Selected device: ${device}`);
    setShowDevices(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="w-80 bg-gradient-to-b from-purple-600 to-pink-500 text-white p-6 space-y-4 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Channels</h2>
            <div className="relative mb-6 mt-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search channels..."
                onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            <div className="mb-6">
              <select
                value={selectedGroup || ""}
                onChange={(e) => setSelectedGroup(e.target.value || null)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              >
                <option value="">All Groups</option>
                <option value="Favorites">Favorites</option>
                {[...new Set(channels.map((channel) => channel.group))].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="space-y-2">
              {filteredChannels.map((channel) => (
                <button
                  key={channel.tvgId}
                  onClick={() => handleChannelSelect(channel)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    currentChannel?.tvgId === channel.tvgId
                      ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-white/30"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div className="w-12 h-12 relative mr-3">
                    <Image
                      src={channel.logo || "/placeholder.svg"}
                      alt={channel.name}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-lg text-white">
                      {channel.name}
                    </div>
                    <div className="text-sm text-gray-400">{channel.group}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(channel.tvgId);
                    }}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {favorites.includes(channel.tvgId) ? (
                      <Star
                        size={18}
                        className="text-yellow-500 fill-yellow-500"
                      />
                    ) : (
                      <StarOff size={18} className="text-gray-400" />
                    )}
                  </button>
                </button>
              ))}
            </div>

            {/* Watch Button */}
            <button
              onClick={() => setShowSidebar(false)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              Watch
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-black relative group">
          {currentChannel ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls={false}
                autoPlay
                playsInline
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
                <Image
                  src={currentChannel.logo || "/placeholder.svg"}
                  alt={currentChannel.name}
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <div>
                  <h3 className="font-medium text-sm">{currentChannel.name}</h3>
                  <p className="text-xs text-gray-400">
                    {currentChannel.group}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                <Play size={64} className="text-white ml-2" />
              </div>
              <p className="text-white text-xl font-semibold">
                Loading channels...
              </p>
            </div>
          )}
        </div>

        {/* Controls Below the Video Player */}
        {currentChannel && (
          <div className="bg-black/60 backdrop-blur-md p-4 flex justify-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={rewind}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Rewind className="w-6 h-6" />
            </button>
            <button
              onClick={fastForward}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FastForward className="w-6 h-6" />
            </button>
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
            <button
              onClick={toggleCast}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <MdCast className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Available Devices List */}
      {showDevices && (
        <div className="absolute bottom-20 right-4 bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-lg text-sm">
          <h4 className="text-white mb-2 font-bold">Available Devices</h4>
          <ul className="space-y-2">
            {availableDevices.map((device, index) => (
              <li
                key={index}
                className="text-white bg-black/50 hover:bg-black/70 p-2 rounded-lg cursor-pointer transition-colors"
                onClick={() => handleDeviceSelect(device)}
              >
                {device}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
