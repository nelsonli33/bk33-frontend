import React from "react";
import { Book } from "../../../../../api/models/types";
import ChapterList from "./components/ChapterList";

interface ContentEditTocProps {
  book: Book;
}

const ContentEditCatalog = ({ book }: ContentEditTocProps) => {
  const { chapters } = book.toc;

  return (
    <>
      <div className="border border-gray-350 rounded p-4">
        <div className="space-y-4 ">
          <ChapterList chapters={chapters} />
        </div>
      </div>
    </>
  );
};

export default ContentEditCatalog;
