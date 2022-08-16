import { Movie } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: movies, isLoading } = trpc.useQuery(["movie.getAll"]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-800 text-neutral-100">
      <Head>
        <title>Funny Movies</title>
        <meta name="description" content="Funny Movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex-1 items-center p-4 bg-red-50/25 grid grid-cols-2 auto-rows-min gap-8 overflow-hidden">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </main>
    </div>
  );
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <section className="flex self-stretch p-6 motion-safe:hover:scale-105 overflow-hidden bg-neutral-700/80 rounded-sm">
      <iframe
        height="200"
        className="aspect-video"
        src="https://www.youtube.com/embed/cC6HFd1zcbo"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="p-4">
        <h2 className="text-neutral-100 text-xl">{movie.title || "TITLE"}</h2>
        <div className="h-1" />
        <p className="text-sm text-neutral-400">Shared by: {movie.authorId}</p>
        <div className="h-1" />
        <p className="text-sm text-neutral-500">
          {movie.description || "DESCRIPTION"}
        </p>
      </div>
    </section>
  );
};

export default Home;
