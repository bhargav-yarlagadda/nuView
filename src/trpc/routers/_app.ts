// import { z } from 'zod';
// import { baseProcedure, createTRPCRouter } from '../init';

import { messageRouter } from "@/modules/message/server/procedures";
import { baseProcedure, createTRPCRouter } from "../init";
import { projectRouter } from "@/modules/projects/server/procedures";
import { usageRouter } from "@/modules/usage/server/procedure";

// import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({

    messages:messageRouter,
    projects:projectRouter,
    usage:usageRouter
  // invoke:baseProcedure
  //       .input(z.object({
  //           v  alue:z.string()
  //       })).mutation(async ({input})=>{
  //         await inngest.send({
  //           name:"test/hello.world",
  //           data:{value:input.value}
  //         })
  //       })
  // ,
  // hello: baseProcedure
  //   .input(
  //     z.object({
  //       text: z.string(),
  //     }),
  //   )
  //   .query((opts) => {
  //     return {
  //       greeting: `hello ${opts.input.text}`,
  //     };
  //   }),

});
// export type definition of API
export type AppRouter = typeof appRouter;