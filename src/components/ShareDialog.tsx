import { useState } from "react";
import { trpc } from "../utils/trpc";
import * as Dialog from "@radix-ui/react-dialog";
import FormInput from "./FormInput";
import Button from "./Button";

type DialogProps = { open: boolean; onOpenChange: (open: boolean) => void };
const ShareDialog: React.FC<DialogProps> = ({ open, onOpenChange }) => {
  const [url, setUrl] = useState("");
  const { queryClient } = trpc.useContext();
  const { mutate: shareMovie, isLoading } = trpc.useMutation("movie.create", {
    onSuccess: () => {
      queryClient.invalidateQueries(["movie.getAll"]);
      setUrl("");
      onOpenChange(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    shareMovie({ url });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="bg-slate-700/95 rounded-lg w-96 h-fit top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="absolute left-3 -top-3 text-neutral-100 bg-slate-700/95 rounded px-2">
            Share a Youtube video
          </Dialog.Title>
          <div className="h-2" />
          <form
            onSubmit={handleSubmit}
            className="px-6 py-4 flex flex-col items-center"
          >
            <FormInput
              label="Youtube URL"
              name="url"
              type="url"
              pattern="\S*youtube\.com\/watch\?v=\S+"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="h-4" />
            <Button disabled={isLoading}>Share</Button>
          </form>
          <Dialog.Close asChild>
            <button className="absolute -top-3 right-2 bg-slate-700/95 flex items-center justify-center rounded h-6 w-6 text-neutral-300 hover:text-white">
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

export default ShareDialog;
