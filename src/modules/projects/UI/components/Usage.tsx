"use client";

import Link from "next/link";
import { CrownIcon } from "lucide-react";
import { formatDuration, intervalToDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/nextjs";

interface Props {
  points: number;
  msBeforeNext: number;
}

export const Usage = ({ points, msBeforeNext }: Props) => {
  const {has} = useAuth()

  // Assume you store subscription info in Clerk's publicMetadata
  const isProUser = has && has({plan:"pro"}) 
  const resetDuration = intervalToDuration({
    start: new Date(),
    end: new Date(Date.now() + msBeforeNext),
  });

  return (
    <div className="rounded-t-lg border bg-background/70 px-3 py-2 text-sm flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
          <CrownIcon className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-300" />
        </div>
        <div>
          <p className="font-medium">{points} credits remaining</p>
          <p className="text-xs text-muted-foreground">
            Resets in{" "}
            {formatDuration(resetDuration, {
              format: ["months", "days", "hours"],
              delimiter: ", ",
            })}
          </p>
        </div>
      </div>

      {/* Right section */}
      {!isProUser && (
        <Button asChild size="sm" className="px-3 rounded-sm">
          <Link href="/pricing">Upgrade</Link>
        </Button>
      )}
    </div>
  );
};
