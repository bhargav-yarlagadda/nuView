"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import z from "zod";
import { toast } from "sonner";
import TextareaAutoSize from "react-textarea-autosize";
import { ArrowRight, ArrowUp, Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/tRPC-wrapper";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required." })
    .max(1500, { message: "Message too long to process" }),
});
const predefinedPrompts = [
  
  "Create an Animated Hero Section",
  "Design a Dark Mode Toggle",
  "Build a Draggable Kanban board",
  "Build a Modal Popup Component",
  "Implement a Loading Spinner",
  "Design a Sticky Footer",
];

const ProjectForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: "" },
  });

  const queryClient = useQueryClient();
  const message = form.watch("value");
  const [isFocused, setIsFocused] = useState(false);
  const [showUsage, setShowUsage] = useState(false);
  const clerk = useClerk()
  const trpc = useTRPC();
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        form.reset();
        queryClient.invalidateQueries(
          trpc.usage.status.queryOptions()
        );
        queryClient.invalidateQueries(trpc.projects.getProjects.queryOptions());
        router.push(`/project/${data.id}`);

      },
      onError: (error: any) => {
        toast.error(error.message);
        if(error.data?.code  === "UNAUTHORIZED"){
          clerk.openSignIn()
        }
         if(error.data?.code === "TOO_MANY_REQUESTS"){
          router.push("/pricing")
        }
      },
    })
  );

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const msg = values.value.trim();
    if (msg === "") return;
    await createProject.mutateAsync({ value: msg });
  };

  const isPending = createProject.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;

  // Insert chip text at the end of textarea
  const insertChip = (chip: string) => {
    form.setValue("value", chip, { shouldValidate: true });
  };

  return (
    <div>

      <Form {...form}>
        <form
          className={cn(
            "relative border flex-col flex items-end p-3 mb-3 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
            isFocused && "shadow-xs",
            showUsage && "rounded-t-none"
          )}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <TextareaAutoSize
                {...field}
                disabled={isPending}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={1}
                className="w-full focus:outline-none placeholder:text-muted-foreground text-sm resize-none"
                placeholder="Send a message..."
                maxRows={10}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    form.handleSubmit(handleSubmit)(e);
                  }
                }}
              />
            )}
          />
          <div className="flex items-center justify-between gap-3 pt-3 w-full">
            {/* Keyboard Shortcut Hint */}
            <div
              className={cn(
                "flex items-center gap-1 font-mono text-[12px] rounded-md px-2 py-1.5 transition-all duration-200 ease-in-out backdrop-blur-sm border",
                message.trim() === ""
                  ? "opacity-50 pointer-events-none border-transparent text-muted-foreground/60"
                  : "cursor-pointer border-border/40 hover:border-border hover:text-foreground/80"
              )}
            >
              <kbd className="bg-secondary/40 dark:bg-secondary/20 px-1.5 py-0.5 rounded shadow-sm">
                CTRL + Enter
              </kbd>
              <ArrowRight size={14} />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isButtonDisabled}
              className={cn(
                "flex items-center justify-center p-2 rounded-lg transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                message.trim() === ""
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:scale-105 hover:opacity-90 active:scale-95"
              )}
            >
              {isPending ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex flex-wrap justify-center   gap-2  mb-3">
  {predefinedPrompts.map((chip) => (
    <button
      key={chip}
      type="button"
      onClick={() => insertChip(chip)}
      className="
        px-4 py-1 cursor-pointer rounded-md
        bg-yellow-400 text-gray-900  shadow-sm
         transition-all duration-200 ease-in-out font-mono text-sm
        dark:bg-gray-800 dark:text-gray-100  font-light
      "
    >
      {chip}
    </button>
  ))}
</div>
    </div>
  );
};

export default ProjectForm;
