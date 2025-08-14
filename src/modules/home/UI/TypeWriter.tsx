"use client"

import { useEffect, useState } from "react";

export default function Typewriter() {
  const text = "Transform Your Ideas Into Stunning Websites.";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + text[index]);
        setIndex(index + 1);
      }, 100); // typing speed
      return () => clearTimeout(timeout);
    }
  }, [index, displayedText, text]);

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className="text-2xl md:text-4xl font-mono bg-white bg-clip-text text-transparent py-8">
        {displayedText}
        <span className="animate-blink text-blue-400">|</span>
      </h1>
      <p className='text-lg md:text-xl text-gray-400 text-center max-w-xl'>
        Bring your vision to life with a website that speaks for your ideas.
      </p>
    </div>
  );
}
