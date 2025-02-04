import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Tv,
  Newspaper,
  User,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Eye,
  Film,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import NewsPage from "./NewsPage";

import Footer from "./Footer";
import MoviesSection from "./MoviesSection";
import MainEventsSection from "./MainEventsSection ";

const categories = [
  { id: 1, name: "Sports", icon: Tv },
  { id: 2, name: "News", icon: Newspaper },
  { id: 3, name: "TV", icon: Tv },
  { id: 4, name: "Movies", icon: Film },
];

const livestreams = [
  {
    name: "Sky sports Premier League",
    url: "https://xyzdddd.mizhls.ru/lb/premium130/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/sky-sports-premier-league-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.PL.uk",
  },
  {
    name: "TNT Sports 1",
    url: "https://xyzdddd.mizhls.ru/lb/premium31/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-1-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.1.HD.uk",
  },
  {
    name: "Sky Sports Main Event",
    url: "https://xyzdddd.mizhls.ru/lb/premium38/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/hd/sky-sports-main-event-hd-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySpMainEvHD.uk",
  },
  {
    name: "TNT Sports 3",
    url: "https://xyzdddd.mizhls.ru/lb/premium33/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-3-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.3.HD.uk",
  },
  {
    name: "TNT Sports 4",
    url: "https://xyzdddd.mizhls.ru/lb/premium34/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-4-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.4.HD.uk",
  },
  {
    name: "Sky Sports F1",
    url: "https://xyzdddd.mizhls.ru/lb/premium60/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-f1-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.F1.HD.uk",
  },
  {
    name: "ESPN",
    url: "https://xyzdddd.mizhls.ru/lb/premium44/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/espn-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "ESPN.us",
  },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Sports");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [livSportsNews, setLivSportsNews] = useState([]);
  const [hoveredChannel, setHoveredChannel] = useState(null);
  const videoRef = useRef(null);
  const sliderRef = useRef(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isWindows, setIsWindows] = useState(false);
  const [isSmartTV, setIsSmartTV] = useState(false);
  const [isPC, setIsPC] = useState(false);
  const [useHls, setUseHls] = useState(false);

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

  const loadHls = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => setUseHls(true);
  }, []);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));
    setIsWindows(/win/.test(userAgent));
    setIsSmartTV(
      /smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv|webos/.test(
        userAgent
      )
    );
    setIsPC(
      /windows nt|linux|macintosh/.test(userAgent) &&
        !/mobile|android/.test(userAgent)
    );

    if (!/iphone|ipad|ipod/.test(userAgent)) {
      loadHls();
    }
  }, [loadHls]);

  const handleWatchNow = useCallback((url) => {
    setSelectedVideoUrl(url);
    setIsVideoOpen(true);
  }, []);

  const handleClosePlayer = useCallback(() => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const nextChannel = useCallback(() => {
    setCurrentChannelIndex((prevIndex) => (prevIndex + 1) % livestreams.length);
  }, []);

  const prevChannel = useCallback(() => {
    setCurrentChannelIndex(
      (prevIndex) => (prevIndex - 1 + livestreams.length) % livestreams.length
    );
  }, []);

  const CustomVideoPlayer = React.memo(({ src }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        if (useHls && window.Hls && window.Hls.isSupported()) {
          const hls = new window.Hls();
          hls.loadSource(src);
          hls.attachMedia(videoRef.current);
        } else if (
          videoRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
          videoRef.current.src = src;
        }
      }
    }, [src]);

    return (
      <div className="relative w-full h-0 pb-[56.25%]">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
          controls
          playsInline
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6 flex items-center justify-between">
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
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </header>

        {/* Categories */}
        <nav className="mb-8">
          <ul className="flex space-x-2 overflow-x-auto scrollbar-hide justify-center items-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <li key={category.id}>
                  <Link
                    to={
                      category.name === "TV"
                        ? "/tv"
                        : category.name === "News"
                        ? "/all-news"
                        : category.name === "Movies"
                        ? "/all-movies"
                        : category.name === "Sports"
                        ? "/"
                        : "#"
                    }
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center px-3 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{category.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Featured Content */}
        <section className="mb-12">
          <div className="relative h-[70vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl drop-shadow-[0_-4px_10px_rgba(0,0,0,0.9)]">
            <img
              src="https://th.bing.com/th/id/R.ef37a6e2cff0d884ebdeb88105007782?rik=OpAQgZ4p7Z4jxw&riu=http%3a%2f%2fwww.baltana.com%2ffiles%2fwallpapers-2%2fSports-HD-Images-05075.jpg&ehk=mmD%2bgpSxygBfeZQA%2bQ%2ff9f39wi8Guvb%2bnb%2fb2%2fDyx6o%3d&risl=&pid=ImgRaw&r=0"
              alt="Featured content"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
                Live Sports News
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-4 md:mb-6">
                Stay tuned for the latest scores, highlights, and breaking news
                from the world of sports.
              </p>
              <button
                onClick={() => handleWatchNow(livSportsNews[0]?.url)}
                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Now
              </button>
            </div>
          </div>
        </section>

        {/* Live Channels */}
        <section className="mb-12">
          <h2 className="text-2xl ml-2 font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Live Channels
          </h2>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                ref={sliderRef}
                className="flex"
                animate={{ x: `${-currentChannelIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {livestreams.map((stream, index) => (
                  <div
                    key={stream.tvgId}
                    className="flex-shrink-0 w-full px-2 drop-shadow-[0_-4px_10px_rgba(0,0,0,0.9)]"
                  >
                    <motion.div
                      className="bg-gradient-to-br from-gray-400 to-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105"
                      onClick={() => handleWatchNow(stream.url)}
                      onHoverStart={() => setHoveredChannel(index)}
                      onHoverEnd={() => setHoveredChannel(null)}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative aspect-video">
                        <img
                          src={stream.logo || "/placeholder.svg"}
                          alt={stream.name}
                          className="w-full h-full object-contain p-4"
                        />
                        <div className="absolute top-4 left-4 bg-red-500 z-10 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                          LIVE
                        </div>
                        <AnimatePresence>
                          {hoveredChannel === index && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                            >
                              <Eye className="w-12 h-12 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="p-4 bg-gray-800 rounded-t-3xl  drop-shadow-[0_-4px_5px_rgba(0,0,0,0.9)]">
                        <h3 className="text-lg font-medium truncate text-white">
                          {stream.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {stream.group}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
            <button
              onClick={prevChannel}
              className="absolute -left-3 top-1/2 z-50 transform -translate-y-1/2 bg-black bg-opacity-90 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextChannel}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-90 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {livestreams.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentChannelIndex
                    ? "bg-purple-600 w-6"
                    : "bg-gray-600"
                }`}
                onClick={() => setCurrentChannelIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Main Events Section */}
        <MainEventsSection />
        <MoviesSection />

        {/* News Page */}
        <NewsPage />

        {/* Video Player Modal */}
        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            >
              <div className="relative w-full max-w-4xl">
                <CustomVideoPlayer src={selectedVideoUrl} />
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-white text-center text-sm">
                    {isIOS
                      ? "Video playback is optimized for iOS devices."
                      : isAndroid
                      ? "Video playback is optimized for Android devices."
                      : isWindows || isPC
                      ? "If you're having trouble, try a different browser or update your current one."
                      : isSmartTV
                      ? "If the video doesn't play, try updating your smart TV's software."
                      : "If you're having issues, try a different browser or update your software."}
                  </p>
                </div>
                <button
                  onClick={handleClosePlayer}
                  className="absolute -top-12 right-0 text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
