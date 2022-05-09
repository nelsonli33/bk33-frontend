import React from "react";
import { twMerge } from "tailwind-merge";

interface PageProps {
  /** The content to display inside the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
}

const Page = ({ children, fullWidth }: PageProps) => {
  const pageClassName = twMerge(
    "flex max-w-5xl mx-auto py-14 px-2",
    fullWidth && "max-w-none w-full"
  );

  return <div className={pageClassName}>{children}</div>;
};

export default Page;
