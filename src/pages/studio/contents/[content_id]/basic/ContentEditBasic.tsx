import { useRouter } from "next/router";
import React from "react";
import SkeletonBodyText from "../../../../../components/elements/SkeletonBodyText";
import SkeletonDisplayText from "../../../../../components/elements/SkeletonDisplayText";
import SkeletonTabs from "../../../../../components/elements/SkeletonTabs";
import SkeletonPage from "../../../../../components/layouts/studio/SkeletonPage";
import StudioPage from "../../../../../components/layouts/studio/StudioPage";
import ContentBasicForm from "../../../../../components/modules/studio/content/ContentBasicForm";
import NewContentStepTabs from "../../../../../components/modules/studio/content/NewContentStepTabs";
import StudioFrame from "../../../../../components/modules/studio/home/StudioFrame";
import { useGetBook } from "../../../../../hooks/api/author/book";
import { useGetAuthorBookCategories } from "../../../../../hooks/api/author/book-categories";

const ContentEditBasic = () => {
  const router = useRouter();
  const contentId = router.query?.content_id ? +router.query.content_id : 0;

  const { data: bookData, isLoading: isGetBookLoading } = useGetBook(contentId);
  const { data: bookCategoryData, isLoading: isGetAuthorBookCategoryLoading } =
    useGetAuthorBookCategories();

  if (isGetBookLoading || isGetAuthorBookCategoryLoading || contentId === 0) {
    return (
      <StudioFrame title="基本資訊">
        <SkeletonPage narrowWidth>
          <div className="mt-12 flex flex-col">
            <SkeletonTabs count={3} />
            <div className="mt-8 space-y-10">
              <div>
                <SkeletonDisplayText size="small" />
                <div className="mt-4">
                  <SkeletonBodyText />
                </div>
              </div>
              <div>
                <SkeletonDisplayText size="small" />
                <div className="mt-4">
                  <SkeletonBodyText />
                </div>
              </div>
            </div>
            <div className="mt-12">
              <SkeletonDisplayText />
            </div>
          </div>
        </SkeletonPage>
      </StudioFrame>
    );
  }

  return (
    <StudioFrame title={`${bookData.book.title} | 基本資訊`}>
      <StudioPage
        title={bookData.book.title}
        backToUrl="/studio/contents"
        narrowWidth
      >
        <div className="mt-12 flex flex-col">
          <NewContentStepTabs step={1} bookId={bookData.book.id} />
          <ContentBasicForm
            book={bookData.book}
            allBookCategories={bookCategoryData.categories}
          />
        </div>
      </StudioPage>
    </StudioFrame>
  );
};

export default ContentEditBasic;
