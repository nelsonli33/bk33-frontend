import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { classNames } from "../../../../../utilities/css";
const treeData = [
  {
    chapterId: 1,
    chapterTitle: "我們如何記憶",
    pages: [
      {
        pageId: 1,
        pageTitle: "1. 記憶如何形成",
      },
      {
        pageId: 2,
        pageTitle: "2. 有注意力，才能記憶",
      },
    ],
  },
  {
    chapterId: 2,
    chapterTitle: "我們為何遺忘",
    pages: [
      {
        pageId: 3,
        pageTitle: "3. 記憶會一直改變，不斷更新",
      },
      {
        pageId: 4,
        pageTitle: "4. 話到嘴邊卻想不起來",
      },
    ],
  },
];

export default function Catalog() {
  const plusIconMarkup = (
    <div className="flex justify-center items-center w-[14px] h-[14px] invisible group-hover:visible">
      <PlusIcon width={14} height={14} className="text-gray-400" />
    </div>
  );

  return (
    <div className="pl-2">
      <div className="py-2">
        {treeData.map((chapter, index) => (
          <Disclosure
            as="div"
            key={chapter.chapterId}
            defaultOpen={true}
            className="my-2"
          >
            {({ open }) => (
              <>
                <Disclosure.Button
                  as="div"
                  className="cursor-pointer flex flex-row items-center px-4 py-2 group"
                >
                  <div className="text-base text-weak flex-1 text-[17px]">
                    {`第 ${index + 1} 章 ${chapter.chapterTitle}`}
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    {plusIconMarkup}
                    <div className="flex justify-center items-center w-[18px] h-[18px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={classNames(
                          open && "rotate-90",
                          "h-6 w-6 transform text-gray-400 transition-colors ease-in-out duration-150"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel as="div" className="ml-6">
                  {chapter.pages.map((page) => (
                    <div
                      className="flex flex-row items-center px-4 py-2 group"
                      key={page.pageId}
                    >
                      <Disclosure.Button
                        as="a"
                        href={"#"}
                        className="flex-1 text-base text-weak  hover:text-gray-900 hover:bg-gray-50"
                      >
                        {page.pageTitle}
                      </Disclosure.Button>
                      {plusIconMarkup}
                    </div>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
