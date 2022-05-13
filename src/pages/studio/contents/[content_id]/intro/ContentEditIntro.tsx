import React from "react";
import StudioPage from "../../../../../components/layouts/studio/StudioPage";
import ContentEditIntroForm from "../../../../../components/modules/studio/content/ContentEditIntroForm";
import NewContentStepTabs from "../../../../../components/modules/studio/content/NewContentStepTabs";
import StudioFrame from "../../../../../components/modules/studio/home/StudioFrame";

const ContentEditIntro = () => {
  return (
    <StudioFrame title="新增內容">
      <StudioPage title="新增內容" backToUrl="/studio/contents" narrowWidth>
        <div className="mt-12 flex flex-col">
          <NewContentStepTabs step={3} />
          <div className="mt-6 space-y-4">
            <ContentEditIntroForm />
          </div>
        </div>
      </StudioPage>
    </StudioFrame>
  );
};

export default ContentEditIntro;
