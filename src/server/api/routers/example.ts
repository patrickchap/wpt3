import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure} from "~/server/api/trpc";
import { clerkClient } from '@clerk/nextjs';

export const exampleRouter = createTRPCRouter({
  hello: protectedProcedure.query(({ctx}) => {
      return {
        greeting: `hello! ${ctx.auth?.userId}`
      }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getAllUsers: protectedProcedure.query(async () => {
      return await clerkClient.users.getUserList();
  }),
});
