import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({children, className="", ...props}: ButtonProps){
  return (
    <button {...props} className={`px-5 py-3 hover:cursor-pointer bg-bgsecondary text-textsecondary rounded-xl ${className}`}>
        {children}
    </button>
  );
};