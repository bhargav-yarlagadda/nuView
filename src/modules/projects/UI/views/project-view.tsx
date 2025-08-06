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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectHeader from "../components/ProjectHeader";
import FragmentWeb from "../components/FragmentWeb";
import FragmentWebPlaceHolder from "../components/FragmentWebPlaceHolder";
import { EyeIcon, CodeIcon } from "lucide-react";
import FileExplorer from "../components/code/FileExplorer";
interface Props {
  projectId: string;
}
export const ProjectView = ({ projectId }: Props) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"Preview" | "Code">("Preview");
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
          <Tabs
            className="h-full flex w-full flex-col"
            defaultValue="Preview"
            value={tabState}
            onValueChange={(value) => setTabState(value as "Preview" | "Code")}
          >
            <TabsList className="w-fit justify-start p-1 ms-1 mt-1  h-auto">
              <TabsTrigger value="Preview" className="gap-2">
                <EyeIcon className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="Code" className="gap-2">
                <CodeIcon className="h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Preview" className="flex-1 p-0 m-0">
              {activeFragment ? (
                <FragmentWeb data={activeFragment} />
              ) : (
                <FragmentWebPlaceHolder />
              )}
            </TabsContent>

            <TabsContent value="Code" className="flex-1 p-0 min-h-0 m-0">
              {activeFragment?.files ? (
                <div className="h-full ">
                  <FileExplorer
                    files={activeFragment.files as { [path: string]: string }}
                  />
                </div>
              ) : (
                <FragmentWebPlaceHolder />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
