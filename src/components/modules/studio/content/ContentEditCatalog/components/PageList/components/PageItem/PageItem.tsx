import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import React, { useCallback, useState } from "react";
import { Page } from "../../../../../../../../../api/models/types";
import { useCreatePage } from "../../../../../../../../../hooks/api/author/page";
import { useAppDispatch } from "../../../../../../../../../store/hooks";
import { showModal } from "../../../../../../../../../store/modal/slice";
import Button from "../../../../../../../../elements/Button";
import { DocumentAddBelowIcon } from "../../../../../../../../elements/Icon";
import Link from "../../../../../../../../elements/Link";
import { MODAL_TYPES } from "../../../../../../../../elements/studio/Modal/StudioModalRoot";
import PageRenameItem from "../PageRenameItem";

export interface PageItemProps {
  page: Page;
  beforePageId: number;
  afterPageId: number;
}

const PageItem = ({ page, beforePageId, afterPageId }) => {
  const [activeItem, setActiveItem] = useState<Page>();
  const dispatch = useAppDispatch();

  const { mutate: createPage, isLoading: isCreatePageLoading } =
    useCreatePage();

  const handleCancel = useCallback(() => {
    setActiveItem(null);
  }, []);

  const handleActiveItemChange = useCallback(() => {
    setActiveItem(page);
  }, []);

  const handleCreatePage = useCallback(() => {
    createPage({
      book_id: page.book_id,
      chapter_id: page.chapter_id,
      title: "頁面",
      before_page_id: beforePageId,
      after_page_id: afterPageId,
    });
  }, []);

  const handleDeletePage = useCallback(() => {
    dispatch(
      showModal({
        modalType: MODAL_TYPES.delete_page,
        modalProps: {
          page: {
            id: page.id,
            bookId: page.book_id,
            title: page.title,
          },
        },
      })
    );
  }, []);

  return (
    <>
      {activeItem && activeItem.id === page.id ? (
        <PageRenameItem page={page} onCancel={handleCancel} />
      ) : (
        <div className="flex items-center">
          <Link
            key={page.id}
            url={`/studio/contents/${page.book_id}/pages/${page.id}`}
            className="group w-full flex items-center text-brand-black rounded-md
hover:bg-gray-100  hover:border-1  text-overflow py-2 pl-11"
          >
            <span className="inline-block">{page.title}</span>
          </Link>

          <div className="inline-flex space-x-2.5 pr-5">
            <Button
              type="button"
              className="p-0 pl-3"
              onClick={handleActiveItemChange}
            >
              <PencilIcon className="w-5 h-5 hover:stroke-brand-green" />
            </Button>
            <Button
              type="button"
              className="p-0"
              loading={isCreatePageLoading}
              onClick={handleCreatePage}
            >
              <DocumentAddBelowIcon className="w-5 h-5 hover:stroke-brand-green" />
            </Button>

            <Button type="button" className="p-0" onClick={handleDeletePage}>
              <TrashIcon className="w-5 h-5 hover:stroke-destructive" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(PageItem);
