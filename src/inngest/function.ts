import { inngest } from "./client";
import {Sandbox} from "@e2b/code-interpreter"
// inngest background jobs 
import {   openai, createAgent, createTool, AnyZodType, createNetwork } from "@inngest/agent-kit";
import { getSandBox, lastAssistantTextMessageContent } from "./utils";
import {z} from "zod";
import { PROMPT } from "./prompts";
import prisma from "@/lib/prisma";



export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandBoxId = await step.run("get-sandbox-id",async ()=>{
      const sandBox = await Sandbox.create(process.env.SANDBOX_NAME || "nu-view")
      return sandBox.sandboxId
    })
    const codeAgent = createAgent({
      name: "code-agent",
      description:"You are an expert coding agent",
      system:PROMPT,
      model: openai({ model: "gpt-4o",
        
        defaultParameters:{
          temperature:0.1,
          
        }
        }),
      tools:[
          createTool({
            name:"terminal",
            description:"Use the terminal to run the commands",
            parameters: z.object({
              command: z.string(),
            }),
            handler:async ({command},{step})=>{
              return await step?.run("terminal",async ()=>{
                const buffers = {
                  stdout:"",
                  stderr:"",
                }
                try {
                  const sandBox = await getSandBox(sandBoxId)
                  const result = await sandBox.commands.run(command,{
                    onStdout:(data:string)=>{
                      buffers.stdout = data
                    },
                    onStderr:(data:string)=>{
                      buffers.stdout = data
                    }
                  })
                  return result.stdout
                } catch (error:any) {
                  console.error(`Command failed :${error} \n stdout: ${buffers.stdout} \n  stderr: ${buffers.stderr} `)
                  return `Command failed :${error} \n stdout: ${buffers.stdout} \n  stderr: ${buffers.stderr} `
                }
              })
            },
          }),
        createTool({
          name:"createOrUpdateFiles",
          description:"create or update files in Sandbox",
          parameters:z.object({
            files: z.array(
              z.object({
                path:z.string(),
                content:z.string(),
              })
            )
          }),
          handler:async ({files},{step,network})=>{
            const newFiles  = await step?.run("createOrUpdateFile",async ()=>{
                try {
                  const updatedFiles = network.state.data.files || {}
                const sandBox  = await getSandBox(sandBoxId)
                for (const file of files) {
                  await sandBox.files.write(file.path,file.content)
                    updatedFiles[file.path]= file.content
                }
                return updatedFiles
                } catch (error) {
                  return `Error: ${error}`
                }
            })
            if(typeof newFiles === "object"){
              network.state.data.files = newFiles
            }
          }

        }),
        createTool({
          name:"readFiles",
          description:"Read files from sandbox",
          parameters: z.object({
            files: z.array(z.string())
          })  ,
          handler:async ({files},{step})=>{
            return await step?.run("readFiles",async ()=>{
              try {
                const sandBox = await getSandBox(sandBoxId)
                const contents:{
                  path:string,
                  content:string
                }[]= []
                
                for(const file of files){
                  const content = await sandBox.files.read(file)
                  contents.push({path:file,content})
                }
                return JSON.stringify(contents)
              } catch (error) {
                return `Error: ${error}`
              }
            })
          }

        })
        
      ],
      lifecycle:{
        onResponse:async ({result,network})=>{
          const lastAssistantMessageText = lastAssistantTextMessageContent(result)
          if(lastAssistantMessageText && network){
            if(lastAssistantMessageText.includes("<task_summary>")){
              network.state.data.summary = lastAssistantMessageText
            }
          }
          return result
        }
      }
    });

    const network  = createNetwork({
      name:"coding-agent-network",
      agents:[codeAgent],
      maxIter:10, // if performance becomes poor please update this to 15.
      router:async({network})=>{
        const summary  = network.state.data.summary 
        if(summary){
          return  
        }
        return codeAgent
      }
    })
    const result = await network.run(event.data.value)
    const sandBoxURL = await step.run("get-sandbox-url",async ()=>{
      const sandBox  =await getSandBox(sandBoxId)
      const host =  sandBox.getHost(3000)
      return `https://${host}`
    })
    
    await step.run("save-result",async ()=>{
      return await prisma.message.create({
        data:{
          projectId:event.data.projectId,
          content:result.state.data.summary || "No Summary Available",
          role:"ASSISTANT",
          type:"RESULT",
          fragment:{
            create:{
              sandboxUrl:sandBoxURL,
              title:"Fragment",
              files:result.state.data.files 
            }
          }

        }
      })
    })

    return {
        url:sandBoxURL,
        title:"Fragment",
        files:result.state.data.files,
        summary:result.state.data.summary
    }
  },
);