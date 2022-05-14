import React, { Fragment, useEffect, useState, useMemo } from "react";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "../../../../../utilities/css";
import { ChevronRightIcon, PlusSmIcon } from "@heroicons/react/outline";
import { BsLayoutSidebar } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { Book } from "../../../../../api/models/types";
import { useRouter } from "next/router";
import { PageEditContext } from "../../../../../context/page-edit-context";
import { useContext } from "react";
import { useCreateChapter } from "../../../../../hooks/api/author/chapter";

type SelectedItem = {
  bookId: number;
  chapterId: number;
  pageId: number;
};
export interface PageEditCatalogProps {
  book: Book;
  pageId: number;
  toggleSideBar: () => void;
}

const PageEditCatalog = ({
  book,
  pageId,
  toggleSideBar,
}: PageEditCatalogProps) => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();
  const { isEditorFocus, setEditorFocusFalse } = useContext(PageEditContext);

  const { mutate: createChapter, isLoading: isCreateChapterLoading } =
    useCreateChapter(book.id);

  const toolbarItems = useMemo(() => {
    return [
      {
        name: "新增章節",
        onAction: ({ activeItem }: { activeItem: SelectedItem }) => {
          createChapter({
            title: "未命名分類",
            below_chapter_id: activeItem.chapterId,
          });
        },
      },
    ];
  }, []);

  useEffect(() => {
    if (book && pageId) {
      const currentChapterForPage = book?.toc?.chapters.find((c) =>
        c.pages.some((p) => p.id === pageId)
      );

      if (currentChapterForPage) {
        setSelectedItem({
          bookId: book.id,
          chapterId: currentChapterForPage.id,
          pageId: pageId,
        });
      }
    }
  }, [book, pageId]);

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

  const selectedClassName = twMerge(
    "bg-brand-green hover:bg-brand-green text-white font-medium rounded-tr rounded-br",
    isEditorFocus &&
      "bg-gray-300 hover:bg-gray-300 text-brand-black font-normal"
  );

  const catalogMarkup = (
    <div className="flex flex-col space-y-4 overflow-auto my-3 max-h-[calc(100vh_-_9rem)]">
      {book?.toc?.chapters.map((item) => (
        <Disclosure
          as="div"
          key={item.id}
          className="flex flex-col w-full space-y-1"
          defaultOpen={true}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className={twMerge(`flex items-center w-full px-3 py-0.5`)}
              >
                <span className="inline-block p-1 ml-[2.03px] mr-1">
                  <ChevronRightIcon
                    className={classNames(
                      open && "rotate-90",
                      "h-5 w-5  stroke-1 stroke-current "
                    )}
                  />
                </span>
                <span className="inline-flex flex-1 ">{item.title}</span>
              </Disclosure.Button>
              <Disclosure.Panel className="space-y-1 ml-7 mr-2 relative">
                <div className="border-r border-slate-300 -left-[0.453847px] w-px absolute inset-y-0 z-10"></div>
                {item?.pages.map((subItem) => (
                  <a
                    key={subItem.id}
                    className={twMerge(
                      "block  m-0 mr-2 px-4 py-2 text-sm text-brand-black hover:bg-gray-100 cursor-pointer",
                      selectedItem &&
                        selectedItem.pageId === subItem.id &&
                        selectedClassName
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setEditorFocusFalse();
                      setSelectedItem({
                        bookId: book.id,
                        chapterId: subItem.chapter_id,
                        pageId: subItem.id,
                      });
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

export default React.memo(PageEditCatalog);
