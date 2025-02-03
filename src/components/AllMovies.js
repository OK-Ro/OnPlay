import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tv,
  Newspaper,
  Film,
  Play,
  User,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

// Sample data
const categories = [
  { id: 1, name: "Sports", icon: Tv },
  { id: 2, name: "News", icon: Newspaper },
  { id: 3, name: "TV", icon: Tv },
  { id: 4, name: "Movies", icon: Film },
];

const featuredMovie = {
  id: 1,
  title: "Inception",
  image:
    "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  rating: 8.8,
  year: 2010,
  description:
    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
};

const latestMovies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    image:
      "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
    rating: 8.2,
    year: 2021,
    description:
      "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
  },
  {
    id: 2,
    title: "Dune",
    image:
      "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    rating: 8.1,
    year: 2021,
    description:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
  },
  {
    id: 3,
    title: "No Time to Die",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg",
    rating: 7.4,
    year: 2021,
    description:
      "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help.",
  },
  {
    id: 4,
    title: "The Batman",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg",
    rating: 7.9,
    year: 2022,
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
  },
  // Add more movies...
];

const topRatedMovies = [
  {
    id: 5,
    title: "The Shawshank Redemption",
    image:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    rating: 9.3,
    year: 1994,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 6,
    title: "The Godfather",
    image:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    rating: 9.2,
    year: 1972,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: 7,
    title: "The Dark Knight",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    rating: 9.0,
    year: 2008,
    description:
      "When the menace known as the Joker emerges, Batman must confront chaos and anarchy in Gotham City.",
  },
  {
    id: 8,
    title: "12 Angry Men",
    image:
      "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
    rating: 9.0,
    year: 1957,
    description:
      "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
  },
  // Add more movies...
];

export default function AllMovies() {
  const [selectedCategory, setSelectedCategory] = useState("Sports");
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const sliderRef = useRef(null);

  const handleWatchNow = (url) => {
    setSelectedVideoUrl(url);
    setIsVideoOpen(true);
  };

  const handleClosePlayer = () => {
    setIsVideoOpen(false);
  };

  const nextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % latestMovies.length);
  };

  const prevMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) => (prevIndex - 1 + latestMovies.length) % latestMovies.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] md:h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${featuredMovie.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        {/* Header with OnPlay Logo */}
        <header className="absolute top-0 left-0 right-0 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-0.5">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
              <img
                src="https://i.pinimg.com/originals/37/97/d9/3797d93321ab72678a94ff686da5c773.png"
                alt="Logo Icon"
                className="w-6 h-6 inline-block ml-1"
              />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              OnPlay
            </h1>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </header>
        {/* Featured Movie Details */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
            {featuredMovie.title}
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-4 md:mb-6">
            {featuredMovie.description}
          </p>
          <button
            onClick={() => handleWatchNow(featuredMovie.url)}
            className="px-4 py-2 md:px-6 md:py-3 bg-white text-black font-semibold rounded-md hover:bg-opacity-80 transition-all duration-300 flex items-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Play Now
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <ul className="flex space-x-6 overflow-x-auto scrollbar-hide justify-center items-center">
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
                        : "#"
                    }
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    <span>{category.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Latest Movies Slider */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Latest Movies
          </h2>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                ref={sliderRef}
                className="flex"
                animate={{ x: `${-currentMovieIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {latestMovies.map((movie, index) => (
                  <div key={movie.id} className="flex-shrink-0 w-full px-2">
                    <motion.div
                      className="bg-gradient-to-br from-gray-400 to-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105"
                      onClick={() => handleWatchNow(movie.url)}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative aspect-video">
                        <img
                          src={movie.image}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 bg-gray-800 rounded-t-4xl  drop-shadow-[0_-4px_5px_rgba(0,0,0,0.9)]">
                        <h3 className="text-lg font-medium truncate text-white">
                          {movie.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-300">
                          <span>{movie.year}</span>
                          <span className="flex items-center">
                            ⭐ {movie.rating}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
            <button
              onClick={prevMovie}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-90 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextMovie}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-90 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* Top Rated Movies Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Top Rated Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedMovies.map((movie) => (
              <motion.div
                key={movie.id}
                className="relative group overflow-hidden rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>{movie.year}</span>
                    <span className="flex items-center">⭐ {movie.rating}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <button
                    onClick={() => handleWatchNow(movie.url)}
                    className="bg-white text-black px-4 py-2 rounded-md flex items-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-800 py-6 text-center text-gray-400">
          <p>© 2023 OnPlay. All rights reserved.</p>
        </footer>
      </div>

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
              <video
                controls
                autoPlay
                className="w-full rounded-lg shadow-2xl"
                src={selectedVideoUrl}
              >
                Your browser does not support the video tag.
              </video>
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
  );
}
