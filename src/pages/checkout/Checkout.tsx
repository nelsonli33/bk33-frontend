import React, { useState } from "react";
import Head from "next/head";
import TopBar from "../../components/TopBar";
import CheckoutInvoice from "./components/CheckoutInvoice";
import CheckoutProduct from "./components/CheckoutProduct";
import CheckoutPayment from "./components/CheckoutPayment";

export default function Checkout() {
  const checkoutPriceMarkup = (
    <div className="bg-white shadow rounded">
      <div className="py-2 grid grid-cols-[1fr_max-content_max-content] auto-rows-auto gap-x-3">
        <div className="flex items-center text-sm text-gray-500 col-start-2 col-end-3 row-start-1 row-end-2">
          商品總金額:
        </div>
        <div
          className="text-md text-gray-500 col-start-3 col-end-4 row-start-1 row-end-2 flex 
                items-center justify-end h-10 min-w-[145px] pl-3 pr-8"
        >
          NT$869
        </div>
        <div className="flex items-center text-sm text-gray-500 col-start-2 col-end-3 row-start-2 row-end-3">
          付款手續費:
        </div>
        <div
          className="text-md text-gray-500 col-start-3 col-end-4 row-start-2 row-end-3 flex 
                items-center justify-end h-10 min-w-[145px] pl-3 pr-8"
        >
          NT$30
        </div>
        <div className="flex items-center text-sm text-gray-500 col-start-2 col-end-3 row-start-3 row-end-4">
          總付款金額:
        </div>
        <div
          className="text-[28px] leading-8 text-red-600 col-start-3 col-end-4 row-start-3 row-end-4 flex 
                items-center justify-end h-10 min-w-[145px] pl-3 pr-8"
        >
          NT$899
        </div>
        <div className="col-start-1 col-end-4 row-start-4 row-end-5 flex justify-end items-center mt-2 min-h-[96px] border-t-2 border-dashed px-8">
          <button
            className="btn w-[203.8574px] bg-slate-900 shadow-1 transition text-white font-bold border border-solid border-transparent
          hover:bg-slate-700 focus:bg-slate-700 "
          >
            送出訂單
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Head>
        <title>結帳頁</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-light">
        <TopBar />
        <div className="flex min-h-screen h-full">
          <div className="max-w-4xl mx-auto w-full px-2 sm:px-6 lg:px-8">
            <div className="-mx-4 mt-10 mb-24 sm:-mx-6 md:mx-0 flex flex-col space-y-5">
              <CheckoutProduct />
              <CheckoutPayment />
              <CheckoutInvoice />
              {checkoutPriceMarkup}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
