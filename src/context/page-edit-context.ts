import { createContext } from "react";

export const PageEditContext = createContext({
  isEditing: false,
  setEditingTrue: () => {},
  setEditingFalse: () => {},
  isEditorFocus: false,
  setEditorFocusTrue: () => {},
  setEditorFocusFalse: () => {},
  frozen: false,
  setFrozenTrue: () => {},
  setFrozenFalse: () => {},
});
