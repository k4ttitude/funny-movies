import { createRouter } from "./context";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

const protectedMovieRouter = createProtectedRouter().mutation("create", {
  input: z.object({ url: z.string().url() }),
  resolve: ({
    ctx: {
      prisma,
      session: { user },
    },
    input: { url },
  }) => prisma.movie.create({ data: { url, authorId: user.id } }),
});

export const movieRouter = createRouter()
  .query("getAll", {
    resolve: async ({ ctx: { prisma } }) => prisma.movie.findMany(),
  })
  .merge(protectedMovieRouter);
