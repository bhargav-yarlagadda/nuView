import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  // create is the name of the procedure
  create: protectedProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "message is required" }),
      })
    ) //context is passed from middleware created for proceteced Procedure
    .mutation(async ({ input,ctx }) => {
      const createdProject = await prisma.project.create({
        data: {
          name: generateSlug(2, {
            format: "kebab",
          }),
          userId:ctx.auth.userId,
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT",
            },
          },
        },
      });

      await inngest.send({
        name: "test/hello.world",
        data: {
          value: input.value,
          projectId: createdProject.id,
        },
      });

      return createdProject;
    }),

  getOneProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: input.id,
        },
      });
      if(!project){
        throw new TRPCError({code:"NOT_FOUND",message:"Project Not found"})
      }
      return project;
    }),
  getProjects: protectedProcedure.query(async ({ctx}) => {
    // returns all the messages
    const messages = await prisma.project.findMany({
       where:{
        userId:ctx.auth.userId
      },
      orderBy: {
        updatedAt: "desc",
      }  
     
    });
    return messages;
  }),
});
