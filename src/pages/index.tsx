import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { NextPage } from "next";
import Head from "next/head";
import { UIEventHandler } from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import Spin from "../components/Spin";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    trpc.useInfiniteQuery(["movie.getInfinite", { take: 6 }], {
      getNextPageParam: (prev) => prev.nextCursor,
    });
  const [listRef] = useAutoAnimate<HTMLDivElement>();
  const handleScroll: UIEventHandler<HTMLElement> = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-800 text-neutral-100">
      <Head>
        <title>Funny Movies</title>
        <meta name="description" content="Funny Movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main
        ref={listRef}
        onScroll={handleScroll}
        className="items-center p-4 sm:p-8 grid sm:grid-cols-1 xl:grid-cols-2 auto-rows-min gap-4 sm:gap-8 overflow-hidden overflow-y-auto"
      >
        {isLoading ? (
          <Spin className="text-neutral-100 col-span-2" />
        ) : data?.pages ? (
          data?.pages
            .flatMap((page) => page.items)
            .map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <span className="text-sm m-auto">No movies.</span>
        )}
        {isFetchingNextPage && <Spin className="col-span-2" />}
      </main>
    </div>
  );
};

export default Home;
