import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import Tooltip from "./Tooltip";
import { useState } from "react";
import ShareDialog from "./ShareDialog";

const Header = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky z-10 top-0 px-4 sm:px-8 py-4 flex justify-between items-center h-14 bg-black text-neutral-100">
      <h1 className="sm:text-xl md:text-2xl lg:text-3xl font-bold">
        Funny Movies
      </h1>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <ShareDialog open={isDialogOpen} onOpenChange={setDialogOpen} />
            <span className="text-sm lg:text-base hidden sm:inline-block">
              Welcome <b>{session.user.email}</b>
            </span>
            <Tooltip tooltip={"Share a movie"}>
              <Button className="px-2" onClick={() => setDialogOpen(true)}>
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
            </Tooltip>
            <Button
              onClick={() => signOut()}
              className="border-red-500 bg-red-900 hover:border-red-400 hover:bg-red-800"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => signIn()}>Sign In</Button>
            <Button>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
