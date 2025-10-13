import { useState } from "react";

export default function InstructionCarousel() {
  const [current, setCurrent] = useState(0);

  const instructions = [
    {
      title: "Upload Material",
      desc: "Upload your course content as PDF, DOCX, or text to get started.",
      color: "from-blue-400 to-indigo-500",
      step: 1,
    },
    {
      title: "Customize Voice",
      desc: "Pick a voice avatar, record your own, or upload a voice sample.",
      color: "from-indigo-500 to-blue-600",
      step: 2,
    },
    {
      title: "Generate Audio",
      desc: "Convert your text into natural-sounding speech instantly.",
      color: "from-blue-600 to-cyan-500",
      step: 3,
    },
    {
      title: "Download & Share",
      desc: "Download the generated MP3 and share your audio lessons.",
      color: "from-cyan-500 to-blue-500",
      step: 4,
    },
  ];

  return (
    <section className="relative w-full py-20 px-6 bg-gradient-to-r from-white via-blue-50 to-blue-100 overflow-hidden">
      {/* Title */}
      <h3 className="text-center text-blue-900 text-3xl font-semibold mb-10">
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
              <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-blue-200 p-8 shadow-lg text-center max-w-md mx-auto transition-all duration-700 hover:shadow-xl">
                <div
                  className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${item.color} text-white font-semibold text-lg shadow-md`}
                >
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold text-blue-800">
                  {item.title}
                </h4>
                <p className="mt-3 text-base text-blue-700/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="mt-8 flex justify-center space-x-2">
        {instructions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              current === i ? "bg-blue-600 w-4" : "bg-blue-300/50"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
