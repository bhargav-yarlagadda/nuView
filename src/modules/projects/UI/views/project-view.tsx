"use client";

// import { useTRPC } from "@/trpc/tRPC-wrapper";
// import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MessagesContainer from "../components/MessagesContainer";
import { Suspense } from "react";
import Loading from "../components/Loader";
interface Props {
  projectId: string;
}
export const ProjectView = ({ projectId }: Props) => {
  // const trpc = useTRPC();

  // const { data: project } = useSuspenseQuery(
  //   trpc.projects.getOneProject.queryOptions({
  //     id: projectId,
  //   })
  // );
 
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" >
        <ResizablePanel
        defaultSize={35}
        minSize={20}
         className="flex flex-col min-h-0 relative"
        
        >
          
          <Suspense fallback={<Loading/>}>
          <MessagesContainer projectId={projectId}/>
          </Suspense>
          
          </ResizablePanel>
        <ResizableHandle  withHandle/>
        <ResizablePanel
        defaultSize={65}
        minSize={50}
        className="flex flex-col min-h-0"
        >
          
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
