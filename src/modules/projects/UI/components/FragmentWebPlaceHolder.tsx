import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const FragmentWebPlaceHolder = () => {
  return (
    <Card className="w-full h-full flex flex-col items-center justify-center p-8 bg-background/50 border-dashed">
      <Image
        src="/window.svg"
        alt="No active fragment"
        width={120}
        height={120}
        className="opacity-50 mb-6"
      />
      <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
        No Active Fragment
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        Select a fragment from the sidebar to view and edit its content. Start
        building by creating new fragments or manage existing ones from the
        project settings.
      </p>
    </Card>
  );
};

export default FragmentWebPlaceHolder;
