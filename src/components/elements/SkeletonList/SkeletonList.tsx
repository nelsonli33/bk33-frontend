import React from "react";

export interface SkeletonListProps {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
}

const SkeletonList = ({ lines = 3 }: SkeletonListProps) => {
  const bodyItems = [];

  for (let i = 0; i < lines; i++) {
    bodyItems.push(<div className="skeleton h-4" key={i} />);
  }

  return <div className="space-y-6">{bodyItems}</div>;
};

export default SkeletonList;
