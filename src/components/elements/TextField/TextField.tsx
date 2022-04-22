import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { classNames } from "../../../utilities/css";
import { Error } from "../../types";

type Type =
  | "text"
  | "password"
  | "email"
  | "number"
  | "url"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time"
  | "search"
  | "tel"
  | "checkbox"
  | "radio";

export interface TextFieldProps {
  /** Hint text to display */
  placeholder?: string;
  /** Label for the input */
  label: string;
  /** Determine type of input */
  type?: Type;
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** Name of the input */
  name?: string;
  /** ID for the input */
  id: string;
  /** Enable automatic completion by the browser */
  autoComplete?: boolean | string;
  /** Maximum character length for an input */
  maxLength?: number;
  /** Minimum character length for an input */
  minLength?: number;
  /** register for React hook form */
  register?: UseFormRegister<any>;
  /** register options for React hook form */
  registerOptions?: RegisterOptions;
}

export default function TextField({
  placeholder,
  label,
  type,
  error,
  name,
  id,
  autoComplete,
  maxLength,
  minLength,
  register,
  registerOptions,
}: TextFieldProps) {
  const ptOffset = "0.89743rem";

  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          type={type || "text"}
          name={name}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete={normalizeAutoComplete(autoComplete)}
          className={classNames(
            error
              ? "border-red-500 focus-within:ring-red-600 focus-within:border-red-600"
              : "border-gray-300 focus-within:ring-slate-800 focus-within:border-slate-800",
            `peer border rounded-lg p-0 focus-within:ring-1 block w-full text-gray-900 placeholder-transparent h-13 leading-[1.23453] pt-[${ptOffset}] px-[.93176rem] pb-0 form-input`
          )}
          placeholder={label}
          {...register(`${id}`, registerOptions)}
        />
        <span
          className={classNames(
            error ? "text-red-600" : "text-gray-500",
            `peer-placeholder-shown:text-base
            peer-placeholder-shown:top-[${ptOffset}]
            peer-focus:text-xs
            peer-focus:top-[0.35882rem]
            transition-all
            duration-[125ms]
            block pointer-events-none whitespace-nowrap overflow-hidden sm:text-xs absolute px-4 left-0 top-[0.35882rem]`
          )}
        >
          {label}
        </span>
      </div>
      {error && (
        <small className="inline-block mt-1 text-red-600">{error}</small>
      )}
    </div>
  );
}

function normalizeAutoComplete(autoComplete?: boolean | string) {
  if (autoComplete === true) {
    return "on";
  }
  if (autoComplete === false) {
    return "off";
  }
  return autoComplete;
}
