import React from "react";
import NewContentPage from "../../../../../components/layouts/studio/NewContentPage";
import ContentEditCatalog from "../../../../../components/modules/studio/content/ContentEditCatalog";

const NewContentDetail = () => {
  return (
    <NewContentPage step={2}>
      <div className="mt-6 space-y-4">
        <div className="block font-medium text-brand-black">目錄</div>
        <ContentEditCatalog />
      </div>
    </NewContentPage>
  );
};

export default NewContentDetail;
