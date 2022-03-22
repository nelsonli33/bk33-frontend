import React from "react";
import { BaseButton } from "../../global/types";
import { classNames } from "../../utilities/css";

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
  const className = classNames("btn", selected && "text-brand-green-default");

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
