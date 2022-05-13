import React from "react";
import { twMerge } from "tailwind-merge";
import SkeletonBodyText from "../../../elements/SkeletonBodyText";
import SkeletonDisplayText from "../../../elements/SkeletonDisplayText";

export interface SkeletonPageProps {
  /** Page title, in large type */
  title?: string;
  /** Remove the normal max-width on the page */
  fullWidth?: boolean;
  /** Decreases the maximum layout width. Intended for single-column layouts */
  narrowWidth?: boolean;
  /** Shows a skeleton over the primary action */
  primaryAction?: boolean;
  /** Shows a skeleton over the breadcrumb */
  breadcrumbs?: boolean;

  /** The child elements to render in the skeleton page. */
  children?: React.ReactNode;
}

const SkeletonPage = ({
  children,
  fullWidth,
  narrowWidth,
  primaryAction,
  title = "",
  breadcrumbs,
}: SkeletonPageProps) => {
  const pageClassName = twMerge(
    "max-w-5xl mx-auto py-14 px-4 sm:px-6 lg:px-8",
    fullWidth && "max-w-none w-full",
    narrowWidth && "max-w-4xl"
  );

  const titleContent = title ? (
    <h1 className="text-3xl font-semibold">{title}</h1>
  ) : (
    <div className="skeleton max-w-[160px] h-8" />
  );

  const primaryActionMarkup = primaryAction ? (
    <div className="self-stretch">
      <SkeletonDisplayText size="large" />
    </div>
  ) : null;

  return (
    <div className={pageClassName}>
      <div className="flex flex-col">
        <div>
          {titleContent}
          {primaryActionMarkup}
        </div>
      </div>
      <>{children}</>
    </div>
  );
};

export default SkeletonPage;
