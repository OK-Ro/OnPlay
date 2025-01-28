import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0b0f19]">
      <div className="flex space-x-2 mb-4">
        <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
        <div className="w-6 h-6 bg-yellow-400 rounded-full animate-bounce delay-400"></div>
      </div>
      <div className="loader"></div>
      <p className="mt-4 text-white text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;
