import React from "react";
import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  size?: "large" | "small";
  className?: string;
  primary?: boolean;
}

const Spinner = ({ size, className, primary }: SpinnerProps) => {
  const spinnerSVGMarkup =
    size === "large" ? (
      <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z" />
      </svg>
    ) : (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z" />
      </svg>
    );

  const svgClassName = twMerge(
    size === "large" ? "w-11 h-11" : "w-5 h-5",
    primary ? "fill-gray-200" : "fill-brand-black",
    "animate-spin-fast inline-block",
    className
  );

  return <span className={svgClassName}>{spinnerSVGMarkup}</span>;
};

export default Spinner;
