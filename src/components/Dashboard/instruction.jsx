import React, { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";

export default function Instruction() {
  const [page, setPage] = useState(0);
  const [inputText, setInputText] = useState("");

  const pages = [
    {
      title: "Think & Write",
      text: "Note down your thoughts, stories, or ideas just like writing in your personal notebook.",
      speak: "Think and write your creative ideas freely.",
    },
    {
      title: "Listen & Learn",
      text: "Click the speaker below to hear your content — perfect for learning on the go.",
      speak: "Listen to your notes come alive through speech.",
    },
  ];

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % pages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Speak Function
  const speakText = (text) => {
    if (!text.trim()) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <section className="flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-50 to-sky-100 py-20 px-6 md:px-16">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold text-sky-800 mb-8 text-center">
        Make Your Pronunciation Better With Us
      </h2>

      {/* User Input & Speaker */}
      <div className="mb-12 w-full max-w-2xl bg-white border border-sky-200 rounded-2xl shadow-md flex items-center gap-3 px-5 py-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type something to hear it..."
          className="flex-1 outline-none text-sky-800 placeholder-sky-400 text-lg bg-transparent"
        />
        <button
          onClick={() => speakText(inputText)}
          className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full shadow-md transition-transform hover:scale-110"
        >
          <Volume2 size={22} />
        </button>
      </div>

      {/* Notebook Container — smaller for better proportion */}
      <div className="relative w-[85%] max-w-4xl h-36 md:h-64 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Sliding Pages */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((note, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 flex flex-col justify-center items-center text-center px-10 md:px-16"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-sky-700 mb-3">
                {note.title}
              </h3>
              <p className="text-sky-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                {note.text}
              </p>
            </div>
          ))}
        </div>

        {/* Notebook Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="border-b border-sky-100 opacity-50"
              style={{ top: `${(i + 1) * 10}%` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      <div className="flex mt-8 gap-3">
        {pages.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              page === idx ? "bg-sky-500 scale-110" : "bg-sky-200"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
