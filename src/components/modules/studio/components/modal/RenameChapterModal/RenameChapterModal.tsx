import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateChapter } from "../../../../../../hooks/api/author/chapter";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";

import { hideModal } from "../../../../../../store/modal/slice";

import Modal from "../../../../../elements/studio/Modal";
import TextField from "../../../../../elements/TextField";
import { ActiveItem } from "../../../page-edit/PageEditLeftPanel/components/Catalog/types";

type FormData = {
  title: string;
};

export interface RenameChapterModalProps {
  chapter: ActiveItem;
}

const RenameChapterModal = ({ chapter }: RenameChapterModalProps) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const {
    mutate: updateChapter,
    isLoading: isUpdating,
    isSuccess,
  } = useUpdateChapter(chapter.bookId, chapter.id);

  const { register, handleSubmit, setFocus } = useForm();

  const updateChapterData = handleSubmit((formData: FormData) => {
    updateChapter({
      title: formData.title,
    });
  });

  useEffect(() => {
    if (isSuccess && !isUpdating) {
      dispatch(hideModal());
    }
  }, [isSuccess, isUpdating]);

  useEffect(() => {
    setFocus("title");
  }, []);

  return (
    <Modal
      visible={modal.modalVisibility}
      onClose={() => dispatch(hideModal())}
      title="重新命名"
      primaryAction={{
        content: "重新命名",
        onAction: updateChapterData,
        loading: isUpdating,
      }}
    >
      <form method="post" autoComplete="off" onSubmit={updateChapterData}>
        <TextField
          id="title"
          type="text"
          label="章節名稱"
          labelLight={true}
          defaultValue={chapter.title}
          focused={true}
          selectTextOnFocus={true}
          register={register}
        />
      </form>
    </Modal>
  );
};

export default RenameChapterModal;
