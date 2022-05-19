import React from "react";
import TiptapEditor from "../../../../elements/TiptapEditor";
import { EditorEvents } from "@tiptap/react";

interface PageBodyEditorProps {
  content?: object | string;
  pageId?: number;
  onUpdate?: (props: EditorEvents["update"]) => void;
  onFocus?: (props: EditorEvents["focus"]) => void;
}

const PageBodyEditor = ({
  content,
  pageId,
  onUpdate,
  onFocus,
}: PageBodyEditorProps) => {
  return (
    <TiptapEditor content={content} onUpdate={onUpdate} onFocus={onFocus} />
  );
};

// prevent tiptap editor keep re-render, when saved content it will pass new content, then
// editor.commands.setContent execute, and cursor move below, the behavior is not we want.
function areEqual(prevProps, nextProps) {
  return prevProps.pageId === nextProps.pageId;
}

export default React.memo(PageBodyEditor, areEqual);
