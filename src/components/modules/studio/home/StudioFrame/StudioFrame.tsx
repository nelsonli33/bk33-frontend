import React from "react";
import Head from "next/head";
import SideNav from "../SideNav";
import StudioModalRoot from "../../../../elements/studio/Modal/StudioModalRoot";

export interface StudioFrameProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  title: string;
  /** show empty content frame */
  empty?: boolean;
}

export default function StudioFrame({
  header,
  children,
  title,
  empty,
}: StudioFrameProps) {
  const mainMarkup = !empty ? (
    <>
      <SideNav />
      {/* Main column */}
      <div className="md:pl-64 flex flex-col flex-1 h-full">
        <main className="flex-1 relative">{children}</main>
      </div>
    </>
  ) : (
    children
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {mainMarkup}
        <StudioModalRoot />

        <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }

          body {
            background-color: #ffffff;
          }
        `}</style>
      </div>
    </>
  );
}
