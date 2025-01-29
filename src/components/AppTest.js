import React, { useState, useEffect, useRef } from "react";
import Hls from "hls.js"; // Import hls.js for HLS stream
import { Cast, Play, Pause, Maximize2, Minimize2, X } from "lucide-react";

const channels = [
  {
    name: "Sky Sports News",
    url: "https://xyzdddd.mizhls.ru/lb/premium366/index.m3u8", // Replace with your HLS URL
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-news-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.News.HD.uk",
  },
  // Add more channels here
];

export default function AppTest() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  // Set up channels
  useEffect(() => {
    if (selectedChannel && videoRef.current) {
      const videoElement = videoRef.current;

      // Check if HLS.js is supported
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(selectedChannel.url);
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
        videoElement.src = selectedChannel.url;
      }
    }
  }, [selectedChannel]);

  // Play/pause toggle
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

  // Full screen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // Casting function
  const toggleCast = async () => {
    if (typeof window === "undefined") return;

    // Check if AirPlay is available
    if (
      videoRef.current &&
      "webkitShowPlaybackTargetPicker" in videoRef.current
    ) {
      videoRef.current.webkitShowPlaybackTargetPicker();
      console.log("AirPlay picker shown");
      return;
    }

    // If AirPlay is not available, try using the Presentation API
    if ("presentation" in navigator) {
      try {
        const presentationRequest = new PresentationRequest([
          videoRef.current.src,
        ]);
        const availableDisplays = await presentationRequest.getAvailability();

        console.log("Available displays:", availableDisplays.value);

        if (availableDisplays.value) {
          const connection = await presentationRequest.start();
          console.log("Presentation started:", connection);

          // Start casting the media
          const media = new MediaStream();
          const videoTrack = videoRef.current
            .captureStream()
            .getVideoTracks()[0];
          media.addTrack(videoTrack);

          await connection.send(
            JSON.stringify({ type: "media", stream: media })
          );
          console.log("Media sent to presentation display");
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
    <div className="w-full">
      <div className="w-full mb-8 overflow-x-auto">
        <div className="flex space-x-4">
          {channels.map((channel, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedChannel(channel);
                setIsVideoOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white"
            >
              <img src={channel.logo} alt={channel.name} className="w-6 h-6" />
              {channel.name}
            </button>
          ))}
        </div>
      </div>

      {isVideoOpen && selectedChannel && (
        <div
          ref={playerRef}
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
        >
          <video
            ref={videoRef}
            className="w-full h-full"
            autoPlay
            controls={!isFullScreen}
          />
          {/* Show controls only in fullscreen mode */}
          {isFullScreen && (
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
              <button
                onClick={toggleFullScreen}
                className="text-white bg-gray-800 p-2 rounded-full"
              >
                {isFullScreen ? <Minimize2 /> : <Maximize2 />}
              </button>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="text-white bg-gray-800 p-2 rounded-full"
              >
                <X />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
