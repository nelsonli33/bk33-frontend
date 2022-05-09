import React from "react";

import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";
import { twMerge } from "tailwind-merge";

interface TextareaInnerProps {
  label?: string;
}

type TextareaProps = TextareaInnerProps & TextareaAutosizeProps;

const Textarea = ({ label, ...rest }: TextareaProps) => {
  const { id, className } = rest;
  const labelMarkup = label ? (
    <label htmlFor={id} className="block font-medium text-gray-700">
      {label}
    </label>
  ) : null;

  return (
    <>
      {labelMarkup}
      <div className="mt-1">
        <TextareaAutosize
          className={twMerge(
            "block w-full placeholder-gray-500 focus:ring-brand-black focus:border-brand-black border border-gray-350 rounded",
            className
          )}
          {...rest}
        />
      </div>
    </>
  );
};

export default Textarea;
