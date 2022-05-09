import React, { forwardRef, RefObject } from "react";
import NextLink from "next/link";

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  /** The url to link to */
  url?: string;
  /** The content to display inside the link */
  children?: React.ReactNode;
  /** Makes the link open in a new tab */
  external?: boolean;
}

const Link = forwardRef(
  (
    { url, children, external, ...rest }: LinkProps,
    ref: RefObject<HTMLAnchorElement>
  ) => {
    const target = external ? "_blank" : undefined;
    const rel = external ? "noopener noreferrer" : undefined;

    return (
      <NextLink href={url}>
        <a ref={ref} target={target} rel={rel} {...rest}>
          {children}
        </a>
      </NextLink>
    );
  }
);

export default Link;
