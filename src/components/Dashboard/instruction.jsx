import { useState } from "react";

export default function InstructionCarousel() {
  const [current, setCurrent] = useState(0);

  const instructions = [
    {
      title: "Upload Material",
      desc: "Upload your course content as PDF, DOCX, or text to get started.",
      color: "from-cyan-400 to-blue-500",
      step: 1,
    },
    {
      title: "Customize Voice",
      desc: "Pick a voice avatar, record your own, or upload a voice sample.",
      color: "from-blue-500 to-indigo-500",
      step: 2,
    },
    {
      title: "Generate Audio",
      desc: "Convert your text into natural-sounding speech instantly.",
      color: "from-indigo-500 to-purple-500",
      step: 3,
    },
    {
      title: "Download & Share",
      desc: "Download the generated MP3 and share your audio lessons.",
      color: "from-purple-500 to-pink-500",
      step: 4,
    },
  ];

  return (
    <section className="relative w-full py-20 px-6 bg-gradient-to-r from-indigo-100 via-white to-green-100 overflow-hidden">
      <h3 className="text-center text-gray-700 text-3xl font-thin mb-10">
        How It Works
      </h3>

      {/* Carousel Container */}
      <div className="relative overflow-hidden max-w-3xl mx-auto">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {instructions.map((item, i) => (
            <div key={i} className="min-w-full flex-shrink-0 px-4">
              <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 p-6 shadow-md text-center max-w-md mx-auto">
                <div
                  className={`mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-white font-semibold`}
                >
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="mt-6 flex justify-center space-x-2">
        {instructions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              current === i ? "bg-indigo-500 w-4" : "bg-gray-400/50"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
