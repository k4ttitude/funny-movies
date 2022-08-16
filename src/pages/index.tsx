import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { inferQueryOutput, trpc } from "../utils/trpc";

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
      <main className="flex-1 items-center p-8 grid sm:grid-cols-1 lg:grid-cols-2 auto-rows-min gap-8 overflow-hidden">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </main>
    </div>
  );
};

type ArrElement<ArrType extends readonly unknown[]> =
  ArrType extends readonly (infer ElementType)[] ? ElementType : never;
type Movie = ArrElement<inferQueryOutput<"movie.getAll">>;

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <section className="min-w-[600px] h-60 cursor-pointer flex self-stretch py-4 px-5 motion-safe:hover:scale-105 overflow-hidden bg-black/50 rounded-sm">
      <iframe
        className="aspect-video h-full"
        src={`https://www.youtube.com/embed/${movie.slug}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="p-4 pt-0 flex-1 overflow-hidden text-ellipsis whitespace-normal">
        <h2 className="text-neutral-100 text-xl">{movie.title || "TITLE"}</h2>
        <div className="h-1" />
        <p className="text-sm text-neutral-400">
          Shared by: {movie.author.email}
        </p>
        <div className="h-1" />
        <p className="text-sm text-neutral-500">
          {movie.description || "Description"}
        </p>
      </div>
    </section>
  );
};

export default Home;
