import React, { useState } from "react";
import Modal from "./Modal";
import Register from "../Register";
import { hideModal } from "../../store/modal/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Login from "../Login";

const MODAL_COMPONENTS = {
  REGISTER: Register,
  LOGIN: Login,
  /* other modals */
};

export default function ModalRoot() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  if (!modal.modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modal.modalType];

  return (
    <Modal
      visible={modal.modalVisibility}
      onClose={() => dispatch(hideModal())}
    >
      <SpecificModal />
    </Modal>
  );
}
