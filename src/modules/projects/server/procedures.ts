import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";
import { consumeCredits } from "@/lib/usage";
import { auth } from "@clerk/nextjs/server";

export const projectRouter = createTRPCRouter({
  // create is the name of the procedure
  create: protectedProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "message is required" }),
      })
    ) //context is passed from middleware created for proceteced Procedure
    .mutation(async ({ input, ctx }) => {
      const {has} = await auth()
      const isProUser = has({plan:"pro"})
      try {
        await consumeCredits(ctx.auth.userId,isProUser);
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
      const createdProject = await prisma.project.create({
        data: {
          name: generateSlug(2, {
            format: "kebab",
          }),
          userId: ctx.auth.userId,
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
    .query(async ({ input, ctx }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project Not found",
        });
      }
      return project;
    }),
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    // returns all the messages
    const messages = await prisma.project.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return messages;
  }),
});
