import { NextPage } from "next";
import Button from "../../components/button";
import FormInput from "../../components/FormInput";

const SignUp: NextPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        />
        <FormInput
          type="password"
          required
          label="Password"
          name="password"
          autoComplete="password"
        />
        <div />
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
