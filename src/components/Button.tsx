import React from "react";

type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = React.forwardRef<HTMLButtonElement, HTMLButtonProps>(
  function Button({ className, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={`h-8 px-3 rounded border border-slate-500 bg-slate-700 text-neutral-100 hover:border-slate-400 hover:bg-slate-600 hover:text-white ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
