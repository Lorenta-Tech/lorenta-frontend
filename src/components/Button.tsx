import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({children, className="", ...props}: ButtonProps){
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold leading-none text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
        {children}
    </button>
  );
};
