import { createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
      sayHello: publicProcedure.query(() => {
          return "Hello";
      }),

    create: publicProcedure
    .mutation(({ctx}) => {
        const { req } = ctx;
        console.log("Request body:", req.body);
        return "test";
    }),
});

