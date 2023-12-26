import React from "react";
import { Page } from "../../../../../../../api/models/types";
import PageItem from "./components/PageItem";
export interface PageListProps {
  pages: Page[];
}

const PageList = ({ pages }: PageListProps) => {
  return (
    <>
      {pages.map((page, index) => {
        const beforePageId = page.id;
        const afterPageId =
          index < pages.length - 1 ? pages[index + 1]?.id : null;

        return (
          <PageItem
            key={page.id}
            page={page}
            beforePageId={beforePageId}
            afterPageId={afterPageId}
          />
        );
      })}
    </>
  );
};

export default PageList;
