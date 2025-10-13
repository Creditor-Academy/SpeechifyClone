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
          Experience audio like never before. 
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

      {/* Right Animated Images Section */}
      <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 relative z-10">
        {/* Image 1 (Large Floating) */}
        <img
          src="https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/Cel3.jpg"
          alt="AI Companion 1"
          className="w-48 md:w-56 rounded-2xl shadow-lg animate-float-slow mr-6"
        />

        {/* Image 2 (Middle Floating) */}
        <img
          src="https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/Cel2.jpg"
          alt="AI Companion 2"
          className="w-40 md:w-48 rounded-2xl shadow-md animate-float-slower"
        />

        {/* Image 3 (Small Floating) */}
        <img
          src="https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/Cel1.jpg"
          alt="AI Companion 3"
          className="w-32 md:w-40 rounded-2xl shadow-md absolute bottom-0 right-0 animate-float-slowest"
        />
      </div>

      {/* Floating Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slowest {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 6s ease-in-out infinite;
        }
        .animate-float-slowest {
          animation: float-slowest 7s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
