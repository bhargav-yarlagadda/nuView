import { CopyCheckIcon, CopyIcon, FileIcon } from "lucide-react";
import React from "react";
import { useState, useCallback, useMemo, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { FileTextIcon } from "lucide-react";


import CodePanel from "./CodePanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import FileTree from "./FileTree";

type FileCollection = {
  [path: string]: string;
};

function getLanguageFromExtenstion(filename: string): string {
  const fileType = filename.split(".").pop()?.toLowerCase();
  return fileType || "text";
}
interface FileExplorerProps {
  files: FileCollection;
}

const FileExplorer = ({ files }: FileExplorerProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const fileKeys = Object.keys(files);
    return fileKeys.length > 0 ? fileKeys[0] : null;
  });
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={20}
        minSize={15}
        maxSize={35}
        className="bg-sidebar "
      >
        <FileTree
        files={files as {[path:string]:string}}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        />
      </ResizablePanel>
      <ResizableHandle className="hover:bg-primary transition-colors" />

<ResizablePanel defaultSize={80} minSize={65} maxSize={85}>
  {selectedFile && files[selectedFile] ? (
    <div className="flex flex-col h-full border-l">
      {/* Header */}
      <div className="flex items-center justify-between bg-muted px-3 py-2 border-b">
        <div className="flex flex-col">
          <span className="font-mono font-semibold text-sm">
            {selectedFile.split("/").pop()}
          </span>
          <span className="text-xs text-muted-foreground truncate max-w-[250px]">
            {selectedFile}
          </span>
        </div>

        {/* Copy filename button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  navigator.clipboard.writeText(selectedFile);
                  toast.success("File path copied!");
                }}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy File Path</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Code panel */}
      <div className="flex-1 overflow-auto ">
        <CodePanel
          lang={getLanguageFromExtenstion(selectedFile)}
          code={files[selectedFile]}
        />
      </div>
    </div>
  ) : (
    <div className="flex h-full flex-col items-center justify-center text-muted-foreground gap-2">
      <FileIcon className="h-6 w-6 opacity-50" />
      <span className="text-sm">Select a file to view its contents</span>
    </div>
  )}
</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default FileExplorer;
