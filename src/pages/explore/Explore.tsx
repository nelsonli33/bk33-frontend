import React, { useState } from "react";
import Head from "next/head";
import TopBar from "../../components/TopBar";
import CategoryFilter from "./components/CategoryFilter";
import SecondCategoryFilter from "./components/SecondCategoryFilter";
import CatalogList from "../../components/CatalogList";

export default function Explore() {
  return (
    <div>
      <Head>
        <title>探索</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <TopBar />
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex my-10">
            <div className="flex-[0_0_auto] w-48 pr-8">
              <CategoryFilter />
            </div>
            <div className="flex-1 flex-col px-14">
              <SecondCategoryFilter />
              <CatalogList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
