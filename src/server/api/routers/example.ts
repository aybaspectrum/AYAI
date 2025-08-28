import { publicProcedure, createTRPCRouter } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello from tRPC!";
  }),
});
