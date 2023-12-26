import React, { useEffect } from "react";
import { classNames } from "../../../../../../../utilities/css";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  EditorEvents,
} from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import "tippy.js/dist/tippy.css";
import { GrBold } from "react-icons/gr";
import { BsInfoLg } from "react-icons/bs";
import { RiListOrdered, RiListUnordered } from "react-icons/ri";

interface ContentDescriptionEditorProps {
  content?: object | string;
  onUpdate?: (props: EditorEvents["update"]) => void;
}

const ContentDescriptionEditor = ({
  content,
  onUpdate,
}: ContentDescriptionEditorProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[180px] mini-editor",
      },
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  useEffect(() => {
    if (editor) {
      onUpdate && editor.on("update", onUpdate);
    }
  }, [editor, onUpdate]);

  return (
    <>
      <label className={classNames("block font-medium text-brand-black")}>
        內容簡介
      </label>

      <div className="border border-gray-350 rounded p-6 mt-1">
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{
              duration: 100,
              theme: "menu",
            }}
            className="bubble-toolbar"
          >
            <div className="bubble-toolbar-inner">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  stopPropagation(event);
                  editor.chain().focus().toggleBold().run();
                }}
                className={classNames(
                  editor.isActive("bold") ? "is-active" : "",
                  "btn"
                )}
              >
                <GrBold />
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  stopPropagation(event);
                  editor.chain().focus().toggleItalic().run();
                }}
                className={classNames(
                  editor.isActive("italic") ? "is-active" : "",
                  "btn"
                )}
              >
                <BsInfoLg size={16} />
              </button>

              <button
                onClick={(event) => {
                  event.preventDefault();
                  stopPropagation(event);
                  editor.chain().focus().toggleBulletList().run();
                }}
                className={classNames(
                  editor.isActive("bulletList") ? "is-active" : "",
                  "btn"
                )}
              >
                <RiListUnordered />
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  stopPropagation(event);
                  editor.chain().focus().toggleOrderedList().run();
                }}
                className={classNames(
                  editor.isActive("orderedList") ? "is-active" : "",
                  "btn"
                )}
              >
                <RiListOrdered />
              </button>
            </div>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />

        <style jsx global>{`
          .tippy-box[data-theme~="menu"] > .tippy-content {
            padding: 0;
          }
        `}</style>
      </div>
    </>
  );
};

function stopPropagation(event: React.MouseEvent<any>) {
  event.stopPropagation();
}

export default ContentDescriptionEditor;
