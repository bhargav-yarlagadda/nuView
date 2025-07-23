import { inngest } from "./client";
import {Sandbox} from "@e2b/code-interpreter"
// inngest background jobs 
import {   openai, createAgent } from "@inngest/agent-kit";
import { getSandBox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandBoxId = await step.run("get-sandbox-id",async ()=>{
      const sandBox = await Sandbox.create(process.env.SANDBOX_NAME || "nu-view")
      return sandBox.sandboxId
    })
    const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer , you summarize into words.",
      model: openai({ model: "gpt-4o",  }),
    });
    const {output} =await summarizer.run(`summarize the video : ${event.data.value}`)
    const sandBoxURL = step.run("get-sandbox-url",async ()=>{
      const sandBox  =await getSandBox(sandBoxId)
      const host =  sandBox.getHost(3000)
      return `https://${host}`
    })  
    return {
      output: output  ,
      sandBoxUrl : sandBoxURL
    }
  },
);