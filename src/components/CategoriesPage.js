"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Star, Clock, TrendingUp, ChevronRight } from "lucide-react";

const Image = ({ src, alt, width, height, className, fill }) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={fill ? { objectFit: "cover", width: "100%", height: "100%" } : {}}
    />
  );
};

const categories = [
  { id: 1, name: "Sports", icon: TrendingUp },
  { id: 2, name: "Movies", icon: Play },
  { id: 3, name: "News", icon: Clock },
];

const liveMatches = [
  {
    id: 1,
    teams: "Manchester United vs Arsenal",
    time: "Live",
    league: "Premier League",
    thumbnail:
      "https://i2-prod.football.london/arsenal-fc/article16986685.ece/ALTERNATES/s1200/0_Man-United-Arsenal.png",
    viewerCount: "124K",
  },
  {
    id: 2,
    teams: "Lakers vs Warriors",
    time: "Starting in 20min",
    league: "NBA",
    thumbnail:
      "https://cdn.nba.com/manage/2023/05/GettyImages-1252880603-1568x977.jpg",
    viewerCount: "89K",
  },
  {
    id: 3,
    teams: "Real Madrid vs Barcelona",
    time: "Today 20:45",
    league: "La Liga",
    thumbnail: "https://notjustok.com/wp-content/uploads/2022/10/images-1.jpeg",
    viewerCount: "203K",
  },
];

const popularMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    thumbnail:
      "https://sjc.microlink.io/v2LmQDwsgrGWiusuRafiK6vDRmEtWy_EBvLrlXg-0c8ouKgIwkVNyuAxVY9dIKSv7r9EeOZYPG048Uj9IqLh_w.jpeg",
    rating: "9.0",
    year: "2008",
    duration: "2h 32min",
  },
  {
    id: 2,
    title: "Inception",
    thumbnail:
      "https://sjc.microlink.io/v2LmQDwsgrGWiusuRafiK6vDRmEtWy_EBvLrlXg-0c8ouKgIwkVNyuAxVY9dIKSv7r9EeOZYPG048Uj9IqLh_w.jpeg",
    rating: "8.8",
    year: "2010",
    duration: "2h 28min",
  },
  {
    id: 3,
    title: "Interstellar",
    thumbnail:
      "https://sjc.microlink.io/v2LmQDwsgrGWiusuRafiK6vDRmEtWy_EBvLrlXg-0c8ouKgIwkVNyuAxVY9dIKSv7r9EeOZYPG048Uj9IqLh_w.jpeg",
    rating: "8.6",
    year: "2014",
    duration: "2h 49min",
  },
];

const currentNews = [
  {
    id: 1,
    headline: "Breaking: Major Sports Event Announcement",
    thumbnail:
      "https://sjc.microlink.io/v2LmQDwsgrGWiusuRafiK6vDRmEtWy_EBvLrlXg-0c8ouKgIwkVNyuAxVY9dIKSv7r9EeOZYPG048Uj9IqLh_w.jpeg",
    time: "2 hours ago",
    source: "Sports News",
  },
  {
    id: 2,
    headline: "Exclusive: Behind the Scenes of Upcoming Blockbuster",
    thumbnail:
      "https://sjc.microlink.io/v2LmQDwsgrGWiusuRafiK6vDRmEtWy_EBvLrlXg-0c8ouKgIwkVNyuAxVY9dIKSv7r9EeOZYPG048Uj9IqLh_w.jpeg",
    time: "4 hours ago",
    source: "Entertainment Weekly",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19]">
      {/* Featured Content */}
      <div className="relative h-[70vh] mb-8">
        <div className="absolute inset-0">
          <Image
            src="https://th.bing.com/th/id/OIP.xFhwHZ3o0vDEh1revb4prgAAAA?rs=1&pid=ImgDetMain"
            alt="Featured content"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
          <span className="inline-block px-2 py-1 bg-blue-500 text-white text-sm font-medium rounded mb-4">
            Featured
          </span>
          <h1 className="text-5xl font-bold mb-4 text-white">
            Champions League Final
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Experience the ultimate showdown live from Wembley Stadium. Don't
            miss a moment of this historic match.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Play className="w-5 h-5" /> Watch Now
          </button>
        </div>
      </div>

      <div className="container mx-auto ">
        {/* Categories */}
        <div className="w-full whitespace-nowrap mb-8 overflow-x-auto">
          <div className="flex space-x-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#1c2231] rounded-lg text-white hover:bg-[#262d40] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Live Sports */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Live Sports</h2>
            <button className="text-blue-400 hover:text-blue-300 flex items-center">
              See All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="flex gap-4">
              {liveMatches.map((match) => (
                <motion.div
                  key={match.id}
                  whileHover={{ scale: 1.02 }}
                  className="relative flex-none w-[400px]"
                >
                  <div className="bg-[#1c2231] rounded-lg overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={match.thumbnail || "/placeholder.svg"}
                        alt={match.teams}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 rounded text-sm font-medium text-white">
                        {match.time}
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 rounded text-sm text-white">
                        {match.viewerCount} watching
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-blue-400 mb-1">
                        {match.league}
                      </div>
                      <h3 className="font-semibold text-white mb-4">
                        {match.teams}
                      </h3>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                        Watch Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Movies */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Popular Movies
            </h2>
            <button className="text-blue-400 hover:text-blue-300 flex items-center">
              Browse All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularMovies.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="bg-[#1c2231] rounded-lg overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={movie.thumbnail || "/placeholder.svg"}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Play className="w-5 h-5" /> Play Now
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">
                        {movie.title}
                      </h3>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm">{movie.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{movie.year}</span>
                      <span className="mx-2">•</span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* News Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Latest News</h2>
            <button className="text-blue-400 hover:text-blue-300 flex items-center">
              More News <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentNews.map((news) => (
              <motion.div
                key={news.id}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="bg-[#1c2231] rounded-lg overflow-hidden">
                  <div className="relative aspect-[2/1]">
                    <Image
                      src={news.thumbnail || "/placeholder.svg"}
                      alt={news.headline}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2">
                      {news.headline}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{news.source}</span>
                      <span className="mx-2">•</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
