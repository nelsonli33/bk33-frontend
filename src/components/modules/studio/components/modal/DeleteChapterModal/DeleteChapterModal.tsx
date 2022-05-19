import React, { useEffect } from "react";

import { useDeleteChapter } from "../../../../../../hooks/api/author/chapter";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { hideModal } from "../../../../../../store/modal/slice";
import Modal from "../../../../../elements/studio/Modal";
import { ActiveItem } from "../../../page-edit/PageEditLeftPanel/components/Catalog/types";

export interface DeleteChapterModalProps {
  chapter: ActiveItem;
}

const DeleteChapterModal = ({ chapter }: DeleteChapterModalProps) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const {
    mutate: deleteChapter,
    isLoading: isDeleting,
    isSuccess,
  } = useDeleteChapter(chapter.bookId, chapter.id);

  useEffect(() => {
    if (isSuccess && !isDeleting) {
      dispatch(hideModal());
    }
  }, [isSuccess, isDeleting]);

  return (
    <Modal
      visible={modal.modalVisibility}
      onClose={() => dispatch(hideModal())}
      title="刪除章節"
      primaryAction={{
        content: "刪除",
        onAction: deleteChapter,
        loading: isDeleting,
        destructive: true,
      }}
    >
      <p>
        此操作會刪除 <strong>{chapter.title}</strong>
        {"  "}
        以及包含在它下方的所有頁面。
      </p>
    </Modal>
  );
};

export default DeleteChapterModal;
