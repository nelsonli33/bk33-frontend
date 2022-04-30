import React from "react";
import Head from "next/head";
import SideNav from "../SideNav";

export interface StudioFrameProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  title: string;
}

export default function StudioFrame({
  header,
  children,
  title,
}: StudioFrameProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SideNav />

        {/* Main column */}
        <div className="md:pl-64 flex flex-col flex-1 h-full">
          <main className="flex-1">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 md:pb-12 ">
              <div>{children}</div>
            </section>
          </main>
        </div>

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