import React from "react";
import { twMerge } from "tailwind-merge";
import Header, { HeaderProps } from "./components/Header";

interface StudioPageProps extends HeaderProps {
  /** The content to display inside the page */
  children?: React.ReactNode;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;

  narrowWidth?: boolean;
}

const StudioPage = ({
  children,
  fullWidth,
  narrowWidth,
  title,
  primaryAction,
  backToUrl,
}: StudioPageProps) => {
  const pageClassName = twMerge(
    "max-w-5xl mx-auto py-14 px-4 sm:px-6 lg:px-8",
    fullWidth && "max-w-none w-full",
    narrowWidth && "max-w-4xl"
  );

  return (
    <div className={pageClassName}>
      <div className="flex flex-col">
        <Header
          title={title}
          primaryAction={primaryAction}
          backToUrl={backToUrl}
        />
        {children}
      </div>
    </div>
  );
};

export default StudioPage;
