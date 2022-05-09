import React from "react";

export interface CaptionProps {
  /** The content to use as a graph label or timestamp */
  children?: React.ReactNode;
}

const Caption = ({ children }: CaptionProps) => {
  return <p className="m-0 text-gray-500 text-sm">{children}</p>;
};

export default Caption;
