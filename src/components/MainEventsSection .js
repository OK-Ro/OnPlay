import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Calendar,
  Clock,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  {
    id: 1,
    title: "EFL: Newcastle United vs Arsenal",
    image:
      "https://img-cdn.thepublive.com/fit-in/1200x675/sky247-nigeria/media/media_files/2025/02/04/kQW5kSoVk8NJFrSEAl64.jpg",
    description:
      "Arsenal looks to overturn a 2-0 deficit against Newcastle in the second leg of the Carabao Cup semi-final.",
    name: "Sky Sports Football",
    url: "https://xyzdddd.mizhls.ru/lb/premium50/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-football-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.Football.HD.uk",
    date: "2025-02-05",
    time: "20:00",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Formula 1: Monaco Grand Prix",
    image:
      "https://lustermagazine.com/wp-content/uploads/2024/05/imagen_2024-05-26_123527229-1024x683.jpg",
    description: "Watch the fastest drivers compete in the iconic Monaco race.",
    name: "Sky Sports F1",
    url: "https://xyzdddd.mizhls.ru/lb/premium60/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-f1-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.F1.HD.uk",
    date: "2025-05-28",
    time: "14:00",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Boxing: Tyson Fury vs Oleksandr Usyk",
    image:
      "https://image.discovery.indazn.com/ca/v2/ca/image?id=4wicfatodp01zwdt91lckygse_image-header_pDach_1709744365000",
    description: "Witness the heavyweight championship fight live.",
    name: "TNT Sports 3",
    url: "https://xyzdddd.mizhls.ru/lb/premium33/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-3-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.3.HD.uk",
    date: "2025-06-10",
    time: "22:00",
    rating: 4.7,
  },

  {
    id: 4,
    title: "UEFA: Bayern Munich vs Manchester City",
    image:
      "https://www.mancity.com/meta/media/hi4foa4w/16x9-qf_bayern_munich.jpg?width=1620",
    description:
      "A high-stakes showdown between two of Europe's elite football clubs: Bayern Munich and Manchester City in the Champions League knockout round.",
    name: "UEFA Champions League",
    url: "https://www.uefa.com/uefachampionsleague/season=2025/matches/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/UEFA_Champions_League_logo_2015.svg/600px-UEFA_Champions_League_logo_2015.svg.png",
    group: "SPORTS (EUROPEAN COMPETITIONS)",
    tvgId: "UEFA.Champions.League.HD",
    date: "2025-02-13",
    time: "20:00",
    rating: 4.9,
  },
];

export default function MainEventsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [error, setError] = useState(null);

  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVideoOpen) {
        setCurrentSlide((prev) => (prev + 1) % events.length);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [isVideoOpen]);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section className="mt-8 pb-8 md:mt-12 px-2 md:px-8 lg:px-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Main Events
        </h2>
        <Link
          to="/all-events"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:brightness-110 group"
        >
          <span className="relative z-10">See All</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </Link>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[65vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-2xl drop-shadow-[0_-4px_1px_rgba(0,0,0,0.9)]"
          >
            <img
              src={events[currentSlide].image || "/placeholder.svg"}
              alt={events[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 backdrop-blur-md bg-black/30">
              <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-white mb-2">
                {events[currentSlide].title}
              </h3>
              <p className="text-sm md:text-base text-gray-200 mb-4">
                {events[currentSlide].description}
              </p>
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-6">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="text-sm md:text-base">
                      {events[currentSlide].date}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="text-sm md:text-base">
                      {events[currentSlide].time}
                    </span>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-5 h-5 mr-2" />
                    <span className="text-sm md:text-base">
                      {events[currentSlide].rating}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleWatchNow(events[currentSlide].url)}
                  className="w-full md:w-auto flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Now
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-purple-600 w-6" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-100 z-50 flex items-center justify-center p-2">
          <div className="relative w-full max-w-4xl">
            <video
              ref={videoRef}
              className="w-full rounded-lg shadow-2xl"
              autoPlay
              controls
              playsInline
              onError={() => setError("Failed to load video.")}
            >
              <source src={selectedVideoUrl} type="application/x-mpegURL" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={handleClosePlayer}
              className="absolute -top-12 right-0 text-white bg-pink-900 p-2 rounded-full hover:bg-red-900 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </section>
  );
}
