import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import DeleteChapterModal from "../../../modules/studio/components/modal/DeleteChapterModal";
import DeletePageModal from "../../../modules/studio/components/modal/DeletePageModal/DeletePageModal";
import RenameChapterModal from "../../../modules/studio/components/modal/RenameChapterModal";
import RenamePageModal from "../../../modules/studio/components/modal/RenamePageModal";

/**
 * https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions
 * https://opensource.com/article/21/5/global-modals-react
 */
export const MODAL_TYPES = {
  rename_page: "RENAME_PAGE_MODAL",
  delete_page: "DELETE_PAGE_MODAL",
  rename_chapter: "RENAME_CHAPTER_MODAL",
  delete_chapter: "DELELTE_CHAPTER_MODAL",
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.rename_page]: RenamePageModal,
  [MODAL_TYPES.delete_page]: DeletePageModal,
  [MODAL_TYPES.rename_chapter]: RenameChapterModal,
  [MODAL_TYPES.delete_chapter]: DeleteChapterModal,
};

export default function StudioModalRoot() {
  const modal = useAppSelector((state) => state.modal);

  if (!modal.modalType) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[modal.modalType];

  if (!ModalComponent) {
    return null;
  }

  return <ModalComponent {...modal.modalProps} />;
}
