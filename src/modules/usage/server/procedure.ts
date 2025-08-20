import { getUsageStatus } from "@/lib/usage";
import { createTRPCRouter,protectedProcedure } from "@/trpc/init";

export const usageRouter = createTRPCRouter({
    status:protectedProcedure.query(async ({ctx})=>{
        try{
            const result = await getUsageStatus(ctx.auth.userId)
            return result
        }catch{
            return null 
        }
    })
})