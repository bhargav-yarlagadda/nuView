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
import { EyeIcon, CodeIcon, Crown } from "lucide-react";
import FileExplorer from "../components/code/FileExplorer";
import CustomUserButton from "@/modules/home/UI/CustomUserButton";
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
            <div className="w-full flex items-center justify-between px-2">
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
              <div className="h-8 flex items-center gap-1">
                {/* Upgrade Button */}
                <button
                  className="
          flex items-center gap-2
          px-3 py-1.5
          rounded-md
          text-sm font-medium
          bg-gradient-to-r
          from-yellow-200 to-yellow-400
          dark:from-yellow-500 dark:to-yellow-600
          text-gray-900 dark:text-gray-100
          shadow-sm
          hover:from-yellow-300 hover:to-yellow-500
          dark:hover:from-yellow-600 dark:hover:to-yellow-700
          active:scale-95
          transition-all duration-200
    "
                >
                  <Crown
                    className="text-yellow-700 dark:text-yellow-300"
                    height={18}
                    width={18}
                  />
                  <span className="hidden sm:inline">Upgrade</span>
                </button>

                {/* User Button */}
                <div className="mt-1">
                  <CustomUserButton />
                </div>
              </div>
            </div>

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
