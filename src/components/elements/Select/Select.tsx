import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { classNames } from "../../../utilities/css";
import type { Error } from "../../types";

interface StrictOption {
  /** Machine value of the option; this is the value passed to `onChange` */
  value: string;
  /** Human-readable text for the option */
  label: string;
  /** Option will be visible, but not selectable */
  disabled?: boolean;
}

interface HideableStrictOption extends StrictOption {
  hidden?: boolean;
}

interface StrictGroup {
  /** Title for the group */
  title: string;
  /** List of options */
  options: StrictOption[];
}

export type SelectOption = string | StrictOption;

export interface SelectGroup {
  title: string;
  options: SelectOption[];
}

export interface SelectProps {
  /** List of options or option groups to choose from */
  options?: (SelectOption | SelectGroup)[];
  /** Label for the select */
  label: React.ReactNode;
  /** ID for form input */
  id: string;
  /** Display an error state */
  error?: Error | boolean;
  /** register for React hook form */
  register: UseFormRegister<any>;
  /** register options for React hook form */
  registerOptions?: RegisterOptions;
}

const PLACEHOLDER_VALUE = "";

export default function Select({
  options: optionsProp,
  label,
  id,
  error,
  register,
  registerOptions,
}: SelectProps) {
  const options = optionsProp || [];
  let normalizedOptions = options.map(normalizeOption);

  const labelMarkup = label && (
    <span
      className={classNames(
        `peer-placeholder-shown:text-base
                peer-placeholder-shown:top-[0.89743rem]
                peer-focus:text-xs
                peer-focus:top-[0.35882rem]
                transition-all
                duration-[125ms]
                block pointer-events-none whitespace-nowrap overflow-hidden sm:text-xs absolute px-3 left-0 top-[0.35882rem] text-gray-400`
      )}
    >
      {label}
    </span>
  );

  const optionsMarkup = normalizedOptions.map(renderOption);

  return (
    <div className="relative">
      <select
        id={id}
        className="block pr-10 py-2 text-base sm:text-sm
        peer border rounded-lg p-0 focus-within:ring-1 w-full text-gray-900 placeholder-transparent h-13 leading-[1.23453] 
        pt-[0.89743rem]  px-[.93176rem] pb-0 border-gray-300 focus-within:ring-slate-800 focus-within:border-slate-800"
        {...register(`${id}`, registerOptions)}
      >
        {optionsMarkup}
      </select>
      {labelMarkup}
    </div>
  );
}

function isString(option: SelectOption | SelectGroup): option is string {
  return typeof option === "string";
}

function isGroup(option: SelectOption | SelectGroup): option is SelectGroup {
  return (
    typeof option === "object" && "options" in option && option.options != null
  );
}

function normalizeStringOption(option: string): StrictOption {
  return {
    label: option,
    value: option,
  };
}

/**
 * Converts a string option (and each string option in a Group) into
 * an Option object.
 */
function normalizeOption(
  option: SelectOption | SelectGroup
): HideableStrictOption | StrictGroup {
  if (isString(option)) {
    return normalizeStringOption(option);
  } else if (isGroup(option)) {
    const { title, options } = option;
    return {
      title,
      options: options.map((option) => {
        return isString(option) ? normalizeStringOption(option) : option;
      }),
    };
  }

  return option;
}

function renderSingleOption(option: HideableStrictOption): React.ReactNode {
  const { value, label, ...rest } = option;
  return (
    <option key={value} value={value} {...rest}>
      {label}
    </option>
  );
}

function renderOption(
  optionOrGroup: HideableStrictOption | StrictGroup
): React.ReactNode {
  if (isGroup(optionOrGroup)) {
    const { title, options } = optionOrGroup;
    return (
      <optgroup label={title} key={title}>
        {options.map(renderSingleOption)}
      </optgroup>
    );
  }

  return renderSingleOption(optionOrGroup);
}
