import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js"; // Import hls.js
import { Play, Pause, Cast, X } from "lucide-react";

export default function CategoriesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [livSportsNews, setLivSportsNews] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    setLivSportsNews([
      {
        name: "Sky Sports News",
        url: "https://xyzdddd.mizhls.ru/lb/premium366/index.m3u8", // Your HLS stream URL
        logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-news-uk.png",
        group: "SPORTS (DADDY LIVE)",
        tvgId: "SkySp.News.HD.uk",
      },
    ]);
  }, []);

  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      const videoElement = videoRef.current;

      // Check if Hls.js is supported
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(livSportsNews[0].url);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          console.log("Manifest parsed!");
        });

        // Clean up the HLS instance when the component unmounts
        return () => {
          hls.destroy();
        };
      }
      // Fallback for browsers with native HLS support
      else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = livSportsNews[0].url;
      }
    }
  }, [isVideoOpen, livSportsNews]);

  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoOpen]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleWatchNow = () => {
    setIsVideoOpen(true);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setIsVideoOpen(false); // Close the player
    setIsPlaying(false); // Pause the video
    if (videoRef.current) {
      videoRef.current.pause(); // Ensure video is paused
      videoRef.current.currentTime = 0; // Reset the video to the beginning
    }
  };

  const toggleCast = async () => {
    if (typeof window === "undefined") return;

    // Check if AirPlay is available
    if (
      videoRef.current &&
      "webkitShowPlaybackTargetPicker" in videoRef.current
    ) {
      // Use AirPlay
      videoRef.current.webkitShowPlaybackTargetPicker();
      console.log("AirPlay picker shown");
      return;
    }

    // If AirPlay is not available, try using the Presentation API
    if ("presentation" in navigator) {
      try {
        const presentationRequest = new PresentationRequest([
          videoRef.current?.src || "",
        ]);
        const availableDisplays = await presentationRequest.getAvailability();

        console.log("Available displays:", availableDisplays.value);

        if (availableDisplays.value) {
          const connection = await presentationRequest.start();
          console.log("Presentation started:", connection);

          // Start casting the media
          if (videoRef.current) {
            const media = new MediaStream();
            const videoTrack = videoRef.current
              .captureStream()
              .getVideoTracks()[0];
            media.addTrack(videoTrack);

            await connection.send(
              JSON.stringify({ type: "media", stream: media })
            );
            console.log("Media sent to presentation display");
          }
        } else {
          console.warn("No presentation displays available.");
          alert(
            "No casting devices found. Please ensure your devices are turned on and connected to the same network."
          );
        }
      } catch (error) {
        console.error("Error accessing presentation API:", error);
        alert(
          "Unable to access casting functionality. Please check your browser settings and try again."
        );
      }
    } else {
      console.warn(
        "Neither AirPlay nor Presentation API is supported in this browser"
      );
      alert(
        "Casting is not supported in this browser. Please use a compatible browser or device for casting functionality."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d]">
      {/* Featured Content */}
      <div className="relative h-[70vh] mb-8">
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
            Stay tuned for the latest scores, highlights, and breaking news from
            the world of sports.
          </p>
          <button
            onClick={handleWatchNow}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            <Play className="w-5 h-5" /> Watch Now
          </button>
        </div>
      </div>

      {/* Full-Screen Video Player Modal */}
      {isVideoOpen && livSportsNews.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
          <div className="relative w-full h-full">
            <button
              onClick={handleClosePlayer}
              className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full"
            >
              <X />
            </button>
            <video ref={videoRef} className="w-full h-full" autoPlay controls />
            <div className="absolute bottom-4 left-4 flex gap-4">
              <button
                onClick={togglePlayPause}
                className="text-white bg-gray-800 p-2 rounded-full"
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>
              <button
                onClick={toggleCast}
                className="text-white bg-gray-800 p-2 rounded-full"
              >
                <Cast />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
