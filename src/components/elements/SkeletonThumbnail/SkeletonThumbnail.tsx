import React from "react";
import { twMerge } from "tailwind-merge";

type Size = "small" | "medium" | "large";

export interface SkeletonThumbnailProps {
  /**
   * Size of the thumbnail
   * @default 'medium'
   */
  size?: Size;
}

const SkeletonThumbnail = ({ size = "medium" }: SkeletonThumbnailProps) => {
  const className = twMerge(
    "skeleton",
    size === "small" && "h-10 w-10",
    size === "medium" && "h-15 w-15",
    size === "large" && "h-20 w-20"
  );

  return <div className={className} />;
};

export default SkeletonThumbnail;
