"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MessagesContainer from "../components/MessagesContainer";
import { Suspense, useState } from "react";
import Loading from "../components/Loader";
import { Fragment } from "@/generated/prisma";
import ProjectHeader from "../components/ProjectHeader";
import FragmentWeb from "../components/FragmentWeb";
import FragmentWebPlaceHolder from "../components/FragmentWebPlaceHolder";
interface Props {
  projectId: string;
}
export const ProjectView = ({ projectId }: Props) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0 relative"
        >
          <Suspense fallback={<Loading />}>
            <ProjectHeader projectId={projectId} />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <MessagesContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={65}
          minSize={50}
          className="flex flex-col min-h-0"
        >
        {
          activeFragment ? <FragmentWeb data={activeFragment } /> :<FragmentWebPlaceHolder/>
        }
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
