import { createContext } from "react";

export const PageEditContext = createContext({
  isEditing: false,
  setEditingTrue: () => {},
  setEditingFalse: () => {},
});
