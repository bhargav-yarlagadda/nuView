"use client"

import { useTRPC } from "@/trpc/tRPC-wrapper"
import { useSuspenseQuery } from "@tanstack/react-query"

interface Props{
    projectId: string 
}
export const ProjectView = ({projectId}:Props)=>{
    const trpc = useTRPC()
    
    const {data:project} = useSuspenseQuery(trpc.projects.getOneProject.queryOptions({
        id:projectId
    }))
    const {data:messages} = useSuspenseQuery(trpc.messages.getMessages.queryOptions({
        projectId:projectId
    }))
    return (
        <div>
            {
                JSON.stringify(project)

            }
            {
                JSON.stringify(messages,null,2)
            }
        </div>
    )
}   