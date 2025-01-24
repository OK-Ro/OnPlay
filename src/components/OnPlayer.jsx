import React from "react";

const OnPlay = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to OnPlay
        </h1>
        <p className="text-gray-600 mb-6">
          Experience seamless performance and enjoy the journey with OnPlay.
          This is just the beginning.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default OnPlay;
