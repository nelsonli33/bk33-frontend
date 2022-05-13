import React from "react";
import { twMerge } from "tailwind-merge";
import { classNames } from "../../../utilities/css";
import Spinner from "../Spinner";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "normal";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = ({
  variant = "normal",
  icon,
  loading,
  ...rest
}: ButtonProps) => {
  const className = twMerge(
    variant === "normal" && "btn",
    variant === "primary" && "btn-primary",
    variant === "secondary" && "btn-secondary",
    variant === "tertiary" && "btn-tertiary",
    rest.className
  );

  return (
    <button {...rest} className={className} disabled={loading || rest.disabled}>
      {icon && <span className="inline-block">{icon}</span>}
      {loading ? <Spinner /> : rest.children}
    </button>
  );
};

export default Button;
