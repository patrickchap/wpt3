import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure} from "~/server/api/trpc";
import { clerkClient } from '@clerk/nextjs';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.query(({ctx}) => {
      return {
        greeting: ctx.auth
      }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getAllUsers: protectedProcedure.query(async () => {
      return await clerkClient.users.getUserList();
  }),

});
