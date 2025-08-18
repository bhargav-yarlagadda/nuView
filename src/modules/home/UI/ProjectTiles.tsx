"use client";

import Link from "next/link";
import { useTRPC } from "@/trpc/tRPC-wrapper";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";

const ProjectTiles = () => {
  const trpc = useTRPC();
  const { isSignedIn } = useUser();

  const { data, isPending, error } = useQuery({
    ...trpc.projects.getProjects.queryOptions(),
    enabled: isSignedIn,
  });

  if (!isSignedIn) return <div className="text-center text-muted-foreground text-sm py-4">
    Sign in to see your previous   projects
  </div>

  if (error && (error as any)?.data?.code === "UNAUTHORIZED") {
    return null;
  }

  if (isPending) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <span
            key={idx}
            className="h-6 w-28 rounded-md border bg-muted/30 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const projects = data ?? [];

  if (projects.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        No projects yet. Create your first project using Lumina.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {projects.map((project) => {
        const updatedAgo = formatDistanceToNow(new Date(project.updatedAt), {
          addSuffix: true,
        });
        return (
          <Badge key={project.id} asChild variant="secondary"className="hover:bg-muted/50 hover:cursor-pointer hover:scale-[1.02] transition-all duration-300">
            <Link href={`/project/${project.id}`} className="no-underline ">
              <span className="p-1 text-lg ">   {project.name || "Untitled Project"}</span>
              <span className="text-muted-foreground text-xs mt-5 ml-2">  updated {updatedAgo}</span>
            </Link>
          </Badge>
        );
      })}
    </div>
  );
};

export default ProjectTiles;


