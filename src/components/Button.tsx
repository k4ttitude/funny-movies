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
        className={`h-8 px-3 rounded border border-slate-300 bg-slate-50 text-neutral-800 hover:border-slate-500 hover:bg-slate-100 hover:text-neutral-900 ${
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
