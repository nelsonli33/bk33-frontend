import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import Spinner from "../Spinner";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "normal";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  loading?: boolean;
  destructive?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "normal", icon, loading, destructive, ...rest }: ButtonProps,
    ref
  ) => {
    const className = twMerge(
      variant === "normal" && "btn",
      variant === "primary" && "btn-primary",
      variant === "secondary" && "btn-secondary",
      variant === "tertiary" && "btn-tertiary",
      destructive &&
        "bg-destructive hover:bg-destructive-hover active:bg-destructive-active text-brand-primary",
      rest.className
    );

    return (
      <button
        {...rest}
        className={className}
        disabled={loading || rest.disabled}
        ref={ref}
      >
        {icon && <span className="inline-block">{icon}</span>}
        {loading ? <Spinner primary={variant === "primary"} /> : rest.children}
      </button>
    );
  }
);

export default Button;
