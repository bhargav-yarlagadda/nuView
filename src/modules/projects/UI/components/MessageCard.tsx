import { Card } from "@/components/ui/card";
import { Fragment, MessageRole, MessageType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronRight, ChevronRightIcon, Code2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
interface messageProps {
  content: string;
  role: MessageRole;
  type: MessageType;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
}
interface UserMessageProps {
  content: string;
}
const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex justify-end  pb-4 pr-2 pl-10">
      <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">
        {content}
      </Card>
    </div>
  );
};

interface assistantMessagePops {
  content: string;
  type: MessageType;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
}

const AssisitantMessage = ({
  content,

  type,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
}: assistantMessagePops) => {
  return (
    <div
      className={cn(
        "flex flex-col group px-2 pb-4",
        type === "ERROR" && "text-red-700 dark:text-red-500"
      )}
    >
      <div className="flex items-center  gap-2 pl-2 ">
        {/* TODO: add logo */}
        <div className="flex gap-2 items-center">
            <Image src="/logo.png" alt="" height={40} width={40}  className="rounded-full" />
            <span className="text-sm font-medium">nuView</span>
        </div>
       
        <span className="text-xs font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            {format(createdAt,"HH:MM 'on' MMM dd,yyyy")} 
        </span>
      </div>
      
      <div className="pl-4 flex flex-col gap-y-4">
        <span>        {
            content.replace("<task_summary>","").replace("</task_summary>","")
        }</span>
        {
            fragment && type == "RESULT" && <FragmentCard fragment={fragment} isActiveFragment={isActiveFragment} onFragmentClick={onFragmentClick} ></FragmentCard> 
        }
      </div>
    </div>
  );
};

interface FragmentCardProps{
    fragment:Fragment 
    isActiveFragment:boolean 
    onFragmentClick:(f:Fragment)=>void
}
const FragmentCard = ({fragment,isActiveFragment,onFragmentClick}:FragmentCardProps)=>{
  return (
    <button onClick={()=>{
      onFragmentClick(fragment)
    }} className={cn("flex cursor-pointer items-center text-start gap-2 rounded-lg bg-muted w-fit p-2 hover:bg-secondary transition-colors",isActiveFragment &&"bg-primary text-primary-foreground border-primary hover:bg-primary")}>
    <Code2Icon className="size-4 mt-0.5"/>
    <div className="flex flex-col flex-1">
      <span className="text-sm font-medium line-clamp-1 ">{fragment.title}</span>
      <span className="text-xs">Preview </span>
    </div>
    <div className=" flex justify-center items-center">
      <ChevronRightIcon className="size-4"/>
    </div>
    </button>
  )
}
const MessageCard = ({
  content,
  role,
  type,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
}: messageProps) => {
  if (role == "ASSISTANT") {
    return <AssisitantMessage type={type} content={content} fragment={fragment} createdAt={createdAt} isActiveFragment={isActiveFragment} onFragmentClick={onFragmentClick} />;
  }
  return <UserMessage content={content} />;
};

export default MessageCard;
