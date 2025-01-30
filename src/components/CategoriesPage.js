import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Volume2, X } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Sports", icon: Play },
  { id: 2, name: "News", icon: Play },
  { id: 3, name: "TV", icon: Play },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Sports");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [livSportsNews, setLivSportsNews] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    setLivSportsNews([
      {
        name: "Sky Sports News",
        url: "https://xyzdddd.mizhls.ru/lb/premium366/index.m3u8",
        logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-news-uk.png",
        group: "SPORTS (DADDY LIVE)",
        tvgId: "SkySp.News.HD.uk",
      },
    ]);
  }, []);

  const handleWatchNow = () => {
    setIsLoading(true);
    setIsVideoOpen(true);
  };

  const handleClosePlayer = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = () => {
        setIsLoading(false);
      };
      videoRef.current.onerror = () => {
        setError("Failed to load the video. Please try again.");
        setIsLoading(false);
      };
      videoRef.current.ontimeupdate = () => {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
      };
    }
  }, [isVideoOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    if (isVideoOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen, togglePlayPause]);

  return (
    <div className="w-full">
      {/* Categories */}
      <div className="w-full whitespace-nowrap mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={category.name === "TV" ? "/onplayer" : "#"}
                onClick={() => setSelectedCategory(category.name)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all duration-200 ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30"
                    : "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d]">
        {/* Featured Content */}
        <div className="relative h-[60vh] mb-8">
          <div className="absolute inset-0">
            <img
              src="https://th.bing.com/th/id/OIP.xFhwHZ3o0vDEh1revb4prgAAAA?rs=1&pid=ImgDetMain"
              alt="Featured content"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 text-white">
              Live Sports News
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Stay tuned for the latest scores, highlights, and breaking news
              from the world of sports.
            </p>
            <button
              onClick={handleWatchNow}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/30"
            >
              <Play className="w-5 h-5" /> Watch Now
            </button>
          </div>
        </div>

        {/* Full-Screen Video Player Modal */}
        {isVideoOpen && livSportsNews.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
            <video
              ref={videoRef}
              className="w-full h-full"
              autoPlay
              controls
              playsInline
            >
              <source src={livSportsNews[0].url} type="application/x-mpegURL" />
              Your browser does not support the video tag.
            </video>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="loader border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <p>{error}</p>
              </div>
            )}

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white bg-gray-800 p-3 rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            {/* Volume Control */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-white" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24"
              />
              <span className="text-white">{Math.round(volume * 100)}%</span>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-3/4 bg-gray-700 h-2 rounded-full">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClosePlayer}
              className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
