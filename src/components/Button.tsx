import cn from "classnames";
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
        className={cn(
          "h-8 px-3 flex items-center gap-1 rounded border border-slate-500 bg-slate-700 text-neutral-100 hover:border-slate-400 hover:bg-slate-600 hover:text-white disabled:!text-neutral-200 disabled:!bg-slate-800 disabled:!border-slate-600",
          className || ""
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
