import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";

type FileCollection = {
  [path: string]: string;
};

interface FileTreeProps {
  files: FileCollection;
  selectedFile: string | null;
  setSelectedFile: (fileName: string) => void;
}

// Helper type for nested structure
interface TreeNode {
  name: string;
  path: string;
  children?: TreeNode[];
}

const FileTree = ({ files, selectedFile, setSelectedFile }: FileTreeProps) => {
  // Convert flat object to nested tree
  const buildTree = (): TreeNode[] => {
    const root: TreeNode[] = [];

    Object.keys(files).forEach((filePath) => {
      const parts = filePath.split("/");
      let currentLevel = root;
      let currentPath = "";

      parts.forEach((part, index) => {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        let existingNode = currentLevel.find((node) => node.name === part);

        if (!existingNode) {
          existingNode = {
            name: part,
            path: currentPath,
            children: index < parts.length - 1 ? [] : undefined,
          };
          currentLevel.push(existingNode);
        }

        if (existingNode.children) {
          currentLevel = existingNode.children;
        }
      });
    });

    return root;
  };

  const tree = buildTree();

  const { theme } = useTheme();

  return (
    <div className="w-full h-full border-r border-border bg-background">
      <ScrollArea className="h-full">
        <div className="p-2">
          {tree.map((node) => (
            <TreeNodeComponent
              key={node.path}
              node={node}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FileTree;

interface TreeNodeComponentProps {
  node: TreeNode;
  selectedFile: string | null;
  setSelectedFile: (fileName: string) => void;
}

const TreeNodeComponent = ({
  node,
  selectedFile,
  setSelectedFile,
}: TreeNodeComponentProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const isFolder = !!node.children;
  const isSelected = selectedFile === node.path;

  const handleClick = () => {
    if (isFolder) {
      setIsOpen((prev) => !prev);
    } else {
      setSelectedFile(node.path);
    }
  };

  return (
    <div>
    <Button
        variant="ghost"
        size="sm"
        className={cn(
          "w-full justify-start gap-2 rounded-none px-2 hover:bg-accent",
          isSelected && "bg-accent"
        )}
        onClick={handleClick}
      >
        {isFolder ? (
          isOpen ? (
            <FolderOpen className="h-4 w-4 shrink-0" />
          ) : (
            <Folder className="h-4 w-4 shrink-0" />
          )
        ) : (
          <File className="h-4 w-4 shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
        {isFolder && (
          <span className="ml-auto">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
      </Button>

      {isFolder && isOpen && node.children && (
        <ul className="ml-3 border-l border-border/30 pl-1">
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.path}
              node={child}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
