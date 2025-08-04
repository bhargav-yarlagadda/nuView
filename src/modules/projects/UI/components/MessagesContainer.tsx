import { useTRPC } from "@/trpc/tRPC-wrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";
import MessageForm from "./message-form";

const MessagesContainer = ({ projectId }: { projectId: string }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const trpc = useTRPC();

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMessages.queryOptions({
      projectId: projectId,
    })
  );

  // Track last ASSISTANT message (if needed later)
  useEffect(() => {
    const lastMessage = messages.findLast((msg) => msg.role === "ASSISTANT");
    if (lastMessage) {
      // set active fragment logic here
    }
  }, [messages]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Scrollable messages container */}
      <div
        style={{ scrollbarWidth: "none" }}
        className="flex-1 overflow-y-auto min-h-0"
      >
        <div className="pt-2 pr-1">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              role={message.role}
              fragment={message.fragment}
              createdAt={message.createdAt}
              isActiveFragment={false} // TODO: Replace with actual active fragment state
              onFragmentClick={() => {}}
              type={message.type}
            />
          ))}
          

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input form with gradient overlay */}
      <div className="relative p-3 pt-1">
        <div className="absolute -top-6 left-0 w-full h-10 bg-gradient-to-b from-transparent to-background/90 pointer-events-none" />
        <MessageForm projectId={projectId} />
      </div>
    </div>
  );
};

export default MessagesContainer;
