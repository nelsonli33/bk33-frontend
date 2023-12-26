import React, { useEffect, useRef, useState, createElement } from "react";
import {
  RegisterOptions,
  useForm,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useIsAfterInitialMount } from "../../../hooks/use-is-after-initial-mount";
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

interface SelectTextOnFocus {
  selectTextOnFocus?: true;
}

interface Readonly {
  readonly?: true;
}

interface Disabled {
  disabled?: true;
}

interface Interactive {
  onChange(value: string, id: string): void;
}

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
  /** Make label font weight light */
  labelLight?: boolean;
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
  /** Disable editing of the input */
  readOnly?: boolean;
  /** Initial value for the input */
  value?: string;
  /** Enable automatic completion by the browser */
  autoComplete?: boolean | string;
  /** Mimics the behavior of the native HTML attribute, limiting the maximum value */
  max?: number | string;
  /** Maximum character length for an input */
  maxLength?: number;
  /** Minimum character length for an input */
  minLength?: number;
  /** A regular expression to check the value against */
  pattern?: string;
  /** Indicates whether or not the character count should be displayed */
  showCharacterCount?: boolean;
  /** Choose the keyboard that should be used on mobile devices */
  inputMode?: InputMode;
  /** Indicates whether or not the entire value should be selected on focus. */
  selectTextOnFocus?: boolean;
  /** Automatically focus the input */
  autoFocus?: boolean;
  /** Force the focus state on the input */
  focused?: boolean;
  /** register for React hook form */
  register?: UseFormRegister<any>;
  /** register options for React hook form */
  registerOptions?: RegisterOptions;
  /** watch for React hook form */
  watch?: UseFormWatch<any>;
  /** Callback fired when input is focused */
  onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
  /** Callback fired when focus is removed */
  onBlur?(): void;
  /** Callback fired when key down */
  onKeyDown?(event?: React.KeyboardEvent): void;
}

export type MutuallyExclusiveInteractionProps =
  | Interactive
  | Readonly
  | Disabled;

export type TextFieldProps = NonMutuallyExclusiveProps &
  MutuallyExclusiveInteractionProps;

const TextField2 = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      placeholder,
      label,
      labelType = "normal",
      labelLight,
      labelHidden,
      type = "text",
      error,
      name,
      id,
      autoComplete,
      disabled,
      readOnly,
      value,
      showCharacterCount,
      inputMode,
      maxLength,
      minLength,
      pattern,
      prefix,
      suffix,
      autoFocus,
      focused,
      selectTextOnFocus,
      register,
      registerOptions,
      defaultValue,
      watch,
      onFocus,
      onBlur,
      onKeyDown,
    },
    ref
  ) => {
    const ptOffset = "0.89743rem";
    const [focus, setFocus] = useState(Boolean(focused));

    const inputRef = useRef<HTMLInputElement>(ref);

    useEffect(() => {
      const input = inputRef.current;
      if (!input || focused === undefined) return;
      focused ? input.focus() : input.blur();
    }, [focused]);

    const inputType = type === "currency" ? "text" : type;

    const prefixMarkup = prefix ? (
      <div className="pl-3 flex items-center pointer-events-none">{prefix}</div>
    ) : null;

    const suffixMarkup = suffix ? (
      <div className="pr-3 flex items-center pointer-events-none">{suffix}</div>
    ) : null;

    let characterCountMarkup = null;
    if (showCharacterCount) {
      const characterCount = value ? value.length : 0;

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
            `floating-label block pointer-events-none whitespace-nowrap overflow-hidden absolute px-4 left-0 transition-transform duration-125 origin-top-left`
          )}
        >
          {label}
        </span>
      ) : null;

    const LabelMarkup =
      labelType === "normal" ? (
        <Label id={id} name={label} error={error} light={labelLight} />
      ) : null;

    const wrapperClassName = twMerge(
      `block w-full focus-within:ring-1 relative flex items-center overflow-hidden 
    border border-gray-350 rounded textbox`,
      error
        ? "border-red-500 focus-within:ring-red-600 focus-within:border-red-600"
        : "focus-within:ring-brand-black focus-within:border-brand-black"
    );

    const inputClassName = twMerge(
      `block flex-1 w-full border-none focus-within:ring-0 placeholder-gray-400`,
      labelType === "floating-label" &&
        `textfield rounded-lg p-0  text-gray-900 placeholder-transparent h-13 leading-[1.23453] pt-[${ptOffset}] px-[.93176rem] pb-0`
    );

    const handleOnFocus = (event: React.FocusEvent<HTMLElement>) => {
      if (selectTextOnFocus) {
        const input = inputRef.current;
        input?.select();
      }

      if (onFocus) {
        onFocus(event);
      }
    };

    const input = createElement("input", {
      name,
      id,
      className: inputClassName,
      defaultValue,
      disabled,
      readOnly,
      autoFocus,
      value,
      placeholder: labelType === "floating-label" ? label : placeholder,
      autoComplete: normalizeAutoComplete(autoComplete),
      inputRef,
      minLength,
      maxLength,
      pattern,
      inputMode,
      type: inputType,
      onFocus: handleOnFocus,
      onBlur,
      onKeyDown,
    });

    return (
      <div className="flex flex-col">
        {!labelHidden && LabelMarkup}
        <div className={wrapperClassName}>
          {prefixMarkup}
          {input}
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
);

function normalizeAutoComplete(autoComplete?: boolean | string) {
  if (autoComplete === true) {
    return "on";
  }
  if (autoComplete === false) {
    return "off";
  }
  return autoComplete;
}

export default TextField2;
