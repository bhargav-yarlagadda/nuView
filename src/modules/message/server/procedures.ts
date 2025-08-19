import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { consumeCredits } from "@/lib/usage";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const messageRouter = createTRPCRouter({
  // create is the name of the procedure
  create: protectedProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "message is required" }),
        projectId: z.string().min(1, { message: "message is required" }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existingProject = await prisma.project.findUnique({
        where: {
          id: input.projectId,
          userId: ctx.auth.userId,
        },
      });
      if (!existingProject) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }
      // each message consumes a credit
      try {
        await consumeCredits();
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
          });
        } else {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "You have run out of free credits",
          });
        }
      }
      const createdMessage = await prisma.message.create({
        data: {
          projectId: existingProject.id,
          content: input.value,
          role: "USER",
          type: "RESULT",
        },
      });

      // now we are invoking the innjest, message from the user is saved and passed to innjest background job
      await inngest.send({
        name: "test/hello.world",
        data: { value: input.value, projectId: input.projectId },
      });
      console.log(createdMessage);
      return createdMessage;
    }),
  getMessages: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      // returns all the messages
      const messages = await prisma.message.findMany({
        where: {
          projectId: input.projectId,
          project: {
            userId: ctx.auth.userId,
          },
        },
        include: {
          fragment: true,
        },
        orderBy: {
          updatedAt: "asc",
        },
      });
      return messages;
    }),
});
