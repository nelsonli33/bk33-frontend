import React, { useMemo, useState } from "react";

import { Book, Chapter } from "../../../../../api/models/types";

import ContentTitle from "./components/ContentTitle";
import PageEditToolbar from "./components/PageEditToolbar";
import Catalog from "./components/Catalog";
import "tippy.js/themes/light-border.css";

export type SelectedItem = {
  bookId: number;
  chapterId: number;
  pageId: number;
  beforePageId: number;
  afterPageId: number;
  beforeChapterId: number;
  afterChapterId: number;
};
export interface PageEditLeftPanelProps {
  book: Book;
  pageId: number;
  toggleSideBar: () => void;
}

const PageEditLeftPanel = ({
  book,
  pageId,
  toggleSideBar,
}: PageEditLeftPanelProps) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();

  useMemo(() => {
    if (book && pageId > -1) {
      const { chapters } = book.toc;
      let item = getItem(chapters, pageId);
      setSelectedItem(item);
    }
  }, [book, pageId]);

  return (
    <div className="flex flex-col flex-1">
      <ContentTitle title={book?.title} toggleSideBar={toggleSideBar} />
      <PageEditToolbar bookId={book?.id} selectedItem={selectedItem} />
      <Catalog book={book} selectedItem={selectedItem} />
    </div>
  );
};

function getItem(chapters: Chapter[], pageId: number): SelectedItem {
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    const pages = chapter.pages;
    for (let j = 0; j < pages.length; j++) {
      const page = pages[j];

      if (page.id === pageId) {
        return {
          bookId: page.book_id,
          chapterId: page.chapter_id,
          pageId: page.id,
          beforePageId: page.id,
          afterPageId: j < pages.length - 1 ? pages[j + 1]?.id : null,
          beforeChapterId: chapter.id,
          afterChapterId: i < chapters.length - 1 ? chapters[i + 1]?.id : null,
        };
      }
    }
  }
}

export default React.memo(PageEditLeftPanel);
