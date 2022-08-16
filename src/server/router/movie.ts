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
  }) => {
    const urlRegex = /youtube\.com\/watch\?v=(?<slug>\S+)/;
    const match = url.match(urlRegex);
    if (!match || !match.groups || !match.groups.slug) {
      throw new Error("Invalid URL");
    }
    console.log({ slug: match.groups.slug });
    return prisma.movie.create({
      data: { url, authorId: user.id, slug: match.groups.slug },
    });
  },
});

export const movieRouter = createRouter()
  .query("getAll", {
    resolve: async ({ ctx: { prisma } }) =>
      prisma.movie.findMany({
        include: { author: { select: { id: true, email: true, name: true } } },
      }),
  })
  .merge(protectedMovieRouter);
