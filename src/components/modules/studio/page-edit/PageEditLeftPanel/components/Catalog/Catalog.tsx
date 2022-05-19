import React, { useContext, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import Tippy, { useSingleton } from "@tippyjs/react";
import { useRouter } from "next/router";

import { twMerge } from "tailwind-merge";

import { Book, Chapter } from "../../../../../../../api/models/types";
import { PageEditContext } from "../../../../../../../context/page-edit-context";
import { SelectedItem } from "../../PageEditLeftPanel";
import EditMenu from "./components/EditMenu";
import { ActiveItem } from "./types";

interface CatalogProps {
  book: Book;
  selectedItem: SelectedItem;
}

const Catalog = ({ book, selectedItem }: CatalogProps) => {
  const router = useRouter();
  const { setFrozenTrue, setFrozenFalse, isEditorFocus, setEditorFocusFalse } =
    useContext(PageEditContext);

  const [source, target] = useSingleton();
  const tippyJsInstance = useRef() as any;
  const mountedRef = useRef() as any;
  const [activeItem, setActiveItem] = useState<ActiveItem>();
  const allChapters = book?.toc?.chapters;

  const handlePageClick = (event, page) => {
    event.preventDefault();
    event.stopPropagation();

    setEditorFocusFalse();

    router.push({
      pathname: `/studio/contents/[content_id]/pages/[page_id]`,
      query: {
        content_id: page.book_id,
        page_id: page.id,
      },
    });
  };

  // "bg-brand-green hover:bg-brand-green text-white font-medium",
  //   isEditorFocus &&
  //     "bg-gray-300 hover:bg-gray-300 text-brand-black font-normal"

  const selectedClassName = twMerge(
    "bg-gray-150 hover:bg-gray-150 text-brand-black font-medium border-l-volcano",
    isEditorFocus && "text-brand-black font-normal before:bg-gray-500"
  );

  const renderChpaterTitleMarkup = (
    item: Chapter,
    itemIndex: number,
    open: boolean
  ) => {
    const isActiveChapterItem =
      activeItem && activeItem.type === "chapter" && activeItem.id === item.id;

    const pagesForCurrentChapter = book?.toc?.chapters[itemIndex].pages;

    return (
      <Disclosure.Button
        className={twMerge(
          `flex items-center justify-between ml-3 mr-4 py-1 rounded group relative`,
          isActiveChapterItem &&
            "outline-dashed outline-2 outline-brand-green-400"
        )}
      >
        <div className="flex items-center">
          <span className="inline-block p-1 ml-[2.03px] mr-1">
            <ChevronRightIcon
              className={twMerge(
                open && "rotate-90",
                "h-5 w-5  stroke-1 stroke-current"
              )}
            />
          </span>
          <span>{item.title}</span>
        </div>

        <Tippy
          content={
            isActiveChapterItem ? (
              <EditMenu
                activeItem={activeItem}
                book={book}
                tippyJsInstance={tippyJsInstance}
              />
            ) : (
              ""
            )
          }
          singleton={target}
          onClickOutside={(instance) => {
            instance.hide();
          }}
        >
          <div
            className={twMerge(
              "pr-2 opacity-0 group-hover:opacity-100",
              isActiveChapterItem && "opacity-100"
            )}
            onClick={(e) => {
              stopPropagation(e);
              setActiveItem({
                type: "chapter",
                id: item.id,
                bookId: item.book_id,
                title: item.title,
                beforePageId:
                  pagesForCurrentChapter.length > 0
                    ? pagesForCurrentChapter[pagesForCurrentChapter.length - 1]
                        .id
                    : null,
                afterPageId: null,
                beforeChapterId: item.id,
                afterChapterId:
                  itemIndex < book?.toc?.chapters.length - 1
                    ? book?.toc?.chapters[itemIndex + 1]?.id
                    : null,
              });
            }}
          >
            <DotsVerticalIcon className="w-4 h-4 stroke-1" />
          </div>
        </Tippy>
      </Disclosure.Button>
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-4 my-3 py-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh_-_9rem)] z-10">
        {book?.toc?.chapters.map((item, itemIndex) => (
          <Disclosure
            as="div"
            key={item.id}
            className={twMerge("flex flex-col w-full space-y-1")}
            defaultOpen={true}
          >
            {({ open }) => (
              <>
                {renderChpaterTitleMarkup(item, itemIndex, open)}

                <Disclosure.Panel className="space-y-1 ml-7 mr-4 relative">
                  <div className="border-r border-slate-300 -left-[0.453847px] w-px absolute inset-y-0 z-10"></div>
                  {item?.pages.map((subItem, subItemIndex) => {
                    const isActivePageItem =
                      activeItem &&
                      activeItem.type === "page" &&
                      activeItem.id === subItem.id;

                    return (
                      <div
                        key={subItem.id}
                        className={twMerge(
                          `flex items-center justify-between group relative
                    m-0 pl-5 pr-2 py-2  text-sm text-brand-black hover:bg-gray-150 cursor-pointer
                    rounded-tr rounded-br`,
                          selectedItem &&
                            selectedItem.pageId === subItem.id &&
                            selectedClassName,
                          isActivePageItem &&
                            "outline-dashed outline-2 outline-brand-green-400 "
                        )}
                        onClick={(e) => handlePageClick(e, subItem)}
                      >
                        <div className="mr-2">{subItem.title}</div>

                        <Tippy
                          content={
                            isActivePageItem ? (
                              <EditMenu
                                activeItem={activeItem}
                                book={book}
                                tippyJsInstance={tippyJsInstance}
                              />
                            ) : (
                              ""
                            )
                          }
                          singleton={target}
                          onClickOutside={(instance) => {
                            instance.hide();
                          }}
                        >
                          <div
                            className={twMerge(
                              "pl-2 opacity-0 group-hover:opacity-100",
                              isActivePageItem && "opacity-100"
                            )}
                            onClick={(e) => {
                              stopPropagation(e);
                              setActiveItem({
                                type: "page",
                                id: subItem.id,
                                bookId: subItem.book_id,
                                chapterId: subItem.chapter_id,
                                title: subItem.title,
                                beforePageId: subItem.id,
                                afterPageId:
                                  subItemIndex < item?.pages.length - 1
                                    ? item?.pages[subItemIndex + 1]?.id
                                    : null,
                                beforeChapterId: item.id,
                                afterChapterId:
                                  itemIndex < allChapters.length - 1
                                    ? allChapters[itemIndex + 1]?.id
                                    : null,
                              });
                            }}
                          >
                            <DotsVerticalIcon className="w-4 h-4 stroke-1" />
                          </div>
                        </Tippy>
                      </div>
                    );
                  })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>

      <Tippy
        appendTo={() => document.body}
        onTrigger={(instance, event) => {
          tippyJsInstance.current = instance;
          mountedRef.current = event.currentTarget;
          setFrozenTrue();
        }}
        getReferenceClientRect={() =>
          mountedRef.current.getBoundingClientRect()
        }
        onHidden={() => {
          tippyJsInstance.current = null;
          setActiveItem(null);
          setFrozenFalse();
        }}
        duration={[200, 50]}
        singleton={source}
        placement={"bottom-start"}
        arrow={false}
        trigger="click"
        interactive={true}
        theme={"light-border"}
        offset={[10, 15]}
        className="min-w-[240px]"
      />
    </>
  );
};

function stopPropagation(event: React.MouseEvent<any>) {
  event.stopPropagation();
}

export default Catalog;
