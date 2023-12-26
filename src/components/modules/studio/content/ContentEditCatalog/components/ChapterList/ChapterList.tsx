import React from "react";
import { Chapter } from "../../../../../../../api/models/types";
import ChapterItem from "./components/ChapterItem";

export interface ChapterListProps {
  chapters: Chapter[];
}

const ChapterList = ({ chapters }: ChapterListProps) => {
  return (
    <>
      {chapters.map((chapter) => (
        <ChapterItem chapter={chapter} key={chapter.id} />
      ))}
    </>
  );
};

// renderContainerDragOverlay(activeId)

export default ChapterList;
