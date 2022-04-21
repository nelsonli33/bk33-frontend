import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  modalVisibility: boolean;
  modalType: "REGISTER" | "LOGIN" | "";
  modalProps?: {};
}

type ModalPayload = Pick<ModalState, "modalType" | "modalProps">;

const initialState: ModalState = {
  modalVisibility: false,
  modalType: "",
  modalProps: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalPayload>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.modalVisibility = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    hideModal: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
