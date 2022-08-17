import { VoteType } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import { inferQueryOutput, trpc } from "../utils/trpc";
import cn from "classnames";

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
      <main className="flex-1 items-center p-8 grid sm:grid-cols-1 xl:grid-cols-2 auto-rows-min gap-8 overflow-hidden">
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
  const { data: session } = useSession();
  const { queryClient } = trpc.useContext();
  const { mutate: vote } = trpc.useMutation("movie.vote", {
    onSuccess: () => queryClient.invalidateQueries(["movie.getAll"]),
  });

  const handleUpvote = () => vote({ movieId: movie.id, type: "UP" });
  const handleDownvote = () => vote({ movieId: movie.id, type: "DOWN" });

  const selfVoted = (type: VoteType) =>
    session?.user?.id &&
    movie.votes.some(
      (vote) => vote.authorId === session.user?.id && vote.type === type
    );

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
      <div className="p-4 pt-0 flex-1 flex flex-col gap-1 overflow-hidden text-ellipsis whitespace-normal">
        <h2 className="text-neutral-100 text-xl">{movie.title || "TITLE"}</h2>
        <p className="flex gap-2 items-center text-neutral-500">
          <span className="flex gap-1 items-start">
            {movie.votes.filter((v) => v.type === "UP").length}
            <button
              onClick={handleUpvote}
              disabled={!session?.user}
              className={cn("hover:text-white", {
                ["text-neutral-200"]: selfVoted("UP"),
                ["text-neutral-500"]: !selfVoted("UP"),
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </button>
          </span>
          <span className="flex gap-1 items-end">
            {movie.votes.filter((v) => v.type === "DOWN").length}
            <button
              onClick={handleDownvote}
              disabled={!session?.user}
              className={cn("hover:text-white", {
                ["text-neutral-200"]: selfVoted("DOWN"),
                ["text-neutral-500"]: !selfVoted("DOWN"),
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
              </svg>
            </button>
          </span>
        </p>
        <p className="text-sm text-neutral-400">
          Shared by: {movie.author.email}
        </p>
        <p className="text-sm text-neutral-500">
          {movie.description || "Description"}
        </p>
      </div>
    </section>
  );
};

export default Home;
