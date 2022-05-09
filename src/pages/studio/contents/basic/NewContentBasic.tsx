import React from "react";
import NewContentPage from "../../../../components/layouts/studio/NewContentPage";
import NewContentBasicForm from "../../../../components/modules/studio/content/NewContentBasicForm";

const NewContentBasic = () => {
  return (
    <NewContentPage step={1}>
      <NewContentBasicForm />
    </NewContentPage>
  );
};

export default NewContentBasic;
