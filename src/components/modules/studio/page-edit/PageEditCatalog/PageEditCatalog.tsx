import React, { Fragment, useState } from "react";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "../../../../../utilities/css";
import { ChevronRightIcon, PlusSmIcon } from "@heroicons/react/outline";
import { BsLayoutSidebar } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import Link from "../../../../elements/Link";
import { Book } from "../../../../../api/models/types";
import { useRouter } from "next/router";

const items = [{ name: "新增群組", href: "#" }];

export interface PageEditCatalogProps {
  book: Book;
  toggleSideBar: () => void;
}

const PageEditCatalog = ({ book, toggleSideBar }: PageEditCatalogProps) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<any>();

  const contentTitleMarkup = (
    <div className="flex items-center h-16 ">
      <div className="pl-3">
        <button
          className="py-0 px-2 h-8 leading-8 text-gray-500 
      hover:text-brand-black hover:bg-gray-150 rounded"
          onClick={toggleSideBar}
        >
          <BsLayoutSidebar className="w-5 h-5" />
        </button>
      </div>
      <h3 className="text-xl leading-8 flex-1 pl-3">{book?.title}</h3>
    </div>
  );

  const pageEditToolbarMarkup = (
    <div className="flex justify-end px-6 space-x-0.5 py-2 z-20">
      <span className="relative inline-flex w-full">
        <button
          type="button"
          className="relative inline-flex items-center px-4 py-2 btn-primary rounded-none rounded-l w-full"
        >
          <PlusSmIcon className="w-5 h-5" />
          新增頁面
        </button>
        <Menu as="span" className="-ml-px relative block">
          <Menu.Button className="relative inline-flex items-center px-2 py-2 btn-primary rounded-none rounded-r border-l border-l-white text-sm ">
            <span className="sr-only">開啟選單</span>
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 -mr-1 w-56 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {items.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </span>
    </div>
  );

  const catalogMarkup = (
    <div className="flex flex-col space-y-4 overflow-auto my-3 max-h-[calc(100vh_-_9rem)]">
      {book?.toc?.chapters.map((item) => (
        <Disclosure
          as="div"
          key={item.title}
          className="space-y-1"
          defaultOpen={true}
        >
          {({ open }) => (
            <>
              <div
                className={twMerge(
                  `w-full flex items-center px-3 py-2 text-left text-brand-black hover:bg-gray-100 cursor-default`,
                  activeItem &&
                    activeItem.type === "chapter" &&
                    activeItem.id === item.id &&
                    "bg-gray-150 hover:bg-gray-150"
                )}
                onClick={() => setActiveItem({ ...item, type: "chapter" })}
              >
                <Disclosure.Button className="p-1 ml-[2.23px] mr-1">
                  <ChevronRightIcon
                    className={classNames(
                      open && "rotate-90",
                      "h-5 w-5 transform text-gray-600 transition-colors ease-in-out duration-150 stroke-1"
                    )}
                  />
                </Disclosure.Button>
                <span>{item.title}</span>
              </div>
              <Disclosure.Panel className="space-y-1 ml-7 relative">
                <div className="border-r border-slate-300 -left-[0.453847px] w-px absolute inset-y-0 z-10"></div>
                {item?.pages.map((subItem) => (
                  <a
                    key={subItem.title}
                    className={twMerge(
                      "group w-full flex items-center px-6 py-2 text-sm text-brand-black hover:bg-gray-100 cursor-pointer",
                      activeItem &&
                        activeItem.type === "page" &&
                        activeItem.id === subItem.id &&
                        "bg-gray-150 hover:bg-gray-150"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveItem({ ...subItem, type: "page" });
                      router.push({
                        pathname: `/studio/contents/[content_id]/pages/[page_id]`,
                        query: {
                          content_id: subItem.book_id,
                          page_id: subItem.id,
                        },
                      });
                    }}
                  >
                    {subItem.title}
                  </a>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col flex-1">
      {contentTitleMarkup}
      {pageEditToolbarMarkup}
      {catalogMarkup}
    </div>
  );
};

export default PageEditCatalog;
