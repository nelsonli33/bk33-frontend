import isHotkey from "is-hotkey";
import React, { useCallback, useState } from "react";
import { createEditor, Node, BaseEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { Element, HoverToolbar, Leaf } from "./components";
import { withHtml, withImages, withLinks } from "./plugins";
import { toggleMark } from "./transforms";

const HOTKEYS: { [key: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
};

export interface SlateEditorProps {
  value: Array<Node>;
  onChange: (value: Array<Node>) => void;
}

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const SlateEditor = ({ value, onChange }: SlateEditorProps) => {
  // Ensure the following order of precedence for the plugins:
  //   withImages > withLinks > withHtml
  const [editor] = useState(() =>
    withImages(withLinks(withHtml(withHistory(withReact(createEditor())))))
  );

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    for (const hotkey in HOTKEYS) {
      // @ts-ignore
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  return (
    <div className="text-editor">
      <Slate editor={editor} value={value} onChange={onChange}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          onKeyDown={handleKeyDown}
          placeholder="內文"
        />
      </Slate>
    </div>
  );
};

export default SlateEditor;
