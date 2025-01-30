import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Hls from "hls.js"; // Import hls.js for HLS support
import { X } from "lucide-react"; // Import the X icon

const events = [
  {
    id: 1,
    title: "Premier League: Manchester United vs Arsenal",
    image:
      "https://assets.khelnow.com/news/uploads/2024/07/250-Arsenal-vs-Man-United-copy.jpg",
    description: "Catch the live action of this thrilling football match.",
    name: "TNT Sports 4",
    url: "https://xyzdddd.mizhls.ru/lb/premium34/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-4-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.4.HD.uk",
  },
  {
    id: 2,
    title: "Formula 1: Monaco Grand Prix",
    image:
      "https://www.sport-tv.org/wp-content/uploads/2023/07/2307-Formule-1.jpg",
    description: "Watch the fastest drivers compete in the iconic Monaco race.",
    name: "Sky Sports F1",
    url: "https://xyzdddd.mizhls.ru/lb/premium60/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-f1-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.F1.HD.uk",
  },
  {
    id: 3,
    title: "Boxing: Tyson Fury vs Oleksandr Usyk",
    image:
      "https://assets.khelnow.com/news/uploads/2025/01/74-israel-adesanya-vs-nassourdine-Imavov-copy.jpg",
    description: "Witness the heavyweight championship fight live.",
    name: "TNT Sports 3",
    url: "https://xyzdddd.mizhls.ru/lb/premium33/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-3-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.3.HD.uk",
  },
  {
    id: 4,
    title: "NBA Finals: Lakers vs Celtics",
    image:
      "https://bloximages.chicago2.vip.townnews.com/cecildaily.com/content/tncms/assets/v3/editorial/1/fb/1fb76a2e-c416-5bde-8590-1df40d45d08c/679328db4f8ec.image.jpg?resize=750%2C500",
    description: "The ultimate basketball showdown.",
    name: "TNT Sports 1",
    url: "https://xyzdddd.mizhls.ru/lb/premium31/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-1-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.1.HD.uk",
  },
];

export default function MainEventsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const sliderRef = useRef(null);
  const videoRef = useRef(null);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll to the current slide
  useEffect(() => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const slideWidth = container.offsetWidth;
      container.scrollTo({
        left: currentSlide * slideWidth,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  // Handle "Watch Now" button click
  const handleWatchNow = (url) => {
    setIsVideoOpen(true);

    // Use hls.js for HLS playback
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play().catch((error) => {
          console.error("Autoplay failed:", error);
        });
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (e.g., Safari)
      videoRef.current.src = url;
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    } else {
      console.error("HLS is not supported in this browser.");
    }
  };

  // Handle closing the video player
  const handleClosePlayer = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="mt-8 pb-8 md:mt-12 pl-6 p-4">
      {/* Header with "See All" Button */}
      <div className="flex items-center justify-between px-1 ">
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          All Channels
        </h2>
        <Link
          to="/all-events"
          className="text-l l-2 md:text-base text-purple-500 hover:text-purple-400 transition-colors"
        >
          See All
        </Link>
      </div>

      <div
        ref={sliderRef}
        className="mt-5 flex overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-8 px-4"
      >
        {events.map((event, index) => (
          <div
            key={event.id}
            className="flex-shrink-0 w-full snap-center pr-2 transform transition-transform duration-500 hover:scale-105"
          >
            <div className="relative h-[45vh] md:h-[60vh] rounded-xl overflow-hidden group">
              {/* Background Image */}
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-transparent" />

              {/* Glassmorphism Container */}
              <div className="absolute bottom-0 left-0 pl-6 pb-8 md:p-8 max-w-2xl backdrop-blur-sm bg-black/30 rounded-xl border border-white/10 p-6">
                <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 text-white">
                  {event.title}
                </h1>
                <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6">
                  {event.description}
                </p>
                <button
                  onClick={() => handleWatchNow(event.url)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                >
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Progress Bar */}
      <div className="mt-4 px-16">
        <div className="w-full bg-gray-700 rounded-full h-1">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-1 rounded-full transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / events.length) * 100}%`,
            }}
          />
        </div>
      </div>

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
              className="w-full h-full max-h-[80vh] object-contain"
              controls
              autoPlay
              playsInline
              muted // Ensure muted for autoplay on mobile devices
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
