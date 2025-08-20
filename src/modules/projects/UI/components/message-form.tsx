import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import z from "zod";
import { toast } from "sonner";
import TextareaAutoSize from "react-textarea-autosize";
import { ArrowRight, ArrowUp, Loader2Icon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/tRPC-wrapper";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Usage } from "./Usage";
interface Props {
  projectId: string;
}
const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required." })
    .max(1500, { message: "message too long to proccess" }),
});
const MessageForm = ({ projectId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const queryClient = useQueryClient();
  const message = form.watch("value");
  const [isFocused, setisFocused] = useState(false);
  const trpc = useTRPC();
  const { data: usage } = useQuery(trpc.usage.status.queryOptions());
  const showUsage = !!usage;
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        // invalidate previous messages since ne messages are added
        queryClient.invalidateQueries(
          trpc.messages.getMessages.queryOptions({ projectId: projectId })
        );
      },
      onError: (error) => {
        // redirect to pricing page
        toast.error(error.message);
      },
    })
  );

  const handleSumbit = async (values: z.infer<typeof formSchema>) => {
    const message = values.value.trim();
    if (message === "") {
      return;
    }
    await createMessage.mutateAsync({ value: message, projectId: projectId });
  };

  const isPending = createMessage.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;
  return (
    <Form {...form}>
      {
        console.log(usage)
      }
      {showUsage && (
        <Usage
          points={usage.remainingPoints}
          msBeforeNext={usage.msBeforeNext}
        />
      )}
      <form
        className={cn(
          "relative border flex-col flex items-end p-3 mb-3  rounded-xl bg-sidebar dark:bg-sidebar transition-all",
          isFocused && "shadow-xs",
          showUsage && "rounded-t-none"
        )}
        onSubmit={form.handleSubmit(handleSumbit)}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <TextareaAutoSize
              {...field}
              disabled={isPending} // text area is disabled only if the network request is pending
              onFocus={() => setisFocused(true)}
              onBlur={() => setisFocused(false)}
              minRows={1}
              className="w-full  focus:outline-none placeholder:text-muted-foreground text-sm resize-none"
              placeholder="Send a message..."
              maxRows={10}
              onKeyDown={(e) => {
                if (e.key == "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  form.handleSubmit(handleSumbit)(e);
                }
              }}
            />
          )}
        />
        <div className="flex items-center justify-between gap-3 pt-3 w-full">
          {/* Keyboard Shortcut Hint */}
          <div
            className={cn(
              "flex items-center gap-1 font-mono text-[12px] rounded-md px-2 py-1.5",
              "transition-all duration-200 ease-in-out backdrop-blur-sm border",
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
  );
};
export default MessageForm;
