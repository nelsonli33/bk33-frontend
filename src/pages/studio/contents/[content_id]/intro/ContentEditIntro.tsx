import React, { useState, useCallback } from "react";
import Caption from "../../../../../components/elements/Caption";
import NewContentPage from "../../../../../components/layouts/studio/NewContentPage";
import ContentEditIntroForm from "../../../../../components/modules/studio/content/ContentEditIntroForm";

const ContentEditIntro = () => {
  return (
    <NewContentPage step={3}>
      <div className="mt-6 space-y-4">
        <ContentEditIntroForm />
      </div>
    </NewContentPage>
  );
};

export default ContentEditIntro;
