// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { movieRouter } from "./movie";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("movie.", movieRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
