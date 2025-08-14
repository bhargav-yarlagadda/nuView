import { useTRPC } from "@/trpc/tRPC-wrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";
import MessageForm from "./message-form";
import { Fragment } from "@/generated/prisma";
import MessageLoader from "./MessageLoader";

interface messageContainerProps{
  projectId:string
  activeFragment:Fragment | null
  setActiveFragment:(f:Fragment|null)=> void
}

const MessagesContainer = ({ projectId,activeFragment,setActiveFragment }: messageContainerProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  let lastAssistantRef = useRef<string | null>(null);
  const trpc = useTRPC();

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMessages.queryOptions({
      projectId: projectId,
    },{
      refetchInterval:5000, // messages are re fetched after every 5 seconds
    })
  );
   
  
  useEffect(() => {
    const lastAssistantMessage = messages.findLast((message)=> message.role === "ASSISTANT")
     if(lastAssistantMessage?.fragment && lastAssistantMessage.id != lastAssistantRef.current){
      setActiveFragment(lastAssistantMessage.fragment)
      lastAssistantRef.current = lastAssistantMessage.id
     }

    
  }, [messages,setActiveFragment]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const lastMessage = messages[messages.length - 1]
  const isLastMessageFromUser = lastMessage.role === "USER"
  return (
    <div className="flex flex-col flex-1 justify-between min-h-1/2">
      {/* Scrollable messages container */}
      <div
        style={{ scrollbarWidth: "none" }}
        className="flex-1 overflow-y-auto min-h-1/2"
      >
        <div className="pt-2 pr-1">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              role={message.role}
              fragment={message.fragment}
              createdAt={message.createdAt}
              isActiveFragment={activeFragment?.id === message.fragment?.id } // TODO: Replace with actual active fragment state
              onFragmentClick={() => {setActiveFragment(message.fragment)}}
              type={message.type}
            />
          ))}
          
          {
            isLastMessageFromUser && <MessageLoader/>
          }
          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input form with gradient overlay */}
      <div className="relative   p-3 pt-1">
        <div className="absolute -top-6 left-0 w-full h-10 bg-gradient-to-b from-transparent to-background/90 pointer-events-none" />
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
};

export default MessagesContainer;
