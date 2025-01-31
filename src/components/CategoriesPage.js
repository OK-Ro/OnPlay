import React, { useState, useEffect, useRef } from "react";
import { Tv, Newspaper, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import MainEventsSection from "./MainEventsSection ";
import NewsPage from "./NewsPage";

const categories = [
  { id: 1, name: "Sports", icon: Tv },
  { id: 2, name: "News", icon: Newspaper },
  { id: 3, name: "TV", icon: Tv },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Sports");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [livSportsNews, setLivSportsNews] = useState([]);
  const videoRef = useRef(null);
  const sliderRef = useRef(null);

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

  const livestreams = [
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

  useEffect(() => {
    const handleScroll = () => {
      const container = sliderRef.current;
      const slideWidth = container.offsetWidth / livestreams.length;
      const scrollPosition = container.scrollLeft;

      const index = Math.floor(scrollPosition / slideWidth);
      setCurrentChannelIndex(index);
    };

    const container = sliderRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [livestreams.length]);

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
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Categories */}
        <div className="pt-4 md:pt-6">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={
                    category.name === "TV"
                      ? "/onplayer"
                      : category.name === "News"
                      ? "/all-news"
                      : "#"
                  }
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex-shrink-0 snap-start ml-2 inline-flex items-center gap-4 px-5 py-3 rounded-xl text-white transition-all duration-200 ${
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

        {/* Featured Content */}
        <div className="relative h-[50vh] md:h-[60vh] mt-4 b-4 rounded-xl overflow-hidden">
          <img
            src="https://i0.wp.com/www.benaventedigital.es/wp-content/uploads/2020/06/deporte-scaled.jpg?fit=2560%2C1440&ssl=1"
            alt="Featured content"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 pl-6 pb-14 md:p-8 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-white">
              Live Sports News
            </h1>
            <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6">
              Stay tuned for the latest scores, highlights, and breaking news
              from the world of sports.
            </p>
            <button
              onClick={() => handleWatchNow(livSportsNews[0]?.url)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-purple-500/30"
            >
              Watch Now
            </button>
          </div>
        </div>

        {/* Live Channels */}
        <section className="mt-8 pb-8 md:mt-12">
          <h2 className="text-xl ml-6 md:text-2xl font-semibold text-white mb-4">
            Live Channels
          </h2>
          <div
            ref={sliderRef}
            className="ml-0.5 mr-0.5 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 p-6"
            style={{ scrollbarWidth: "none" }}
          >
            {livestreams.map((stream, index) => (
              <div
                key={stream.tvgId}
                className="flex-shrink-0 w-[112%] snap-center pr-1.5"
              >
                <div
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer relative"
                  onClick={() => handleWatchNow(stream.url)}
                >
                  <div className="relative aspect-video">
                    <img
                      src={stream.logo || "/placeholder.svg"}
                      alt={stream.name}
                      className="w-full h-full object-contain p-4 bg-black/40"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                      LIVE
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-white truncate">
                      {stream.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{stream.group}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {livestreams.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentChannelIndex ? "bg-white" : "bg-gray-600"
                }`}
                onClick={() => setCurrentChannelIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
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

      <div className="w-full mt-2">
        <MainEventsSection />
      </div>

      <div className="w-full mt-2">
        <NewsPage />
      </div>
    </div>
  );
}
