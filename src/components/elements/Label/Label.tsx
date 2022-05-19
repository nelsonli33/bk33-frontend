import React from "react";
import { twMerge } from "tailwind-merge";
import { Error } from "../../types";

export interface LabelProps {
  id?: string;
  name: string;
  error?: Error | boolean;
  className?: string;
  light?: boolean;
}

const Label = ({ id, name, error, className, light }: LabelProps) => {
  return (
    <label
      htmlFor={id}
      className={twMerge(
        "block text-base leading-7 pb-[2.2374px]",
        error ? "text-red-600" : "text-brand-black",
        light ? "font-normal" : "font-medium",
        className
      )}
    >
      {name}
    </label>
  );
};

export default Label;
