import React, { useState, useEffect, useMemo } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { API_GET_CHAPTERS } from "../../../../../global/constants";

import { classNames } from "../../../../../utilities/css";

async function fetchData(setChapters) {
  const res = await fetch(API_GET_CHAPTERS);
  const data = await res.json();
  setChapters(data);
}

export default function ContentEditCatalog() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchData(setChapters);
  }, []);

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
              <ChevronRightIcon
                className={classNames(
                  open && "rotate-90",
                  "h-5 w-8 transform text-gray-600 transition-colors ease-in-out duration-150 stroke-1"
                )}
              />
              <span className="flex-1">{item.title}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-1">
              {item.lessons.map((subItem) => (
                <Disclosure.Button
                  key={subItem.id}
                  as="a"
                  href={"#"}
                  className="group w-full flex items-center text-brand-black rounded-md
                  hover:bg-gray-100  hover:border-1  whitespace-nowrap text-ellipsis overflow-hidden py-2 pl-11"
                >
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
    <>
      <div className="space-y-4 border border-brand-black rounded p-4 max-w-[683px]">
        {chapterMarkup}
      </div>
    </>
  );
}
