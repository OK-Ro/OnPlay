import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Premier League: Manchester United vs Arsenal",
    image:
      "https://assets.khelnow.com/news/uploads/2024/07/250-Arsenal-vs-Man-United-copy.jpg",
    description: "Catch the live action of this thrilling football match.",
  },
  {
    id: 2,
    title: "Formula 1: Monaco Grand Prix",
    image:
      "https://www.sport-tv.org/wp-content/uploads/2023/07/2307-Formule-1.jpg",
    description: "Watch the fastest drivers compete in the iconic Monaco race.",
  },
  {
    id: 3,
    title: "Boxing: Tyson Fury vs Oleksandr Usyk",
    image:
      "https://assets.khelnow.com/news/uploads/2025/01/74-israel-adesanya-vs-nassourdine-Imavov-copy.jpg",
    description: "Witness the heavyweight championship fight live.",
  },
  {
    id: 4,
    title: "NBA Finals: Lakers vs Celtics",
    image:
      "https://bloximages.chicago2.vip.townnews.com/cecildaily.com/content/tncms/assets/v3/editorial/1/fb/1fb76a2e-c416-5bde-8590-1df40d45d08c/679328db4f8ec.image.jpg?resize=750%2C500",
    description: "The ultimate basketball showdown.",
  },
];

export default function MainEventsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

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

  return (
    <section className="mt-8 pb-8 md:mt-12">
      {/* Header with "See All" Button */}
      <div className="flex items-center justify-between px-6">
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          Main Events
        </h2>
        <Link
          to="/all-events"
          className="text-sm md:text-base text-purple-500 hover:text-purple-400 transition-colors"
        >
          See All
        </Link>
      </div>

      <div
        ref={sliderRef}
        className="mt-4 flex overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6"
      >
        {events.map((event, index) => (
          <div
            key={event.id}
            className="flex-shrink-0 w-full snap-center pr-4 transform transition-transform duration-500 hover:scale-105"
          >
            <div className="relative h-[50vh] md:h-[60vh] rounded-xl overflow-hidden group">
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
              <div className="absolute bottom-0 left-0 pl-6 pb-14 md:p-8 max-w-2xl backdrop-blur-sm bg-black/30 rounded-xl border border-white/10 p-6">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-white">
                  {event.title}
                </h1>
                <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-6">
                  {event.description}
                </p>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105">
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Progress Bar */}
      <div className="mt-4 px-6">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / events.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
