import React, { useCallback, useState, useEffect } from "react";

import { classNames } from "../../../../../../utilities/css";

import TiptapEditor from "../../../../../../components/elements/TiptapEditor";
import ContextualPageEditBar from "../../../../../../components/modules/studio/page-edit/ContextualPageEditBar";
import PageEditCatalog from "../../../../../../components/modules/studio/page-edit/PageEditCatalog";
import { useToggle } from "../../../../../../hooks/useToggle";
import { useRouter } from "next/router";
import { useGetBook } from "../../../../../../hooks/api/author/book";
import debounce from "debounce";
import {
  useGetPage,
  useSavePage,
} from "../../../../../../hooks/api/author/page";
import PageEditTitle from "../../../../../../components/modules/studio/page-edit/PageEditTitle";

const PageEdit = () => {
  const router = useRouter();

  const contentId = router.query?.content_id ? +router.query.content_id : 0;
  const pageId = router.query?.page_id ? +router.query.page_id : 0;

  const { data: bookData, isLoading: isGetBookLoading } = useGetBook(contentId);
  const { data: pageData, isLoading: isGetPageLoading } = useGetPage(
    contentId,
    pageId
  );

  const { mutate: savePage, isLoading: isSavePageLoading } = useSavePage(
    contentId,
    pageId
  );

  const { open, toggle } = useToggle(true);
  const leftPanelMarkup = (
    <div
      className={classNames(
        "hidden  md:fixed md:inset-y-0 md:w-76",
        open ? "md:flex md:flex-col" : "md:hidden"
      )}
    >
      <div
        className={classNames(
          "flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white"
        )}
      >
        {isGetBookLoading || !bookData ? null : (
          <PageEditCatalog book={bookData.book} toggleSideBar={toggle} />
        )}
      </div>
    </div>
  );

  const {
    open: isEditing,
    setTrue: setEditingTrue,
    setFalse: setEditingFalse,
  } = useToggle(false);
  const debounceAutoSave = useCallback(
    debounce((body) => {
      setEditingFalse();
      savePage({
        body,
      });
    }, 1000),
    []
  );

  const handlePageBodyUpdate = useCallback(({ editor }) => {
    setEditingTrue();
    const json = editor.getJSON();
    debounceAutoSave(JSON.stringify(json));
  }, []);

  const rightPanelMarkup = (
    <div
      className={classNames(" flex flex-col flex-1", open ? "pl-76" : "pl-0")}
    >
      {isGetBookLoading || !bookData ? null : (
        <ContextualPageEditBar
          sideBarOpen={open}
          toggleSideBar={toggle}
          isSaving={isSavePageLoading}
          isEditing={isEditing}
          bookId={bookData.book.id}
        />
      )}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:px-6 md:px-12 w-full">
        {isGetPageLoading || !pageData ? null : (
          <>
            <PageEditTitle
              savePage={savePage}
              title={pageData.page?.title}
              description={pageData.page?.description}
            />
            <div className="my-8">
              <TiptapEditor
                content={pageData.page?.body || ""}
                onUpdate={handlePageBodyUpdate}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );

  return (
    <div>
      {leftPanelMarkup}
      {rightPanelMarkup}
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }

        body {
          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default PageEdit;
