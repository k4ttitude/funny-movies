import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { trpc } from "../../utils/trpc";

const SignUp: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutate } = trpc.useMutation("auth.register", {
    onSuccess: () => {
      router.push("/api/auth/signin");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    mutate({ email, password });
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="sm:w-96 m-auto rounded-md flex flex-col gap-2 items-center justify-center px-6 py-4 bg-slate-700/75"
      >
        <FormInput
          type="email"
          required
          label="Email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          required
          label="Password"
          name="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div />
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
