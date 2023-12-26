import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_GET_BOOK } from "../../../global/constants";

async function fetchData(setBooks) {
  const res = await fetch(API_GET_BOOK);
  const data = await res.json();
  setBooks(data.books);
}

export default function CatalogList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchData(setBooks);
  }, []);

  const itemList = books.map((book) => (
    <>
      <div>
        <div className="flex w-full h-full">
          <div className="flex-[0_0_112.5px]">
            <Link href={`/book`}>
              <a
                href="#"
                className="block group relative w-full  overflow-hidden h-auto after:content-[''] after:transition
        after:absolute after:inset-0 after:z-20 after:h-full after:w-full after:bg-black after:opacity-[0%] hover:after:opacity-[15%]"
              >
                <div className="max-w-[100px] mx-auto">
                  <img
                    src="https://avenuesingapore.com/wp-content/uploads/2019/09/AVENUE-HALLOWEEN-20191026-KV-1080x1350.jpg"
                    className="rounded"
                  />
                </div>
              </a>
            </Link>
          </div>
          <div className="flex-[1_1_0%] mx-6 flex flex-col justify-between">
            <div>
              <div className="pb-2">
                <h2 className="text-[19px] leading-5 font-bold">
                  {book.title}
                </h2>
              </div>
              <div>
                <p className="text-sm text-gray-600">{book.subtitle}</p>
              </div>
              <div className="mt-1">
                <span className="text-sm text-gray-800">
                  王磊 (Thoughtworks 中國區 CTO)
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center mt-1">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-5 h-5 text-gray-300 dark:text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.95 (1862)
                </span>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500">{`${
                  book.reading_count != undefined ? book.reading_count : 10
                } 人閱讀`}</span>
              </div>
            </div>
          </div>
          <div className="flex-[0_0_100px]">
            <span className="text- font-bold text-gray-900 ">
              {`NT$${book.price}`}
            </span>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white text-sm text-gray-500"></span>
        </div>
      </div>
    </>
  ));

  return <div className="space-y-7">{itemList}</div>;
}
