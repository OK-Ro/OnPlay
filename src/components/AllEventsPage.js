"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Calendar, Clock, Star, ArrowLeft } from "lucide-react";

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
    date: "2025-05-15",
    time: "20:00",
    rating: 4.8,
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
    date: "2025-05-28",
    time: "14:00",
    rating: 4.9,
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
    date: "2025-06-10",
    time: "22:00",
    rating: 4.7,
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
    date: "2025-06-15",
    time: "21:00",
    rating: 4.9,
  },
];

export default function AllEventsPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

  const handleWatchNow = (url) => {
    setSelectedVideoUrl(url);
    setIsVideoOpen(true);
  };

  const handleClosePlayer = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="flex items-center text-white hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          <span className="text-lg font-semibold">Back to Featured</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">All Events</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
          >
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{event.description}</p>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-xs">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-xs">{event.time}</span>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="text-xs">{event.rating}</span>
                </div>
              </div>
              <button
                onClick={() => handleWatchNow(event.url)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <video
              className="w-full rounded-lg shadow-2xl"
              autoPlay
              controls
              playsInline
            >
              <source src={selectedVideoUrl} type="application/x-mpegURL" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={handleClosePlayer}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
