import React from "react";
import Head from "next/head";
import TopBar from "../TopBar";
import { ModalRoot } from "../Modal";

const initHeaders = (
  <>
    <TopBar />
  </>
);
const initFooters = <></>;

export interface FrameProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  title: string;
}

export default function Frame({
  header = initHeaders,
  footer = initFooters,
  children,
  title,
}: FrameProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {header}
      <div>{children}</div>
      {footer}
      <ModalRoot />
    </>
  );
}
