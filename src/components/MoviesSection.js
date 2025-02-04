import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, X } from "lucide-react";

const movies = [
  {
    id: 2,
    title: "The Dark Knight",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    rating: 9.0,
    year: 2008,
    description:
      "When the menace known as the Joker emerges, Batman must confront chaos and anarchy in Gotham City.",
    videoUrl: "https://www.example.com/videos/dark-knight.mp4",
  },
  {
    id: 3,
    title: "Interstellar",
    image:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    rating: 8.6,
    year: 2014,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    videoUrl: "https://www.example.com/videos/interstellar.mp4",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    image:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    rating: 8.9,
    year: 1994,
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    videoUrl: "https://www.example.com/videos/pulp-fiction.mp4",
  },
  {
    id: 5,
    title: "The Matrix",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    rating: 8.7,
    year: 1999,
    description:
      "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    videoUrl: "https://www.example.com/videos/matrix.mp4",
  },
];

const trendingMovies = [
  {
    id: 6,
    title: "Avengers: Endgame",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    rating: 8.4,
    year: 2019,
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions and restore balance.",
    videoUrl: "https://www.example.com/videos/endgame.mp4",
  },
  {
    id: 7,
    title: "Joker",
    image:
      "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    rating: 8.4,
    year: 2019,
    description:
      "A mentally troubled comedian embarks on a downward spiral of chaos and revolution in Gotham City.",
    videoUrl: "https://www.example.com/videos/joker.mp4",
  },
];

const topRatedMovies = [
  {
    id: 8,
    title: "The Shawshank Redemption",
    image:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    rating: 9.3,
    year: 1994,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    videoUrl: "https://www.example.com/videos/shawshank-redemption.mp4",
  },
  {
    id: 9,
    title: "The Godfather",
    image:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    rating: 9.2,
    year: 1972,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    videoUrl: "https://www.example.com/videos/godfather.mp4",
  },
];

export default function MoviesSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setFeaturedMovie(movies[0]);
      }, 1000);

      return () => clearTimeout(timer);
    } catch (err) {
      setError("Something went wrong!");
    }
  }, []);

  const handleWatchNow = (movie) => {
    setSelectedMovie(movie);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedMovie(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Big Banner */}
      {featuredMovie && (
        <div className="relative h-[70vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl drop-shadow-[0_-4px_10px_rgba(0,0,0,0.9)]">
          <img
            src={featuredMovie.image}
            alt={featuredMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
              {featuredMovie.title}
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-4 md:mb-6">
              {featuredMovie.description}
            </p>
            <button
              onClick={() => handleWatchNow(featuredMovie)}
              className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Now
            </button>
          </div>
        </div>
      )}

      {/* Popular Movies Grid */}
      <MovieGrid
        title="Popular Movies"
        movies={movies}
        onWatchNow={handleWatchNow}
      />

      {/* Trending Movies Grid */}
      <MovieGrid
        title="Trending Movies"
        movies={trendingMovies}
        onWatchNow={handleWatchNow}
      />

      {/* Top Rated Movies Grid */}
      <MovieGrid
        title="Top Rated Movies"
        movies={topRatedMovies}
        onWatchNow={handleWatchNow}
      />

      {/* Video Player Modal */}
      <AnimatePresence>
        {isPlayerOpen && selectedMovie && (
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
                src={selectedMovie.videoUrl}
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

function MovieGrid({ title, movies, onWatchNow }) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="relative group overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
            <img
              src={movie.image || "/placeholder.svg"}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-lg font-semibold text-white mb-1">
                {movie.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>{movie.year}</span>
                <span className="flex items-center">
                  <Film className="w-4 h-4 text-yellow-400 mr-1" />
                  {movie.rating}
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <button
                onClick={() => onWatchNow(movie)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
