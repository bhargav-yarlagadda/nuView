"use client";

import { useEffect, useState } from "react";

export default function Typewriter() {
  const text = "Transform Your Ideas Into Stunning Websites.";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100); // typing speed
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-mono bg-clip-text text-transparent py-8 
        bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300">
        {displayedText}
        <span className="animate-blink text-blue-500">|</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 text-center max-w-xl">
        Bring your vision to life with a website that speaks for your ideas.
      </p>
    </div>
  );
}
