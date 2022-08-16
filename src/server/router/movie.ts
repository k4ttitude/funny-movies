import { createRouter } from "./context";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";
import { PrismaClient } from "@prisma/client";

type YoutubeVideosResponse = {
  items: {
    snippet: {
      title: string;
      description: string;
    };
  }[];
};

const crawlMovieMeta = async (
  movieId: string,
  slug: string,
  prisma: PrismaClient
) => {
  try {
    const videosResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${slug}&key=${"AIzaSyALpieq8_5xjD7wIGLtaz-mLsMLrA7q464"}`,
      { method: "GET", referrerPolicy: "origin" }
    ).then((res) => res.json() as Promise<YoutubeVideosResponse>);
    console.log({ videosResponse });
    if (
      !videosResponse.items ||
      !videosResponse.items[0] ||
      !videosResponse.items[0].snippet
    ) {
      return;
    }

    const { snippet } = videosResponse.items[0];
    console.log(snippet);
    await prisma.movie.update({
      where: { id: movieId },
      data: { title: snippet?.title, description: snippet?.description },
    });
  } catch (e) {
    console.error(e);
  }
};

const protectedMovieRouter = createProtectedRouter().mutation("create", {
  input: z.object({ url: z.string().url() }),
  resolve: async ({
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
    const movie = await prisma.movie.create({
      data: { url, authorId: user.id, slug: match.groups.slug },
    });

    // don't need to wait for this to finish
    // TODO: add a job queue, notify client when completed
    crawlMovieMeta(movie.id, movie.slug, prisma);

    return movie;
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
