import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-gradient-to-r from-indigo-100 via-white to-green-100 animate-gradient">
      
      {/* Background Glow Circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl animate-glow"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-300/30 rounded-full blur-3xl animate-glow"></div>

      {/* Left Text Section */}
      <div className="flex-1 max-w-lg space-y-6 z-10">
        <h1 className="text-4xl md:text-6xl font-normal text-gray-900 leading-tight">
          Listen to Anything{" "}
          <span className="text-green-600">Anywhere</span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Experience audio like never before with our AI-powered robot companions. 
          Stream, listen, and enjoy your favorite content from anywhere in the world.
        </p>

        <div className="flex gap-4 pt-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition">
            Start Listening
          </button>
          <button className="border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium px-6 py-3 rounded-lg transition">
            Explore
          </button>
        </div>
      </div>

      {/* Right Robot Animation Section */}
      <div className="flex-1 flex justify-center mt-10 md:mt-0 relative z-10">

        {/* Big Robot (Left) */}
        <div className="relative animate-bounce-slow mr-10">
          <div className="bg-indigo-500 w-40 h-40 rounded-xl flex flex-col items-center justify-center relative shadow-glow">
            <div className="bg-indigo-700 w-8 h-8 rounded-full absolute top-4 left-4" />
            <div className="bg-indigo-700 w-8 h-8 rounded-full absolute top-4 right-4" />
            <div className="bg-indigo-300 w-6 h-6 rounded-full absolute bottom-10" />
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            <div className="bg-indigo-500 w-6 h-10 rounded-md" />
            <div className="bg-indigo-500 w-6 h-10 rounded-md" />
          </div>
        </div>

        {/* Middle Robot (New) */}
        <div className="relative animate-float-slow">
          <div className="bg-pink-400 w-24 h-24 rounded-xl flex flex-col items-center justify-center relative shadow-glow">
            <div className="bg-pink-600 w-5 h-5 rounded-full absolute top-3 left-3" />
            <div className="bg-pink-600 w-5 h-5 rounded-full absolute top-3 right-3" />
            <div className="bg-pink-300 w-3 h-3 rounded-full absolute bottom-4" />
          </div>
        </div>

        {/* Small Robot (Right) */}
        <div className="absolute bottom-0 right-0 animate-float-slow">
          <div className="bg-teal-400 w-16 h-16 rounded-xl flex items-center justify-center relative shadow-glow">
            <div className="bg-teal-600 w-3 h-3 rounded-full absolute top-2 left-2" />
            <div className="bg-teal-600 w-3 h-3 rounded-full absolute top-2 right-2" />
            <div className="bg-teal-300 w-2 h-2 rounded-full absolute bottom-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
