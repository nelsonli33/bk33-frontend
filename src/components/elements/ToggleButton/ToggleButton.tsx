import React from "react";
import { twMerge } from "tailwind-merge";
import { BaseButton } from "../../../global/types";

export interface ToggleButtonProps extends BaseButton {
  value?: string;
  /** The content to display inside the button */
  children?: any;
  selected?: boolean;
}

export default function ToggleButton({
  selected,
  children,
  ...props
}: ToggleButtonProps) {
  const className = twMerge("btn", selected && "text-brand-green");

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
