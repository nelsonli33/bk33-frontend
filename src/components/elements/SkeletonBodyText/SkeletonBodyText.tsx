import React from "react";

export interface SkeletonBodyTextProps {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
}

const SkeletonBodyText = ({ lines = 3 }: SkeletonBodyTextProps) => {
  const bodyTextLines = [];

  for (let i = 0; i < lines; i++) {
    bodyTextLines.push(
      <div className="skeleton h-2 last-not-first:w-4/5 " key={i} />
    );
  }

  return <div className="space-y-3">{bodyTextLines}</div>;
};

export default SkeletonBodyText;
