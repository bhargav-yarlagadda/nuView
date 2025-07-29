import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";
import { generateSlug } from "random-word-slugs";

export const projectRouter = createTRPCRouter({
  // create is the name of the procedure
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "message is required" }),
      })
    )
    .mutation(async ({ input }) => {
      const createdProject = await prisma.project.create({
        data: {
          name: generateSlug(2, {
            format: "kebab",
          }),
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
            projectId: createdProject.id 
        },
      });

      return createdProject;
    }),
  getProjects: baseProcedure.query(async () => {
    // returns all the messages
    const messages = await prisma.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return messages;
  }),
});
