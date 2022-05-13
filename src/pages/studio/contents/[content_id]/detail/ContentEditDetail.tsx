import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SkeletonList from "../../../../../components/elements/SkeletonList";
import SkeletonTabs from "../../../../../components/elements/SkeletonTabs";
import SkeletonPage from "../../../../../components/layouts/studio/SkeletonPage";

import StudioPage from "../../../../../components/layouts/studio/StudioPage";
import ContentEditCatalog from "../../../../../components/modules/studio/content/ContentEditCatalog";
import NewContentStepTabs from "../../../../../components/modules/studio/content/NewContentStepTabs";
import StudioFrame from "../../../../../components/modules/studio/home/StudioFrame";
import { useGetBook } from "../../../../../hooks/api/author/book";

const ContentEditDetail = () => {
  const router = useRouter();
  const contentId = router.query?.content_id ? +router.query.content_id : 0;

  const { data, isLoading, isError } = useGetBook(contentId);

  const skeletonMarkup =
    isLoading || !data ? (
      <SkeletonPage narrowWidth>
        <div className="mt-12 flex flex-col">
          <SkeletonTabs count={3} />
          <div className="mt-8 border border-gray-350 rounded py-8 px-12">
            <SkeletonList lines={5} />
          </div>
        </div>
      </SkeletonPage>
    ) : null;

  return (
    <StudioFrame title="測試標題">
      {skeletonMarkup ?? (
        <StudioPage
          title={data.book.title}
          backToUrl="/studio/contents"
          narrowWidth
        >
          <div className="mt-12 flex flex-col">
            <NewContentStepTabs step={2} bookId={data.book.id} />
            <div className="mt-8">
              <ContentEditCatalog book={data.book} />
            </div>
          </div>
        </StudioPage>
      )}
    </StudioFrame>
  );
};

export default ContentEditDetail;
