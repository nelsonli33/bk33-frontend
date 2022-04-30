import React, { Fragment } from "react";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "../../../../../utilities/css";
import { ChevronRightIcon, PlusSmIcon } from "@heroicons/react/outline";
import { BsLayoutSidebar } from "react-icons/bs";

const catalog = [
  {
    name: "基本原理：為何細微改變",
    current: false,
    children: [
      { name: "1 原子習慣的驚人力量", href: "#" },
      { name: "2 改變習慣最有效的方法，是改變身分認同", href: "#" },
      { name: "3 四個簡單的步驟，讓你建立更好的習慣", href: "#" },
    ],
  },
  {
    name: "法則1：讓提示顯而易見",
    current: true,
    children: [
      { name: "4 行為改變的過程始於覺察", href: "#" },
      { name: "5 開始一個新習慣最好的方法", href: "#" },
      { name: "6 激勵被高估了，環境往往更重要", href: "#" },
      { name: "7 自制力的祕密", href: "#" },
    ],
  },
  {
    name: "法則2：讓習慣有吸引力",
    current: false,
    children: [
      { name: "8 如何讓習慣變得難以抗拒", href: "#" },
      { name: "9 家人與朋友如何形塑你的習慣", href: "#" },
      { name: "10 如何找出並解決壞習慣的成因", href: "#" },
    ],
  },
  {
    name: "法則3：讓行動輕而易舉",
    current: false,
    children: [
      { name: "11 精通習慣由重複開始，而非完美", href: "#" },
      { name: "12 最小努力原則", href: "#" },
      { name: "13 如何運用「兩分鐘法則」停止拖延", href: "#" },
      { name: "14 如何讓好習慣變得無可避免，讓壞習慣不可能發生", href: "#" },
    ],
  },
];

const items = [{ name: "新增群組", href: "#" }];

export default function PageEditCatalog({ toggleSideBar }) {
  const contentTitleMarkup = (
    <div className="flex items-start mt-7 mb-3">
      <div className="pl-3">
        <button
          className="py-0 px-2 h-8 leading-8 text-gray-500 
      hover:text-brand-black hover:bg-gray-150 rounded"
          onClick={toggleSideBar}
        >
          <BsLayoutSidebar className="w-5 h-5" />
        </button>
      </div>
      <h3 className="text-xl leading-8 flex-1 pl-3">原子習慣</h3>
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
      {catalog.map((item) => (
        <Disclosure
          as="div"
          key={item.name}
          className="space-y-1"
          defaultOpen={true}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className={classNames(
                  "bg-white text-brand-black hover:bg-gray-100 ",
                  "group w-full flex items-center px-3 py-2 text-left rounded-md"
                )}
              >
                <ChevronRightIcon
                  className={classNames(
                    open && "rotate-90",
                    "h-5 w-8 transform text-gray-600 transition-colors ease-in-out duration-150 stroke-1"
                  )}
                />
                <span>{item.name}</span>
              </Disclosure.Button>
              <Disclosure.Panel className="space-y-1 ml-7 relative">
                <div className="border-r border-slate-300 -left-[0.453847px] w-px absolute inset-y-0 z-10"></div>
                {item.children.map((subItem) => (
                  <Disclosure.Button
                    key={subItem.name}
                    as="a"
                    href={subItem.href}
                    className="group w-full flex items-center px-6 py-2 text-sm text-brand-black
                       hover:bg-gray-100"
                  >
                    {subItem.name}
                  </Disclosure.Button>
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
}
