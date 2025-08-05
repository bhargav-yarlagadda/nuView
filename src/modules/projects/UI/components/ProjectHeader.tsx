import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  EditIcon,
  SunMoonIcon,
} from "lucide-react";
import { useTRPC } from "@/trpc/tRPC-wrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";

const ProjectHeader = ({ projectId }: { projectId: string }) => {
  const trpc = useTRPC();
  const { theme, setTheme } = useTheme();
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOneProject.queryOptions({ id: projectId })
  );

  return (
    <header className="px-4 py-3 flex items-center justify-between border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto px-2 hover:bg-secondary/80 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/new-view.svg"
                  alt="new view"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium">
                {project.name || "Your Project"}
              </span>
              <ChevronDownIcon size={16} className="text-muted-foreground" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{project.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                Project Settings
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center">
              <ChevronLeftIcon size={16} className="mr-2" />
              Back to Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EditIcon size={16} className="mr-2" />
            Rename Project
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoonIcon size={16} className="mr-2" />
              Appearance
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
                <DropdownMenuRadioItem value="light">
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                    Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <EditIcon size={16} className="mr-2" />
            Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default ProjectHeader;
