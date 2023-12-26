import React, { useState, useEffect, useMemo } from "react";
import { API_GET_CHAPTERS } from "../../../../global/constants";

import { Disclosure } from "@headlessui/react";
import { classNames } from "../../../../utilities/css";
import { LockIcon } from "../../../elements/Icon";

async function fetchData(setChapters) {
  const res = await fetch(API_GET_CHAPTERS);
  const data = await res.json();
  setChapters(data.book.toc.chapters);
}

export default function TableOfContent() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchData(setChapters);
  }, []);

  console.log(chapters);

  // const chapterMarkup = useMemo(
  //   () =>
  //     chapters.map((ch) => (
  //       <Collapsible key={ch.id} title={ch.title}>
  //         {ch.lessons.map((lesson) => (
  //           <div key={lesson.id} className="pl-6 pr-5 py-1 cursor-pointer">
  //             <div className="flex items-start py-1 px-2">
  //               <div className="pr-4">
  // <Image src="/icons/icons8-lock.svg" height={22} width={19} />
  //               </div>
  //               <span className="text-base font-normal">{lesson.title}</span>
  //             </div>
  //           </div>
  //         ))}
  //       </Collapsible>
  //     )),
  //   [chapters]
  // );

  const chapterMarkup = useMemo(() => {
    return chapters.map((item) => (
      <Disclosure
        as="div"
        key={item.id}
        className="space-y-1"
        defaultOpen={true}
      >
        {({ open }) => (
          <>
            <Disclosure.Button
              className={classNames(
                "bg-white text-brand-black hover:bg-gray-100 ",
                "group w-full flex items-center pl-2 pr-1 py-2 text-left font-medium rounded-md"
              )}
            >
              <span className="flex-1">{item.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className={classNames(
                  open ? "text-gray-400 rotate-90" : "text-gray-300",
                  "ml-3 flex-shrink-0 h-6 w-6 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-1">
              {item.pages.map((subItem) => (
                <Disclosure.Button
                  key={subItem.id}
                  as="a"
                  href={"#"}
                  className="group w-full flex items-center p-2 text-brand-black rounded-md
                  hover:bg-gray-100  hover:border-1  whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  <div className="pr-4">
                    <LockIcon height={22} width={19} />
                  </div>
                  {subItem.title}
                </Disclosure.Button>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ));
  }, [chapters]);

  return (
    <div>
      <h3 className="mt-6 mb-3">目錄</h3>
      <div className="space-y-4">{chapterMarkup}</div>
    </div>
  );
}
