import { inngest } from "@/inngest/client"
import prisma from "@/lib/prisma"
import {baseProcedure, createTRPCRouter} from "@/trpc/init"
import z from "zod"

export const messageRouter = createTRPCRouter(
    { 
    // create is the name of the procedure   
    create:baseProcedure.input(z.object({
        value:z.string().min(1,{message:"message is required"})
        

    })).mutation(async ({input})=>{
        const createdMessage = await prisma.message.create({
            data:{
                content:input.value,
                role:'USER',
                type:'RESULT',

            }
        })
        // now we are invoking the innjest, message from the user is saved and passed to innjest background job
        await inngest.send({
            name:"test/hello.world",
            data:{value:input.value}
        })
        console.log(createdMessage)
        return createdMessage
    }),
    getMessages:baseProcedure.query(async ()=>{
        // returns all the messages
        const messages = await prisma.message.findMany({
            orderBy:{
                updatedAt:"desc",
            }
        })
        return messages
    })  
}
)