import { useRouter } from "next/router";
import React from "react";
import StudioPage from "../../../../../components/layouts/studio/StudioPage";
import ContentEditIntroForm from "../../../../../components/modules/studio/content/ContentEditIntroForm";
import NewContentStepTabs from "../../../../../components/modules/studio/content/NewContentStepTabs";
import StudioFrame from "../../../../../components/modules/studio/home/StudioFrame";
import { useGetBook } from "../../../../../hooks/api/author/book";

const ContentEditIntro = () => {
  const router = useRouter();
  const contentId = router.query?.content_id ? +router.query.content_id : 0;

  const { data, isLoading, isError } = useGetBook(contentId);

  if (isLoading || contentId === 0 || !data.book) {
    return null;
  }

  return (
    <StudioFrame title="測試標題">
      <StudioPage
        title={data.book.title}
        backToUrl="/studio/contents"
        narrowWidth
      >
        <div className="mt-12 flex flex-col">
          <NewContentStepTabs step={3} bookId={data.book.id} />
          <div className="mt-8">
            <ContentEditIntroForm book={data.book} />
          </div>
        </div>
      </StudioPage>
    </StudioFrame>
  );
};

export default ContentEditIntro;
