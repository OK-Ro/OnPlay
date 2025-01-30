import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import Hls from "hls.js";

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
        url: "https://xyzdddd.mizhls.ru/lb/premium366/index.m3u8",
        logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-news-uk.png",
        group: "SPORTS (DADDY LIVE)",
        tvgId: "SkySp.News.HD.uk",
      },
    ]);
  }, []);

  const handleWatchNow = () => {
    setIsVideoOpen(true);
    if (videoRef.current) {
      const url = livSportsNews[0]?.url;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = url;
        videoRef.current.play();
      } else {
        console.error("HLS not supported");
      }
    }
  };

  const handleClosePlayer = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="w-full">
      <div className="w-full whitespace-nowrap mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={category.name === "TV" ? "/onplayer" : "#"}
                onClick={() => setSelectedCategory(category.name)}
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

        {isVideoOpen && livSportsNews.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              playsInline
            />
            <button
              onClick={handleClosePlayer}
              className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full"
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
