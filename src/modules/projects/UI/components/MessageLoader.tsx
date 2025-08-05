import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
const ShimmerMessages = () => {
  const loaderMessages = [
    "Warming up the engines...",
    "Fetching data from the void...",
    "Almost there, hold tight!",
    "Good things take time...",
    "Summoning the magic...",
    "Just a moment, preparing awesomeness...",
    "Optimizing pixels and bits...",
    "Loading… but make it stylish.",
    "Bringing everything together...",
    "Hang tight, we’re almost done!",
    "Cooking something amazing for you...",
    "Aligning the stars...",
    "Brewing some fresh content...",
    "Smoothing out the rough edges...",
    "Counting to infinity… just kidding!",
    "Spinning up some magic dust...",
    "Checking all the boxes...",
    "Syncing with the universe...",
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
             <span className="text-sm font-mono font-medium ">nuView</span>
        </div>
        <div className="pl-8.5 flex flex-col gap-y-4">
            <ShimmerMessages/>
        </div>
    </div>
  )
}

export default MessageLoader

