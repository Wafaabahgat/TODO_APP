import { ButtonHTMLAttributes, FC } from "react";
import { cn } from "../../utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const Button: FC<ButtonProps> = ({ className, text, children, ...props }) => {
  return (
    <button
      className={cn(
        className,
        "capitalize text-white bg-green-700 rounded-md font-semibold"
      )}
      {...props}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
