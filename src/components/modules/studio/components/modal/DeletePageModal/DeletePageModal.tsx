import React, { useEffect } from "react";
import { useDeletePage } from "../../../../../../hooks/api/author/page";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { hideModal } from "../../../../../../store/modal/slice";
import Modal from "../../../../../elements/studio/Modal";
import { ActiveItem } from "../../../page-edit/PageEditLeftPanel/components/Catalog/types";

export interface DeletePageModalProps {
  page: ActiveItem;
}

const DeletePageModal = ({ page }: DeletePageModalProps) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const {
    mutate: deletePage,
    isLoading: isDeleting,
    isSuccess,
  } = useDeletePage(page.id, page.bookId);

  useEffect(() => {
    if (isSuccess && !isDeleting) {
      dispatch(hideModal());
    }
  }, [isSuccess, isDeleting]);

  return (
    <Modal
      visible={modal.modalVisibility}
      onClose={() => dispatch(hideModal())}
      title="刪除頁面"
      primaryAction={{
        content: "刪除",
        onAction: deletePage,
        loading: isDeleting,
        destructive: true,
      }}
    >
      <p>
        此操作會刪除 <strong>{page.title}</strong>
      </p>
    </Modal>
  );
};

export default DeletePageModal;
