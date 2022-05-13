import React from "react";
import {
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { classNames } from "../../../utilities/css";
import { Error } from "../../types";
import Label from "../Label";

type Type =
  | "text"
  | "email"
  | "password"
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
  | "radio"
  | "currency";

type InputMode =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url";

interface Readonly {
  readonly?: true;
}

interface Disabled {
  disabled?: true;
}

interface Interactive {
  onChange(value: string, id: string): void;
}

export type MutuallyExclusiveInteractionProps =
  | Interactive
  | Readonly
  | Disabled;

interface NonMutuallyExclusiveProps {
  /** Text to display before value */
  prefix?: React.ReactNode;
  /** Text to display after value */
  suffix?: React.ReactNode;
  /** Hint text to display */
  placeholder?: string;
  /** Label for the input */
  label: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Label type */
  labelType?: "normal" | "floating-label";
  /** Disable the input */
  disabled?: boolean;
  /** Determine type of input */
  type?: Type;
  /** Error to display beneath the label */
  error?: Error | boolean;
  /** Name of the input */
  name?: string;
  /** ID for the input */
  id: string;
  /** Default value for the input */
  defaultValue?: string;
  /** Enable automatic completion by the browser */
  autoComplete?: boolean | string;
  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  max?: number | string;
  /** Maximum character length for an input */
  maxLength?: number;
  /** Minimum character length for an input */
  minLength?: number;
  /** Indicates whether or not the character count should be displayed */
  showCharacterCount?: boolean;
  /** Choose the keyboard that should be used on mobile devices */
  inputMode?: InputMode;
  /** register for React hook form */
  register?: UseFormRegister<any>;
  /** register options for React hook form */
  registerOptions?: RegisterOptions;
  /** watch for React hook form */
  watch?: UseFormWatch<any>;
  /** Callback fired when key down */
  onKeyDown?(event?: React.KeyboardEvent): void;
}

export type TextFieldProps = NonMutuallyExclusiveProps &
  NonMutuallyExclusiveProps;

export default function TextField({
  placeholder,
  label,
  labelType = "normal",
  labelHidden,
  type,
  error,
  name,
  id,
  autoComplete,
  showCharacterCount,
  maxLength,
  minLength,
  prefix,
  suffix,
  register,
  registerOptions,
  defaultValue,
  watch,
  onKeyDown,
}: TextFieldProps) {
  const ptOffset = "0.89743rem";

  const watchValue = watch ? watch(id) : null;

  const inputType = type === "currency" ? "text" : type;

  const prefixMarkup = prefix ? (
    <div className="pl-3 flex items-center pointer-events-none">{prefix}</div>
  ) : null;

  const suffixMarkup = suffix ? (
    <div className="pr-3 flex items-center pointer-events-none">{suffix}</div>
  ) : null;

  let characterCountMarkup = null;
  if (showCharacterCount) {
    const characterCount = watchValue ? watchValue.length : 0;

    const characterCountClassName = classNames(
      `my-0 mr-3 ml-1 text-right pointer-events-none flex items-center text-gray-600 block`
    );

    const characterCountText = !maxLength
      ? characterCount
      : `${characterCount}/${maxLength}`;

    characterCountMarkup = (
      <div className={characterCountClassName}>{characterCountText}</div>
    );
  }

  const floatingLabelMarkup =
    labelType === "floating-label" ? (
      <span
        className={twMerge(
          error ? "text-red-600" : "text-gray-500",
          `peer-placeholder-shown:text-base
            peer-placeholder-shown:top-[${ptOffset}]
            peer-focus:text-xs
            peer-focus:top-[0.35882rem]
            transition-all
            duration-[125ms]
            block pointer-events-none whitespace-nowrap overflow-hidden 
            sm:text-xs absolute px-4 left-0 top-[0.35882rem]`
        )}
      >
        {label}
      </span>
    ) : null;

  const LabelMarkup =
    labelType === "normal" ? (
      <Label id={id} name={label} error={error} />
    ) : null;

  const wrapperClassName = twMerge(
    `block w-full focus-within:ring-1 relative flex items-center overflow-hidden 
    border border-gray-350 rounded`,
    error
      ? "border-red-500 focus-within:ring-red-600 focus-within:border-red-600"
      : "focus-within:ring-brand-black focus-within:border-brand-black"
  );

  const inputClassName = twMerge(
    `block flex-1 w-full border-none focus-within:ring-0 placeholder-gray-400`,
    labelType === "floating-label" &&
      `peer rounded-lg p-0  text-gray-900 placeholder-transparent h-13 leading-[1.23453] pt-[${ptOffset}] px-[.93176rem] pb-0`
  );

  const inputMarkup = (
    <input
      type={inputType || "text"}
      name={name}
      id={id}
      maxLength={maxLength}
      minLength={minLength}
      autoComplete={normalizeAutoComplete(autoComplete)}
      className={inputClassName}
      placeholder={labelType === "floating-label" ? label : placeholder}
      onKeyDown={onKeyDown}
      defaultValue={defaultValue}
      {...register(`${id}`, registerOptions)}
    />
  );

  return (
    <div className="flex flex-col">
      {!labelHidden && LabelMarkup}
      <div className={wrapperClassName}>
        {prefixMarkup}
        {inputMarkup}
        {!labelHidden && floatingLabelMarkup}
        {suffixMarkup}
        {characterCountMarkup}
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
