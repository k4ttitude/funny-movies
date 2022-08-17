import { useSession } from "next-auth/react";
import { inferQueryOutput, trpc } from "../utils/trpc";
import cn from "classnames";
import { useEffect, useMemo } from "react";
import { VoteType } from "@prisma/client";

type ArrElement<ArrType extends readonly unknown[]> =
  ArrType extends readonly (infer ElementType)[] ? ElementType : never;
type Movie = ArrElement<inferQueryOutput<"movie.getInfinite">["items"]>;

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { data: session } = useSession();
  const utils = trpc.useContext();
  const { mutate: vote } = trpc.useMutation("movie.vote", {
    onMutate: ({ movieId, type }) => {
      utils.cancelQuery(["movie.getInfinite"]);
      if (!session?.user?.id) {
        return;
      }

      utils.setInfiniteQueryData(["movie.getInfinite", { take: 6 }], (data) => {
        if (!data) {
          return { pages: [], pageParams: [] };
        }

        const movie = data.pages
          .flatMap((page) => page.items)
          .find((movie) => movie.id === movieId);
        const vote = movie?.votes.find(
          (vote) => vote.authorId === session.user?.id
        );
        if (vote) {
          vote.type = type;
        }

        return data;
      });
    },
    onSuccess: () => utils.invalidateQueries(["movie.getInfinite"]),
  });

  const handleUpvote = () => vote({ movieId: movie.id, type: VoteType.UP });
  const handleDownvote = () => vote({ movieId: movie.id, type: VoteType.DOWN });

  const voteType = session?.user?.id
    ? movie.votes.find((v) => v.authorId === session?.user?.id)?.type
    : undefined;

  return (
    <section className="flex flex-col sm:flex-row self-stretch py-4 px-5 motion-safe:hover:scale-105 overflow-hidden bg-black/50 rounded-sm">
      <iframe
        className="aspect-video h-40 sm:h-60"
        src={`https://www.youtube.com/embed/${movie.slug}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="p-0 pt-4 h-40 sm:p-4 sm:pt-0 sm:h-60 flex-1 flex flex-col gap-1 overflow-hidden text-ellipsis whitespace-normal">
        <h2 className="text-neutral-100 text-xl">{movie.title || "TITLE"}</h2>
        <p className="flex gap-2 items-center text-neutral-500">
          <span className="flex gap-1 items-start">
            {movie.votes.filter((v) => v.type === VoteType.UP).length}
            <button
              onClick={handleUpvote}
              disabled={!session?.user}
              className={cn(
                "cursor-pointer hover:text-white disabled:!text-neutral-500",
                {
                  ["text-neutral-200"]: voteType === VoteType.UP,
                  ["text-neutral-500"]: voteType !== VoteType.UP,
                }
              )}
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
            {movie.votes.filter((v) => v.type === VoteType.DOWN).length}
            <button
              onClick={handleDownvote}
              disabled={!session?.user}
              className={cn("hover:text-white", {
                ["text-neutral-200"]: voteType === VoteType.DOWN,
                ["text-neutral-500"]: voteType !== VoteType.DOWN,
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
        <p className="text-sm text-neutral-500 hidden sm:block">
          {movie.description || "Description"}
        </p>
      </div>
    </section>
  );
};

export default MovieCard;
