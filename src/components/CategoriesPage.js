import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js"; // Import hls.js
import { Play, X } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for routing

const categories = [
  { id: 1, name: "Sports", icon: Play },
  { id: 2, name: "News", icon: Play },
  { id: 3, name: "TV", icon: Play },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Sports");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [livSportsNews, setLivSportsNews] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    setLivSportsNews([
      {
        name: "Sky Sports News",
        url: "https://xyzdddd.mizhls.ru/lb/premium366/index.m3u8", // Your HLS stream URL
        logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-news-uk.png",
        group: "SPORTS (DADDY LIVE)",
        tvgId: "SkySp.News.HD.uk",
      },
    ]);
  }, []);

  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      const videoElement = videoRef.current;

      // Check if Hls.js is supported
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(livSportsNews[0].url);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          console.log("Manifest parsed!");
        });

        // Clean up the HLS instance when the component unmounts
        return () => {
          hls.destroy();
        };
      }
      // Fallback for browsers with native HLS support
      else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = livSportsNews[0].url;
      }
    }
  }, [isVideoOpen, livSportsNews]);

  const handleWatchNow = () => {
    setIsVideoOpen(true);
  };

  const handleClosePlayer = () => {
    setIsVideoOpen(false); // Close the player
    if (videoRef.current) {
      videoRef.current.pause(); // Ensure video is paused
      videoRef.current.currentTime = 0; // Reset the video to the beginning
    }
  };

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
                to={category.name === "TV" ? "/onplayer" : "#"} // Link to /onplayer if category is "TV"
                onClick={() => setSelectedCategory(category.name)} // Set selected category
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
              controls // Enable default controls
            />
            {/* Close Button */}
            <button
              onClick={handleClosePlayer}
              className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full"
            >
              <X />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
