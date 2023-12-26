import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Chapter } from "../../../../../../../../../api/models/types";
import PageList from "../../../PageList";

export interface ChapterItem {
  chapter: Chapter;
}

const ChapterItem = ({ chapter }: ChapterItem) => {
  return (
    <Disclosure as="div" className="space-y-1" defaultOpen={true}>
      {({ open }) => (
        <>
          <Disclosure.Button
            as={"div"}
            className={twMerge(
              "bg-white text-brand-black hover:bg-gray-100 ",
              "group w-full flex items-center pl-2 pr-5 py-2 text-left font-medium rounded cursor-pointer"
            )}
          >
            <ChevronRightIcon
              className={twMerge(
                open && "rotate-90",
                "h-5 w-8 transform text-gray-600 transition-colors ease-in-out duration-150 stroke-1"
              )}
            />
            <span className="flex-1">{chapter.title}</span>
          </Disclosure.Button>
          <Disclosure.Panel className="space-y-1">
            <PageList pages={chapter.pages} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ChapterItem;
