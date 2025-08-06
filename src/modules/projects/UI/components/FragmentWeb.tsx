import React, { useState, memo } from "react";
import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import {  ExternalLink, RefreshCcwIcon } from "lucide-react";
import { toast } from "sonner";
import Hint from "./Hint";

interface FragmentWebProps {
  data: Fragment;
}

const FragmentWeb = memo(({ data }: FragmentWebProps) => {
  const { id, sandboxUrl, files, title } = data;
  const [loading, setLoading] = useState(true);
  const [fragmentKey, setFragmentKey] = useState(0);
  const [isRefreshed, setIsRefreshed] = useState(false);
  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
    setIsRefreshed(true);
    setTimeout(() => {
      setIsRefreshed(false);
    }, 2000);
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(sandboxUrl);
    toast.success("URL copied to clipboard!", {
      duration: 1000,
    });
  };
const openInExternalTab = async () => {
  if (!sandboxUrl) return
  window.open(sandboxUrl, "_blank", "noopener,noreferrer")
}

  return (
    <div className="flex flex-col w-full h-full relative">
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30 backdrop-blur-sm z-10">
          <span className="text-sm animate-pulse font-medium">
            Loading preview...
          </span>
        </div>
      )}
      <div className="flex p-2 items-center border-b bg-sidebar gap-x-2">
        <Hint text="Refresh the page">
          <Button
            className="cursor-pointer"
            size="sm"
            variant="outline"
            onClick={onRefresh}
          >
            <div className={`${isRefreshed ? "animate-spin-reverse" : ""} `}>
              <RefreshCcwIcon />
            </div>
          </Button>
        </Hint>
        <Hint text="Copy link">
                  <Button
          size="sm"
          className="flex-1 px-2 justify-between text-start font-normal"
          variant="outline"
          onClick={handleCopy}
          disabled={!sandboxUrl}
        >
          <span className="truncate">{sandboxUrl}</span>
        </Button>
        </Hint>
        <Hint side="bottom" text="Open link in a new tab">
          <Button
            size="sm"
            className=" px-2 justify-between text-start font-normal"
            variant="outline"
            disabled={!sandboxUrl}
          >
            <span
              onClick={openInExternalTab}
              className="p-1 rounded-sm cursor-pointer "
            >
              <ExternalLink />
            </span>
          </Button>
        </Hint>
      </div>
      {/* Iframe */}
      <iframe
        key={fragmentKey} // ensures re-render on data change
        src={sandboxUrl}
        title={title || `fragment-${id}`}
        className="w-full h-full  border"
        sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
});

FragmentWeb.displayName = "FragmentWeb";

export default FragmentWeb;
