import React, { useState, useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Hls from "hls.js";

const ChannelList = [
  {
    name: "Sky Sport Top Event DE",
    url: "https://xyzdddd.mizhls.ru/lb/premium556/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/germany/sky-sport/sky-sport-top-event-de.png",
    group: "SPORTS MISC (DADDY LIVE)",
    tvgId: "Sky.Sport.Top.Event.de",
  },
  {
    name: "Sky Sports Action",
    url: "https://xyzdddd.mizhls.ru/lb/premium37/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-action-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.ActionHD.uk",
  },
  {
    name: "Sky Sports Arena",
    url: "https://xyzdddd.mizhls.ru/lb/premium36/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-arena-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "12358",
  },
  {
    name: "Sky Sports Cricket",
    url: "https://xyzdddd.mizhls.ru/lb/premium65/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/sky-sports-cricket-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.Cricket.uk",
  },
  {
    name: "Sky Sports F1",
    url: "https://xyzdddd.mizhls.ru/lb/premium60/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-f1-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.F1.HD.uk",
  },
  {
    name: "Sky Sports Football",
    url: "https://xyzdddd.mizhls.ru/lb/premium35/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-football-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Sky.Sports.Football.HD.uk",
  },
  {
    name: "Sky Sports Golf",
    url: "https://xyzdddd.mizhls.ru/lb/premium70/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-golf-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.Golf.HD.uk",
  },
  {
    name: "Sky Sports Main Event",
    url: "https://xyzdddd.mizhls.ru/lb/premium38/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/hd/sky-sports-main-event-hd-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySpMainEvHD.uk",
  },
  {
    name: "Sky Sports MIX",
    url: "https://xyzdddd.mizhls.ru/lb/premium557/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-mix-uk.png",
    group: "SPORTS MISC (DADDY LIVE)",
    tvgId: "Sky.Mix.HD.uk",
  },
  {
    name: "Sky Sports News",
    url: "https://xyzdddd.mizhls.ru/lb/premium366/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-news-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.News.HD.uk",
  },
  {
    name: "Sky sports Premier League",
    url: "https://xyzdddd.mizhls.ru/lb/premium130/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/sky-sports-premier-league-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.PL.uk",
  },
  {
    name: "Sky Sports Racing",
    url: "https://xyzdddd.mizhls.ru/lb/premium554/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/sky-sports-racing-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.Racing.HD.uk",
  },
  {
    name: "Sky Witness HD",
    url: "https://xyzdddd.mizhls.ru/lb/premium361/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-witness-uk.png",
    group: "UK (DADDY LIVE)",
    tvgId: "Sky.Witness.HD.uk",
  },
  {
    name: "Spectrum Sportsnet LA",
    url: "https://xyzdddd.mizhls.ru/lb/premium764/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/spectrum-sportsnet-la-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Spectrum.Sportsnet.Lakers.us",
  },
  {
    name: "Sportsnet 360",
    url: "https://xyzdddd.mizhls.ru/lb/premium409/index.m3u8",
    logo: "https://w7.pngwing.com/pngs/746/852/png-transparent-sportsnet-360-cfac-calgary-flames-national-hockey-league-others-text-logo-world.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Sportsnet.360.ca",
  },
  {
    name: "Sportsnet East",
    url: "https://xyzdddd.mizhls.ru/lb/premium408/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/canada/sportsnet-east-ca.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Sportsnet.(East).-.Satellite/Digital.ca",
  },
  {
    name: "SportsNet New York (SNY)",
    url: "https://xyzdddd.mizhls.ru/lb/premium759/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/SNY_logo.svg/1200px-SNY_logo.svg.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SportsNetNewYork.us",
  },
  {
    name: "Sportsnet One",
    url: "https://xyzdddd.mizhls.ru/lb/premium411/index.m3u8",
    logo: "https://cdn.tvpassport.com/image/station/240x135/v2/s68859_h15_ac.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Sportsnet.One.ca",
  },
  {
    name: "Sportsnet Ontario",
    url: "https://xyzdddd.mizhls.ru/lb/premium406/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/canada/sportsnet-ontario-ca.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Sportsnet.(Ontario).ca",
  },
  {
    name: "SportsNet Pittsburgh",
    url: "https://xyzdddd.mizhls.ru/lb/premium922/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/sportsnet-pittsburgh-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SportsNet.Pittsburgh.us",
  },
  {
    name: "Sportsnet West",
    url: "https://xyzdddd.mizhls.ru/lb/premium407/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/canada/sportsnet-west-ca.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Sportsnet.(West).-.Satellite/Digital.ca",
  },
  {
    name: "Sportsnet World",
    url: "https://xyzdddd.mizhls.ru/lb/premium410/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/canada/sportsnet-world-ca.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Sportsnet.World.ca",
  },
  {
    name: "Viaplay Sports 1",
    url: "https://xyzdddd.mizhls.ru/lb/premium451/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/viaplay-sports-1-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Premier.Sports.1.HD.uk",
  },
  {
    name: "Viaplay Sports 2",
    url: "https://xyzdddd.mizhls.ru/lb/premium550/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/viaplay-sports-2-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Premier.Sports.2.HD.uk",
  },
  {
    name: "ESPN",
    url: "https://xyzdddd.mizhls.ru/lb/premium44/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/espn-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "ESPN.us",
  },
  {
    name: "ESPN 2",
    url: "https://xyzdddd.mizhls.ru/lb/premium45/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/espn-2-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "ESPN2.us",
  },
  {
    name: "ESPN Deportes",
    url: "https://xyzdddd.mizhls.ru/lb/premium375/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/espn-deportes-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "ESPN.Deportes.us",
  },
  {
    name: "ESPNews",
    url: "https://xyzdddd.mizhls.ru/lb/premium288/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/espnews-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "ESPN.News.us",
  },
  {
    name: "ESPNU",
    url: "https://xyzdddd.mizhls.ru/lb/premium316/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/ESPN_U_logo.svg/1200px-ESPN_U_logo.svg.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "ESPNU.On.Demand.us",
  },
  {
    name: "EuroSport 1",
    url: "https://xyzdddd.mizhls.ru/lb/premium41/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/eurosport-1-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Eurosport.1.HD.uk",
  },
  {
    name: "EuroSport 2",
    url: "https://xyzdddd.mizhls.ru/lb/premium42/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/eurosport-2-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Eurosport.2.HD.uk",
  },
  {
    name: "FOX Soccer Plus",
    url: "https://xyzdddd.mizhls.ru/lb/premium756/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/fox-soccer-plus-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "FOX.Soccer.Plus.HD.us",
  },
  {
    name: "Fox Sports 1",
    url: "https://xyzdddd.mizhls.ru/lb/premium39/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/fox-sports-1-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Fox.Sports.1.us",
  },
  {
    name: "Fox Sports 2",
    url: "https://xyzdddd.mizhls.ru/lb/premium758/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-states/fox-sports-2-us.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "Fox.Sports.2.us",
  },
  {
    name: "FOX Sports 502",
    url: "https://xyzdddd.mizhls.ru/lb/premium820/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/8c9d06e33d31b0ac3804acb5d5f2d1050f0c1384/countries/australia/fox-sports-league-502-au.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "FoxLeague.au",
  },
  {
    name: "FOX Sports 503",
    url: "https://xyzdddd.mizhls.ru/lb/premium821/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/8c9d06e33d31b0ac3804acb5d5f2d1050f0c1384/countries/australia/fox-sports-503-au.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "FoxSports503.au",
  },
  {
    name: "FOX Sports 504",
    url: "https://xyzdddd.mizhls.ru/lb/premium822/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/8c9d06e33d31b0ac3804acb5d5f2d1050f0c1384/countries/australia/fox-sports-footy-504-au.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "FoxFooty.au",
  },
  {
    name: "FOX Sports 505",
    url: "https://xyzdddd.mizhls.ru/lb/premium823/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/australia/fox-sports-505-au.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "FoxSports505.au",
  },
  {
    name: "FOX Sports 506",
    url: "https://xyzdddd.mizhls.ru/lb/premium824/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/australia/fox-sports-506-au.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "FoxSports506.au",
  },
  {
    name: "FOX Sports 507",
    url: "https://xyzdddd.mizhls.ru/lb/premium825/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/8c9d06e33d31b0ac3804acb5d5f2d1050f0c1384/countries/australia/fox-sports-507-au.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySpMainEv.uk",
  },

  {
    name: "TNT Sports 1",
    url: "https://xyzdddd.mizhls.ru/lb/premium31/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-1-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.1.HD.uk",
  },
  {
    name: "TNT Sports 2",
    url: "https://xyzdddd.mizhls.ru/lb/premium32/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-2-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.2.HD.uk",
  },
  {
    name: "TNT Sports 3",
    url: "https://xyzdddd.mizhls.ru/lb/premium33/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-3-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.3.HD.uk",
  },
  {
    name: "TNT Sports 4",
    url: "https://xyzdddd.mizhls.ru/lb/premium34/index.m3u8",
    logo: "https://github.com/tv-logo/tv-logos/blob/main/countries/united-kingdom/tnt-sports-4-uk.png?raw=true",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "TNT.Sports.4.HD.uk",
  },
  {
    name: "Sky Sports F1",
    url: "https://xyzdddd.mizhls.ru/lb/premium60/index.m3u8",
    logo: "https://raw.githubusercontent.com/tv-logo/tv-logos/main/countries/united-kingdom/sky-sports-f1-uk.png",
    group: "SPORTS (DADDY LIVE)",
    tvgId: "SkySp.F1.HD.uk",
  },
  // Add more channels here...
];

export default function AllChannelsPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const handleWatchNow = (url) => {
    setSelectedVideoUrl(url);
    setIsVideoOpen(true);
  };

  const handleClosePlayer = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Initialize HLS.js for video playback
  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      const video = videoRef.current;
      const videoSrc = selectedVideoUrl;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setError("Failed to load video. Please try again.");
            hls.destroy();
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (e.g., iOS)
        video.src = videoSrc;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      } else {
        setError("HLS is not supported on this browser.");
      }
    }
  }, [isVideoOpen, selectedVideoUrl]);

  const filteredChannels = ChannelList.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#1a1c2e] to-[#2d1f3d] hide-scrollbar">
      <div className="max-w-[1920px] mx-auto px-1.5 md:px-6 lg:px-10">
        {/* Header */}
        <header className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gradient-to-r from-yellow-400 to-red-500 p-1 rounded-lg shadow-lg animate-blink">
                <span className="text-white text-2xl font-extrabold">O</span>
                <img
                  src="https://i.pinimg.com/originals/37/97/d9/3797d93321ab72678a94ff686da5c773.png"
                  alt="Logo Icon"
                  className="w-6 h-6 ml-2"
                />
              </div>
            </div>
            <Link
              to="/"
              className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </Link>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mt-8 px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <Search className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* All Channels Section */}
        <section className="mt-8 pb-8 md:mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-1">
            {filteredChannels.map((channel) => (
              <div
                key={channel.tvgId}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer"
                onClick={() => handleWatchNow(channel.url)}
              >
                <div className="relative aspect-square">
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-full h-full object-contain p-4 bg-black/40"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[7px] font-bold px-2 py-1 rounded-lg">
                    LIVE
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-white truncate">
                    {channel.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

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
                className="w-full h-full"
                autoPlay
                controls
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
