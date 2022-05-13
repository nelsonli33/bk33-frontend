import React from "react";
import { twMerge } from "tailwind-merge";
import SkeletonBodyText from "../SkeletonBodyText";
import SkeletonDisplayText from "../SkeletonDisplayText";

export interface SkeletonTabsProps {
  count?: number;
}
const SkeletonTabs = ({ count = 2 }: SkeletonTabsProps) => {
  return (
    <div className="flex w-full border-b border-gray-300">
      {[...Array(count).keys()].map((key) => {
        let tabWidthClassName = key % 2 === 0 ? "w-20" : "w-25";

        if (count === 3) {
          tabWidthClassName = "w-1/3";
        }

        return (
          <div
            key={key}
            className={twMerge("relative py-4 px-2", tabWidthClassName)}
          >
            <SkeletonBodyText lines={1} />
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonTabs;
