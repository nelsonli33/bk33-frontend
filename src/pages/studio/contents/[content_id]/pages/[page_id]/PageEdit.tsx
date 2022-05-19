import React, { useCallback } from "react";

import ContextualPageEditBar from "../../../../../../components/modules/studio/page-edit/ContextualPageEditBar";

import { useToggle } from "../../../../../../hooks/use-toggle";
import { useRouter } from "next/router";
import { useGetBook } from "../../../../../../hooks/api/author/book";
import debounce from "debounce";
import {
  useGetPage,
  useSavePage,
} from "../../../../../../hooks/api/author/page";
import PageEditTitle from "../../../../../../components/modules/studio/page-edit/PageEditTitle";
import { PageEditContext } from "../../../../../../context/page-edit-context";
import PageEditLeftPanel from "../../../../../../components/modules/studio/page-edit/PageEditLeftPanel";
import PageBodyEditor from "../../../../../../components/modules/studio/page-edit/PageBodyEditor";
import { twMerge } from "tailwind-merge";
import StudioFrame from "../../../../../../components/modules/studio/home/StudioFrame";

const PageEdit = () => {
  const router = useRouter();

  const contentId = router.query?.content_id ? +router.query.content_id : 0;
  const pageId = router.query?.page_id ? +router.query.page_id : 0;

  const { data: bookData, isLoading: isGetBookLoading } = useGetBook(contentId);
  const { data: pageData, isLoading: isGetPageLoading } = useGetPage(pageId);
  const { mutate: savePage, isLoading: isSavePageLoading } =
    useSavePage(pageId);

  const { open, toggle } = useToggle(true);

  const {
    open: isEditing,
    setTrue: setEditingTrue,
    setFalse: setEditingFalse,
  } = useToggle(false);

  const {
    open: isEditorFocus,
    setTrue: setEditorFocusTrue,
    setFalse: setEditorFocusFalse,
  } = useToggle(false);

  const {
    open: frozen,
    setTrue: setFrozenTrue,
    setFalse: setFrozenFalse,
  } = useToggle(false);

  const leftPanelMarkup = (
    <div
      className={twMerge(
        "hidden  md:fixed md:inset-y-0 md:w-76",
        open ? "md:flex md:flex-col" : "md:hidden"
      )}
    >
      <div
        className={twMerge(
          "flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white"
        )}
      >
        {isGetBookLoading || !bookData || pageId === 0 ? null : (
          <PageEditLeftPanel
            book={bookData.book}
            pageId={pageId}
            toggleSideBar={toggle}
          />
        )}
      </div>
    </div>
  );

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
      className={twMerge(
        "flex flex-col flex-1 min-h-full pl-0",
        open ? "sm:pl-76" : "sm:pl-0"
      )}
    >
      {isGetBookLoading || contentId === 0 ? null : (
        <ContextualPageEditBar
          sideBarOpen={open}
          toggleSideBar={toggle}
          isSaving={isSavePageLoading}
          bookId={contentId}
        />
      )}
      <main className="max-w-3xl mx-auto px-4 py-12 sm:px-6 md:px-11 w-full">
        {isGetPageLoading || !pageData ? null : (
          <>
            <PageEditTitle
              savePage={savePage}
              title={pageData.page?.title}
              description={pageData.page?.description}
            />
            <div className="my-6">
              <PageBodyEditor
                pageId={pageId}
                content={pageData.page?.body || ""}
                onUpdate={handlePageBodyUpdate}
                onFocus={setEditorFocusTrue}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );

  return (
    <StudioFrame title="" empty>
      <PageEditContext.Provider
        value={{
          isEditing,
          setEditingTrue,
          setEditingFalse,
          isEditorFocus,
          setEditorFocusTrue,
          setEditorFocusFalse,
          frozen,
          setFrozenTrue,
          setFrozenFalse,
        }}
      >
        {leftPanelMarkup}
        {rightPanelMarkup}
        {frozen && <div className="overlay"></div>}

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
      </PageEditContext.Provider>
    </StudioFrame>
  );
};

export default PageEdit;
