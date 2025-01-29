import React, { useState, useEffect, useRef } from "react";

const AppTest = () => {
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

          // Capture both video and audio tracks
          const videoTrack = videoRef.current
            .captureStream()
            .getVideoTracks()[0];
          const audioTrack = videoRef.current
            .captureStream()
            .getAudioTracks()[0];

          // Add both video and audio tracks to the media stream
          media.addTrack(videoTrack);
          media.addTrack(audioTrack);

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
    <div className="app-test">
      <h1>Liv Sports News</h1>
      <div>
        {livSportsNews.map((channel, index) => (
          <div key={index} className="channel">
            <h2>{channel.name}</h2>
            <img src={channel.logo} alt={channel.name} width="100" />
            <video
              ref={videoRef}
              controls
              autoPlay
              muted // Ensure muted for autoplay to work in all browsers
              width="100%"
              height="auto"
            >
              <source src={channel.url} type="application/x-mpegURL" />
              Your browser does not support HTML5 video.
            </video>
            <button onClick={toggleCast}>Cast to TV</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppTest;
