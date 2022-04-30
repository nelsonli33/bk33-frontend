import { createContext } from "react";

interface TiptapEditorContextType {
  inputFileRef?: React.RefObject<HTMLInputElement>;
}

export const TiptapEditorContext = createContext<TiptapEditorContextType>({});
