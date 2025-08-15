import {
  createCallerFactory,
  createTRPCRouter,
} from "./trpc";
import { exampleRouter } from "./routers/example";
import { userRouter } from "./routers/user";
import { careerEventRouter } from "./routers/careerEvent";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  careerEvent: careerEventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
