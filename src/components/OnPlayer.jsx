import React, { useState, useEffect, useMemo, useRef } from "react";
import Hls from "hls.js"; // Import hls.js
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Search,
  Star,
  StarOff,
  ChevronDown,
  Filter,
  Rewind,
  FastForward,
  Cast,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom Image Component (replaces next/image)
const Image = ({ src, alt, width, height, className, fill }) => {
  return (
    <img
      src={src}
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

// Custom Slider Component
const Slider = ({ value, max, step, onValueChange, className }) => {
  return (
    <input
      type="range"
      value={value}
      max={max}
      step={step}
      onChange={(e) => onValueChange([parseFloat(e.target.value)])}
      className={className}
    />
  );
};

// Custom DropdownMenu Components
const DropdownMenu = ({ children }) => {
  return <div className="dropdown-menu">{children}</div>;
};

const DropdownMenuTrigger = ({ children }) => {
  return <div className="dropdown-trigger">{children}</div>;
};

const DropdownMenuContent = ({ children, className }) => {
  return <div className={`dropdown-content ${className}`}>{children}</div>;
};

const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <div className="dropdown-item" onClick={onClick}>
      {children}
    </div>
  );
};

export default function OnPlayer() {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Check if AirPlay is supported
  const isAirPlaySupported = useMemo(() => {
    return (
      typeof videoRef.current?.webkitShowPlaybackTargetPicker === "function"
    );
  }, []); // Removed videoRef.current from dependency array

  useEffect(() => {
    const sampleChannels = [
      {
        name: "A&E",
        url: "https://xyzdddd.mizhls.ru/lb/premium302/index.m3u8",
        logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/a-and-e-us.png",
        group: "USA (DADDY LIVE)",
        tvgId: "A.and.E.US.-.Eastern.Feed.us",
      },
      {
        name: "ABC (WFAA)",
        url: "https://xyzdddd.mizhls.ru/lb/premium51/index.m3u8",
        logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/us-local/abc-8-wfaa-us.png",
        group: "USA (DADDY LIVE)",
        tvgId: "ABC.(WFAA).Dallas,.TX.us",
      },
      {
        name: "UEFA Champions League: Arsenal vs Dinamo Zagreb",
        url: "https://xyzdddd.mizhls.ru/lb/premium32/index.m3u8",
        logo: "https://www.thesportsdb.com/images/media/event/thumb/3cwr4a1725264657.jpg/preview",
        group: "Events (DADDY LIVE)",
        tvgId: "UEFA.Champions.League.Arsenal.vs.Dinamo.Zagreb.2025",
      },
      {
        name: "UEFA Champions League: Arsenal vs Dinamo Zagreb (Mirror 1)",
        url: "https://xyzdddd.mizhls.ru/lb/premium13/index.m3u8",
        logo: "https://www.thesportsdb.com/images/media/event/thumb/3cwr4a1725264657.jpg/preview",
        group: "Events (Mirrors)",
        tvgId: "UEFA.Champions.League.Arsenal.vs.Dinamo.Zagreb.2025.Mirror1",
      },
      {
        name: "UEFA Champions League: Arsenal vs Dinamo Zagreb (Mirror 2)",
        url: "https://xyzdddd.mizhls.ru/lb/premium2/index.m3u8",
        logo: "https://www.thesportsdb.com/images/media/event/thumb/3cwr4a1725264657.jpg/preview",
        group: "Events (Mirrors)",
        tvgId: "UEFA.Champions.League.Arsenal.vs.Dinamo.Zagreb.2025.Mirror2",
      },
    ];
    setChannels(sampleChannels);
  }, []);

  const groups = useMemo(() => {
    return Array.from(new Set(channels.map((channel) => channel.group)));
  }, [channels]);

  const filteredChannels = useMemo(() => {
    return channels.filter((channel) => {
      const matchesSearch = channel.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGroup = !selectedGroup || channel.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [channels, searchQuery, selectedGroup]);

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

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleFavorite = (tvgId) => {
    setFavorites((prev) =>
      prev.includes(tvgId)
        ? prev.filter((id) => id !== tvgId)
        : [...prev, tvgId]
    );
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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

  const toggleAirPlay = async () => {
    if (videoRef.current && videoRef.current.webkitShowPlaybackTargetPicker) {
      try {
        await videoRef.current.webkitShowPlaybackTargetPicker();
      } catch (error) {
        console.error("AirPlay failed:", error);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden"
    >
      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full md:w-96 bg-black/60 backdrop-blur-md p-6 overflow-y-auto border-r border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Channels
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Filter size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem onClick={() => setSelectedGroup(null)}>
                    All Groups
                  </DropdownMenuItem>
                  {groups.map((group) => (
                    <DropdownMenuItem
                      key={group}
                      onClick={() => setSelectedGroup(group)}
                    >
                      {group}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="relative mb-6">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              {filteredChannels.map((channel) => (
                <button
                  key={channel.tvgId}
                  onClick={() => handleChannelSelect(channel)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                    currentChannel?.tvgId === channel.tvgId
                      ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-white/30"
                      : "hover:bg-white/10"
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
                    <div className="font-medium text-sm">{channel.name}</div>
                    <div className="text-xs text-gray-400">{channel.group}</div>
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
                onTimeUpdate={handleTimeUpdate}
                autoPlay
                playsInline // Required for mobile Safari
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

              {/* AirPlay and Fullscreen Icons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                {isAirPlaySupported && (
                  <button
                    onClick={toggleAirPlay}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Cast className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Maximize2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                <Play size={64} className="text-white ml-2" />
              </div>
              <p className="text-white text-xl font-semibold">
                Select a channel to start watching
              </p>
            </div>
          )}
        </div>

        {/* Controls Below the Video Player */}
        {currentChannel && (
          <div className="bg-black/60 backdrop-blur-md p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
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
              </div>
              <div className="flex items-center space-x-2">
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
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  className="w-24"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-sm">{formatTime(duration)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Toggle Sidebar Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {showSidebar ? <ChevronDown /> : <Search />}
      </button>
    </div>
  );
}
