import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
const ShimmerMessages = () => {
const loaderMessages = [
  "Warming up the engines...",
  "Poking the servers to wake them up...",
  "Sharpening the code knives...",
  "Fetching data from the void...",
  "Untangling some digital spaghetti...",
  "Summoning the magic...",
  "Brewing some fresh content...",
  "Charging creativity batteries...",
  "Optimizing pixels and bits...",
  "Painting the pixels perfectly...",
  "Sneaking in some extra awesomeness...",
  "Cooking something amazing for you...",
  "Aligning the stars...",
  "Calibrating your experience...",
  "Spinning up some magic dust...",
  "Syncing with the universe...",
  "Counting to infinity… just kidding!",
  "Smoothing out the rough edges...",
  "Making sure the ducks are in a row...",
  "Wrestling with stubborn bytes...",
  "Polishing every last detail...",
  "Squeezing out some extra performance...",
  "Bringing everything together...",
  "Checking all the boxes...",
  "Loading… but make it stylish.",
  "Charging cosmic hamsters in the server wheel...",
  "Good things take time...",
  "Almost there, hold tight!",
  "Almost ready, don’t blink!",
  "Finalizing the finalization...",
];

  const [currentMessageIndex,setCurrentMessageIndex] = useState(0)
  useEffect(()=>{
    const interval = setInterval(()=>{
        setCurrentMessageIndex((prev)=>(prev+1)% loaderMessages.length)
    },5000)


    return ()=> clearInterval(interval)
  },[loaderMessages.length])
  return(
         <div className="flex items-center gap-2 ">
            <span className="text-base text-muted-foreground animate-pulse">
                {
                    loaderMessages[currentMessageIndex]
                }
            </span>
         </div>
  );
};


const MessageLoader = () => {
  return (
    <div className="flex  flex-col group px-2 pb-4">
        <div className="flex items-center gap-2 pl-2 mb-2">
             <Image src="/new-view.svg" alt="Nu-view "
             width={40}
             height={40}
             className="shrink-0  rounded-full">

             </Image>
             <span className="text-sm font-mono font-medium ">Lumina</span>
        </div>
        <div className="pl-8.5 flex flex-col gap-y-4">
            <ShimmerMessages/>
        </div>
    </div>
  )
}

export default MessageLoader

