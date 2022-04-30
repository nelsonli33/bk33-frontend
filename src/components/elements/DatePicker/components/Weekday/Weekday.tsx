import React, { memo } from "react";

import { classNames } from "../../../../../utilities/css";

export interface WeekdayProps {
  label: string;
  title: string;
  current: boolean;
}

export const Weekday = memo(function Weekday({
  label,
  title,
  current,
}: WeekdayProps) {
  const className = classNames(
    "bg-transparent p-2 text-base text-center ",
    current ? "font-bold text-brand-black" : "font-normal text-gray-500"
  );

  return (
    <th aria-label={label} scope="col" className={className}>
      {title}
    </th>
  );
});
