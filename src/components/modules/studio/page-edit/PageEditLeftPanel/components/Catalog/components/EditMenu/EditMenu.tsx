import React, { Fragment, useEffect } from "react";

import { Book } from "../../../../../../../../../api/models/types";
import { useCreateChapter } from "../../../../../../../../../hooks/api/author/chapter";
import { useAppDispatch } from "../../../../../../../../../store/hooks";
import {
  TrashIcon,
  PencilAltIcon,
  DocumentIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/outline";
import { showModal } from "../../../../../../../../../store/modal/slice";
import { MODAL_TYPES } from "../../../../../../../../elements/studio/Modal/StudioModalRoot";
import Divider from "../../../../../../../../elements/Divider";
import { twMerge } from "tailwind-merge";
import Spinner from "../../../../../../../../elements/Spinner";
import { ActiveItem } from "../../types";
import { useCreatePage } from "../../../../../../../../../hooks/api/author/page";

export interface EditMenuProps {
  book: Book;
  tippyJsInstance: React.MutableRefObject<any>;
  activeItem: ActiveItem;
}

const EditMenu = ({ book, tippyJsInstance, activeItem }: EditMenuProps) => {
  const dispatch = useAppDispatch();

  const {
    mutate: createChapter,
    isLoading: isCreateChapterLoading,
    isSuccess: isCreateChapterSuccess,
  } = useCreateChapter(book.id);

  const {
    mutate: createPage,
    isLoading: isCreatePageLoading,
    isSuccess: isCreatePageSuccess,
  } = useCreatePage();

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

  const menuItems = [
    {
      code: "newpage",
      name: "新增頁面",
      icon: DocumentIcon,
      isLoading: isCreatePageLoading,
      onAction: (activeItem: ActiveItem) => {
        if (activeItem.type === "page") {
          createPage({
            book_id: activeItem.bookId,
            chapter_id: activeItem.chapterId,
            title: "頁面",
            before_page_id: activeItem.beforePageId,
            after_page_id: activeItem.afterPageId,
          });
        }

        if (activeItem.type === "chapter") {
          createPage({
            book_id: activeItem.bookId,
            chapter_id: activeItem.id,
            title: "頁面",
            before_page_id: activeItem.beforePageId,
            after_page_id: activeItem.afterPageId,
          });
        }
      },
    },
    {
      code: "newchapter",
      name: "新增章節",
      icon: DocumentDuplicateIcon,
      isLoading: isCreateChapterLoading,
      onAction: (activeItem: ActiveItem) => {
        if (activeItem.type === "page") {
          createChapter({
            title: "未命名分類",
            before_chapter_id: activeItem.beforeChapterId,
            after_chapter_id: activeItem.afterChapterId,
          });
        }

        if (activeItem.type === "chapter") {
          createChapter({
            title: "未命名分類",
            before_chapter_id: activeItem.beforeChapterId,
            after_chapter_id: activeItem.afterChapterId,
          });
        }
      },
    },
    {
      code: "rename",
      name: "重新命名",
      icon: PencilAltIcon,
      onAction: (activeItem: ActiveItem) => {
        tippyJsInstance.current.hide();

        if (activeItem.type === "page") {
          dispatch(
            showModal({
              modalType: MODAL_TYPES.rename_page,
              modalProps: {
                page: activeItem,
              },
            })
          );
        }

        if (activeItem.type === "chapter") {
          dispatch(
            showModal({
              modalType: MODAL_TYPES.rename_chapter,
              modalProps: {
                chapter: activeItem,
              },
            })
          );
        }
      },
    },
    {
      code: "delete",
      name: "刪除",
      icon: TrashIcon,
      onAction: (activeItem: ActiveItem) => {
        tippyJsInstance.current.hide();

        if (activeItem.type === "page") {
          dispatch(
            showModal({
              modalType: MODAL_TYPES.delete_page,
              modalProps: {
                page: activeItem,
              },
            })
          );
        }

        if (activeItem.type === "chapter") {
          dispatch(
            showModal({
              modalType: MODAL_TYPES.delete_chapter,
              modalProps: {
                chapter: activeItem,
              },
            })
          );
        }
      },
    },
  ];

  return (
    <div>
      {menuItems.map((item) => (
        <Fragment key={item.code}>
          {item.code === "delete" && <Divider margin="my-0" />}
          <div
            className={twMerge(
              `flex justify-start items-center py-2 px-4 my-1 rounded hover:bg-gray-150 cursor-pointer`
            )}
            onClick={(e) => {
              stopPropagation(e);
              item.onAction(activeItem);
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
      ))}
    </div>
  );
};

function stopPropagation(event: React.MouseEvent<any>) {
  event.stopPropagation();
}

export default EditMenu;
