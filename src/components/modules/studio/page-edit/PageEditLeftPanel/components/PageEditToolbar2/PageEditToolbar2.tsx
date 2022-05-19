import React, { Fragment, useMemo } from "react";
import { PlusSmIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useCreateChapter } from "../../../../../../../hooks/api/author/chapter";
import { SelectedItem } from "../../PageEditLeftPanel";

interface PageEditToolbarProps {
  bookId: number;
  selectedItem: SelectedItem;
}

const PageEditToolbar = ({ bookId, selectedItem }: PageEditToolbarProps) => {
  const { mutate: createChapter, isLoading: isCreateChapterLoading } =
    useCreateChapter(bookId);

  const toolbarItems = useMemo(() => {
    return [
      {
        name: "新增章節",
        onAction: ({ activeItem }) => {
          console.log(activeItem);
          createChapter({
            title: "未命名分類",
            before_chapter_id: activeItem.chapterId,
          });
        },
      },
    ];
  }, []);

  return (
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
            <Menu.Items
              className="origin-top-right absolute right-0 translate-x-[81%]
               mt-2 -mr-1 w-56 rounded shadow-3 bg-white ring-1 ring-black 
            ring-opacity-5 focus:outline-none"
              static
            >
              <div className="py-1">
                {toolbarItems.map((item) => (
                  <Menu.Item key={item.name} as={Fragment}>
                    {({ active }) => (
                      <div
                        className={twMerge(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block py-2 px-4 cursor-pointer"
                        )}
                        onClick={() =>
                          item.onAction({ activeItem: selectedItem })
                        }
                      >
                        {item.name}
                      </div>
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
};

export default PageEditToolbar;
