import React from "react";
import Modal from "./Modal";
import Register from "../Register";
import { hideModal } from "../../../store/modal/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Login from "../Login";

/**
 * https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions
 */
export const MODAL_TYPES = {
  register: "REGISTER",
  login: "LOGIN",
} as const;

const MODAL_COMPONENTS = {
  [MODAL_TYPES.register]: Register,
  [MODAL_TYPES.login]: Login,
  /* other modals */
};

export default function ModalRoot() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  if (!modal.modalType) {
    return null;
  }

  const ModalComponent = MODAL_COMPONENTS[modal.modalType];

  if (!ModalComponent) {
    return null;
  }

  return (
    <Modal
      visible={modal.modalVisibility}
      onClose={() => dispatch(hideModal())}
    >
      <ModalComponent {...modal.modalProps} />
    </Modal>
  );
}
