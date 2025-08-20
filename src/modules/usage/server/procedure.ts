import { getUsageStatus } from "@/lib/usage";
import { createTRPCRouter,protectedProcedure } from "@/trpc/init";
import { auth } from "@clerk/nextjs/server";

export const usageRouter = createTRPCRouter({
    status:protectedProcedure.query(async ({ctx})=>{
        try{
            const { has } = await auth();
            const isProUser = has({plan:"pro"})
            const result = await getUsageStatus(ctx.auth.userId,isProUser)
            return result
        }catch{
            return null 
        }
    })
})