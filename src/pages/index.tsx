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
      <main className="container flex-1 mx-auto flex flex-col items-center justify-center p-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </main>
    </div>
  );
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <section className="flex justify-center p-6 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{movie.title}</h2>
      <p className="text-sm text-gray-600">{movie.description}</p>
      <a
        className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
        href={movie.url}
        target="_blank"
        rel="noreferrer"
      >
        URL
      </a>
    </section>
  );
};

export default Home;
