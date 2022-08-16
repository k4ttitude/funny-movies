import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import Tooltip from "./Tooltip";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import FormInput from "./FormInput";

const Header = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { data: session } = useSession();
  const { queryClient } = trpc.useContext();
  const { mutate: shareMovie } = trpc.useMutation("movie.create", {
    onSuccess: () => {
      queryClient.invalidateQueries(["movie.getAll"]);
    },
  });

  return (
    <header className="px-5 py-4 flex justify-between items-center h-14 bg-black text-neutral-100">
      <h1 className="text-3xl font-bold">Funny Movies</h1>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span>
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
      <ShareDialog open={isDialogOpen} onOpenChange={setDialogOpen} />
    </header>
  );
};

export default Header;

type DialogProps = { open: boolean; onOpenChange: (open: boolean) => void };
const ShareDialog: React.FC<DialogProps> = ({ open, onOpenChange }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="bg-slate-700/75 rounded-lg w-96 h-fit top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="absolute left-3 -top-3 text-neutral-100 bg-slate-700/75 rounded px-2">
            Share a Youtube video
          </Dialog.Title>
          <div className="h-2" />
          <form
            onSubmit={handleSubmit}
            className="px-6 py-4 flex flex-col items-center"
          >
            <FormInput label="Youtube URL" name="url" />
            <div className="h-4" />
            <Button>Share</Button>
          </form>
          <Dialog.Close asChild>
            <button className="absolute -top-3 right-2 bg-slate-700/75 flex items-center justify-center rounded h-6 w-6 text-neutral-300 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
