import { inngest } from "./client";
// inngest background jobs 
import { Agent,  openai, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer , you summarize into words.",
      model: openai({ model: "gpt-4o",  }),
    });
    const {output} =await summarizer.run(`summarize the video : ${event.data.value}`)
    return {
      output: output  
    }
  },
);