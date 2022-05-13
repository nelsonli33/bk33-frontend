import React from "react";

import StudioPage from "../../../../components/layouts/studio/StudioPage";
import ContentBasicForm from "../../../../components/modules/studio/content/ContentBasicForm";
import NewContentStepTabs from "../../../../components/modules/studio/content/NewContentStepTabs";
import StudioFrame from "../../../../components/modules/studio/home/StudioFrame";
import { useGetAuthorBookCategories } from "../../../../hooks/api/author/book-categories";

const NewContentEditBasic = () => {
  const { data: bookCategoryData, isLoading: isGetAuthorBookCategoryLoading } =
    useGetAuthorBookCategories();

  return (
    <StudioFrame title="新增內容">
      <StudioPage title="新增內容" backToUrl="/studio/contents" narrowWidth>
        <div className="mt-12 flex flex-col">
          <NewContentStepTabs step={1} />
          <ContentBasicForm
            allBookCategories={
              !isGetAuthorBookCategoryLoading && bookCategoryData.categories
            }
            isGetBookCategoriesLoading={isGetAuthorBookCategoryLoading}
          />
        </div>
      </StudioPage>
    </StudioFrame>
  );
};

export default NewContentEditBasic;
