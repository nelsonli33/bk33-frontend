import React from "react";
import { twMerge } from "tailwind-merge";

type Size = "small" | "medium" | "large" | "extraLarge";

export interface SkeletonDisplayTextProps {
  /**
   * Size of the text
   * @default 'medium'
   */
  size?: Size;
}
const SkeletonDisplayText = ({ size = "medium" }: SkeletonDisplayTextProps) => {
  const className = twMerge(
    "skeleton max-w-[120px]",
    size === "small" && "h-6 sm:h-7",
    size === "medium" && "h-7 sm:h-8",
    size === "large" && "h-8 sm:h-9",
    size === "extraLarge" && "h-9 sm:h-10"
  );
  return <div className={className} />;
};

export default SkeletonDisplayText;
