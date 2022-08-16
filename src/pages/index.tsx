import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Button } from "../components/button";
import { trpc } from "../utils/trpc";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Funny Movies</title>
        <meta name="description" content="Funny Movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="px-5 py-4 flex justify-between items-center h-14 bg-gray-100">
        <h1 className="text-3xl font-bold">Funny Movies</h1>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <span>
                Welcome <b>{session.user.email}</b>
              </span>
              <Button className="px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </Button>
              <Button
                onClick={() => signOut()}
                className="border-red-300 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => signIn()} className="">
              Sign In
            </Button>
          )}
        </div>
      </header>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <p></p>
      </main>
    </>
  );
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};

export default Home;
