import Head from "next/head";
import { useId } from "react";

type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type FormInputProps = {
  name: string;
  label: string;
} & HTMLInputProps;

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  ...inputProps
}) => {
  const id = useId();
  return (
    <div className="col-span-6 self-stretch">
      <Head>
        <title>Sign Up</title>
      </Head>
      <label
        htmlFor={`${id}-${name}`}
        className="block text-sm font-medium text-neutral-100 cursor-pointer"
      >
        {label}
      </label>
      <input
        type="text"
        id={`${id}-${name}`}
        name={name}
        className="h-9 mt-1 px-2 block w-full bg-slate-900 border border-gray-400 text-neutral-100 hover:border-gray-300 focus:border-gray-300 outline-none focus:shadow-sm sm:text-sm rounded-md"
        {...inputProps}
      />
    </div>
  );
};

export default FormInput;
