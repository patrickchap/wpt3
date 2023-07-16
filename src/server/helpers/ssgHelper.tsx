import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../api/root";
import superjson from "superjson";
import { createInnerTRPCContext } from "../api/trpc";

export const generateSSGHelper = () => 
  createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({auth: null, req: null}),
    transformer: superjson,
  });
