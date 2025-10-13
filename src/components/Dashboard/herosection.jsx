import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [text1, setText1] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  const fullText1 = "Listen to Anything Anywhere";

  useEffect(() => {
    // Start typing AFTER a brief delay
    const delayBeforeTyping = setTimeout(() => setStartTyping(true), 1000);
    return () => clearTimeout(delayBeforeTyping);
  }, []);

  useEffect(() => {
    if (startTyping) {
      let i = 0;
      const typing1 = setInterval(() => {
        if (i < fullText1.length) {
          setText1(fullText1.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typing1);
        }
      }, 70);
    }
  }, [startTyping]);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 overflow-hidden bg-gradient-to-r from-white via-blue-50 to-blue-100">
      {/* Animations */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>

      {/* LEFT SIDE */}
      <div className="flex-1 max-w-lg space-y-6 transition-all duration-1000 opacity-100 translate-y-0">
        {/* Typing animation FIRST */}
        <h1 className="text-4xl md:text-6xl font-semibold text-blue-800 leading-tight">
          <span className="block">
            {text1}
            {startTyping && text1 !== fullText1 && (
              <span
                className="inline-block align-baseline ml-1 bg-blue-800 animate-[blink_1s_infinite]"
                style={{
                  width: "2px",
                  height: "1.1em",
                  verticalAlign: "middle",
                }}
              />
            )}
          </span>
        </h1>

        {/* Paragraph & Buttons BELOW */}
        <div className="transition-all duration-700 opacity-100 translate-y-0">
          <p className="text-blue-800/80 text-base md:text-lg leading-relaxed mt-4">
            Experience audio like never before. Stream, listen, and enjoy your
            favorite content from anywhere in the world.
          </p>

          <div className="flex gap-4 pt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition">
              Explore More
            </button>
            <button className="border border-blue-300 hover:bg-blue-50 text-blue-700 font-medium px-6 py-3 rounded-xl transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — Floating Images */}
      <div className="flex-1 grid grid-cols-2 gap-8 justify-center items-center mt-12 md:mt-0 relative transition-all duration-1000 opacity-100">
        {/* Top Left */}
        <div className="w-[180px] h-[200px] md:w-[210px] md:h-[230px] rounded-3xl overflow-hidden shadow-xl bg-blue-100 animate-[float1_5s_ease-in-out_infinite]">
          <img
            src="https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/Cel3.jpg"
            alt="Student 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right */}
        <div className="w-[180px] h-[200px] md:w-[210px] md:h-[230px] rounded-3xl overflow-hidden shadow-xl bg-blue-200 mt-10 animate-[float2_6s_ease-in-out_infinite]">
          <img
            src="https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/Cel2.jpg"
            alt="Student 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Center */}
        <div className="absolute bottom-[-50px] left-[90px] md:left-[120px] w-[220px] h-[220px] md:w-[250px] md:h-[250px] rounded-3xl overflow-hidden shadow-xl bg-blue-300 animate-[float3_7s_ease-in-out_infinite]">
          <img
            src="https://athena-user-assets.s3.eu-north-1.amazonaws.com/allAthenaAssets/Cel1.jpg"
            alt="Student 3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
