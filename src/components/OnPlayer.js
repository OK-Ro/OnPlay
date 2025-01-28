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
  Minimize2,
  Cast,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import CategoriesPage from "./CategoriesPage";
import Loading from "./Loading";

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

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [loading, setLoading] = useState(true);

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
        const hls = new Hls();
        hls.loadSource(currentChannel.url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
          setIsPlaying(true);
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = currentChannel.url;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play();
          setIsPlaying(true);
        });
      }
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
        const hls = new Hls();
        hls.loadSource(channel.url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = channel.url;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play();
        });
      }
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
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
    if (videoRef.current) {
      if (!isFullScreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
          // Firefox
          videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          // Chrome, Safari and Opera
          videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
          // IE/Edge
          videoRef.current.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          // Chrome, Safari and Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          // IE/Edge
          document.msExitFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
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

  const toggleCast = async () => {
    if (typeof window === "undefined") return;

    if ("presentation" in navigator) {
      try {
        const availableDevices =
          await navigator.mediaDevices.enumerateDevices();
        console.log("Available Devices:", availableDevices);

        const presentationDevices = availableDevices.filter(
          (device) =>
            device.kind === "videoinput" || device.kind === "audioinput"
        );

        if (presentationDevices.length > 0) {
          const presentationRequest = new PresentationRequest([
            currentChannel.url,
          ]);
          const connection = await presentationRequest.start();
          console.log("Connected to casting device:", connection);
        } else {
          console.warn("No presentation devices found.");
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    } else {
      console.warn("Presentation API is not supported in this browser");
    }
  };

  const handleDeviceSelect = async (device) => {
    if ("presentation" in navigator) {
      try {
        const presentationRequest = new PresentationRequest([
          currentChannel.url,
        ]);
        await presentationRequest.start(); // Removed unused `connection` variable
        console.log(
          `Started presentation on device: ${device.label || device}`
        );
      } catch (error) {
        console.error("Error starting presentation:", error);
      }
    } else {
      console.log(`Selected device: ${device}`);
    }
    setShowDevices(false);
  };

  const handleTouchMove = (event) => {
    // Your logic for handling touch move events
  };

  const handleMenuToggle = () => {
    setShowLogo(false);
    setShowSidebar(true);
  };

  // Example usage of setAvailableDevices
  useEffect(() => {
    // Simulate fetching available devices
    const devices = ["Device 1", "Device 2"]; // Replace with actual device fetching logic
    setAvailableDevices(devices);
  }, [setAvailableDevices]);

  // Reset logo and menu button visibility when component mounts
  useEffect(() => {
    setShowLogo(true);
    setShowSidebar(false);
  }, [currentChannel]); // This will run whenever currentChannel changes

  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#0b0f19] px-1 flex flex-col items-center justify-start"
      onTouchMove={handleTouchMove}
    >
      {/* Sidebar Toggle Button */}
      {!showSidebar && (
        <button
          onClick={handleMenuToggle}
          className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-0 bg-gradient-to-r from-purple-500 w-80 to-pink-500 p-6 h-full shadow-lg z-50"
          >
            <h2 className="text-3xl font-bold text-white mb-4 ml-2 mb-10">
              Channels
            </h2>
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

            {/* Scrollable Channel List */}
            <div className="h-96 overflow-hidden">
              <div className="h-full overflow-y-auto">
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
                      <div className="text-sm text-gray-400">
                        {channel.group}
                      </div>
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
            </div>

            {/* Watch Button */}
            <button
              onClick={() => setShowSidebar(false)}
              className="mt-10 w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              Watch
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player */}
      <div className="flex-1 h-56 flex flex-col">
        <div className="flex-1 bg-black relative group">
          {currentChannel ? (
            <div className="relative w-full h-full ">
              <video
                ref={videoRef}
                className={`flex-1 mt-28 p-1 rounded-md border-2 border-yellow-300  ${
                  isFullScreen ? "w-screen h-screen" : "w-auto h-auto "
                }`}
                controls={false}
                autoPlay
                playsInline
              />
              <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
                <Image
                  src={currentChannel.logo || "/placeholder.svg"}
                  alt={currentChannel.name}
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <div></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                <Play size={64} className="text-white ml-2" />
              </div>
              <p className="text-white text-xl font-semibold">loading...</p>
            </div>
          )}
        </div>

        {/* Controls Below the Video Player */}
        {currentChannel && (
          <div className="bg-gradient-to-r from-blue-900 to-red-900 backdrop-blur-md p-4 flex justify-center space-x-4 mt-4 rounded-full shadow-[0_4px_20px_rgba(0,2,3,0.9)]">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full border-2 border-yellow-300 transition-colors bg-white/20 hover:bg-white/30 shadow-lg shadow-[0_4px_20px_rgba(0,0,0,0.9)] active:shadow-[2px_20px_rgba(0,0,0,0.9)]"
            >
              <div className="absolute inset-0 bg-black opacity-20 shadow-inner"></div>
              {isPlaying ? (
                <Pause className="w-6 h-6 text-yellow-300 glow relative z-10" />
              ) : (
                <Play className="w-6 h-6 text-yellow-300 glow relative z-10" />
              )}
            </button>
            <button
              onClick={rewind}
              className="p-2 rounded-full border-2 border-yellow-300 transition-colors bg-white/20 hover:bg-white/30 shadow-lg shadow-[0_4px_15px_rgba(0,0,0,0.9)] active:shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              <Rewind className="w-6 h-6 text-yellow-300 glow" />
            </button>
            <button
              onClick={fastForward}
              className="p-2 rounded-full border-2 border-yellow-300 transition-colors bg-white/20 hover:bg-white/30 shadow-lg shadow-[0_4px_15px_rgba(0,0,0,0.5)] active:shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <FastForward className="w-6 h-6 text-yellow-300 glow" />
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-full border-2 border-yellow-300 transition-colors bg-white/20 hover:bg-white/30 shadow-lg shadow-[0_4px_15px_rgba(0,0,0,0.5)] active:shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-yellow-300 glow" />
              ) : (
                <Volume2 className="w-6 h-6 text-yellow-300 glow relative z-10" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full border-2 border-yellow-300 transition-colors bg-white/20 hover:bg-white/30 shadow-lg shadow-[0_4px_15px_rgba(0,0,0,0.5)] active:shadow-[0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black opacity-20 shadow-inner"></div>
              {isFullScreen ? (
                <Minimize2 className="w-6 h-6 text-yellow-300 glow relative z-10" />
              ) : (
                <Maximize2 className="w-6 h-6 text-yellow-300 glow relative z-10" />
              )}
            </button>
            <button
              onClick={toggleCast}
              className="p-2 rounded-full border-2 border-yellow-300 transition-colors bg-white/20 hover:bg-white/30 shadow-lg shadow-[0_4px_15px_rgba(0,0,0,0.5)] active:shadow-[0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black opacity-20 shadow-inner"></div>
              <Cast className="w-6 h-6 text-yellow-300 glow relative z-10" />
            </button>
          </div>
        )}
      </div>

      {/* Categories Component Container */}
      <div className="w-full mt-6">
        <CategoriesPage />
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
                {device.label || `Device ${index + 1}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Stylish Logo in the top right corner */}
      {showLogo && !showSidebar && (
        <div className="absolute top-4 right-4 flex items-center">
          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-red-500 p-2 rounded-lg shadow-lg animate-blink">
            <span className="text-white text-2xl font-extrabold">O</span>
            <img
              src="https://i.pinimg.com/originals/37/97/d9/3797d93321ab72678a94ff686da5c773.png"
              alt="Logo Icon"
              className="w-8 h-8 ml-2"
            />
          </div>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <>
          <video
            ref={videoRef}
            className="w-full max-w-2xl"
            controls
            autoPlay
            src="your-video-url.mp4"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          <div className="flex space-x-4 mt-4">
            <button onClick={togglePlayPause} className="p-2">
              {isPlaying ? (
                <Pause className="w-6 h-6 text-yellow-300" />
              ) : (
                <Play className="w-6 h-6 text-yellow-300" />
              )}
            </button>
            <button onClick={toggleMute} className="p-2">
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-yellow-300" />
              ) : (
                <Volume2 className="w-6 h-6 text-yellow-300" />
              )}
            </button>
            <button onClick={toggleFullscreen} className="p-2">
              {isFullScreen ? (
                <Minimize2 className="w-6 h-6 text-yellow-300" />
              ) : (
                <Maximize2 className="w-6 h-6 text-yellow-300" />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
