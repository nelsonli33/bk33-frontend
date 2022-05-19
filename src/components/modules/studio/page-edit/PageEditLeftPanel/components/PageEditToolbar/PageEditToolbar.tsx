import React, { Fragment, useContext, useEffect, useMemo, useRef } from "react";
import {
  DocumentDuplicateIcon,
  DocumentIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { useCreateChapter } from "../../../../../../../hooks/api/author/chapter";
import { SelectedItem } from "../../PageEditLeftPanel";
import { useCreatePage } from "../../../../../../../hooks/api/author/page";
import Tippy from "@tippyjs/react";
import { twMerge } from "tailwind-merge";
import Spinner from "../../../../../../elements/Spinner";
import { PageEditContext } from "../../../../../../../context/page-edit-context";

interface PageEditToolbarProps {
  bookId: number;
  selectedItem: SelectedItem;
}

const PageEditToolbar = ({ bookId, selectedItem }: PageEditToolbarProps) => {
  const tippyJsInstance = useRef() as any;

  const { setFrozenTrue, setFrozenFalse } = useContext(PageEditContext);

  const {
    mutate: createChapter,
    isLoading: isCreateChapterLoading,
    isSuccess: isCreateChapterSuccess,
  } = useCreateChapter(bookId);

  const {
    mutate: createPage,
    isLoading: isCreatePageLoading,
    isSuccess: isCreatePageSuccess,
  } = useCreatePage();

  const menuItems = [
    {
      code: "newpage",
      name: "新增頁面",
      icon: DocumentIcon,
      isLoading: isCreatePageLoading,
      onAction: () => {
        createPage({
          book_id: selectedItem.bookId,
          chapter_id: selectedItem.chapterId,
          title: "頁面",
          before_page_id: selectedItem.beforePageId,
          after_page_id: selectedItem.afterPageId,
        });
      },
    },
    {
      code: "newchapter",
      name: "新增章節",
      icon: DocumentDuplicateIcon,
      isLoading: isCreateChapterLoading,
      onAction: () => {
        createChapter({
          title: "未命名分類",
          before_chapter_id: selectedItem.beforeChapterId,
          after_chapter_id: selectedItem.afterChapterId,
        });
      },
    },
  ];

  useEffect(() => {
    if (isCreateChapterSuccess && !isCreateChapterLoading) {
      tippyJsInstance?.current?.hide();
    }

    if (isCreatePageSuccess && !isCreatePageLoading) {
      tippyJsInstance?.current?.hide();
    }
  }, [
    isCreateChapterSuccess,
    isCreateChapterLoading,
    isCreatePageSuccess,
    isCreatePageLoading,
  ]);

  const plusMenuMarkup = menuItems.map((item) => (
    <Fragment key={item.code}>
      <div
        className={twMerge(
          `flex justify-start items-center py-2 px-4 my-1 rounded hover:bg-gray-150 cursor-pointer`
        )}
        onClick={(e) => {
          e.stopPropagation();
          item.onAction();
        }}
      >
        <div className="inline-flex justify-center items-center pr-4">
          {item.isLoading ? (
            <Spinner className="fill-brand-green" />
          ) : (
            <item.icon className="w-5 h-5 stroke-1.5" />
          )}
        </div>
        <div className="font-medium">{item.name}</div>
      </div>
    </Fragment>
  ));

  return (
    <div className="flex justify-between items-center ml-5 mr-4 py-1">
      <div>
        <span className="text-[#42526E] font-medium">目錄</span>
      </div>
      <div className="flex space-x-2">
        <Tippy
          appendTo={() => document.body}
          content={plusMenuMarkup}
          duration={[200, 50]}
          placement={"bottom-start"}
          arrow={false}
          trigger="click"
          interactive={true}
          theme={"light-border"}
          offset={[0, 5]}
          className="min-w-[200px]"
          onTrigger={(instance) => {
            tippyJsInstance.current = instance;
            setFrozenTrue();
          }}
          onHidden={() => {
            tippyJsInstance.current = null;
            setFrozenFalse();
          }}
        >
          <div
            className={twMerge(
              "rounded p-1 hover:bg-gray-150 cursor-pointer",
              tippyJsInstance.current?.state.isVisible && "bg-gray-150"
            )}
          >
            <PlusIcon className="w-5 h-5 stroke-[1.5] text-[rgb(101,101,101)]" />
          </div>
        </Tippy>
      </div>
    </div>
  );
};

export default PageEditToolbar;
