import React, { useState, useCallback } from "react";
import { BubbleMenu } from "@tiptap/react";
import { classNames } from "../../../../utilities/css";
import { GrBold } from "react-icons/gr";
import { BsInfoLg } from "react-icons/bs";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { createLinkTooltip } from "../../extensions/LinkTooltip";

export default function BubbleToolbar({ editor }) {
  const [showLinkInput, setShowLinkInput] = useState(false);

  const bigTitleIconMarkup = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 5h1V2h5v14H5v1h7v-1H9V2h5v3h1V1H2v4z"
        fillRule="nonzero"
        fillOpacity="1"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="0.75"
      ></path>
    </svg>
  );

  const subTitleIconMarkup = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 5h1V2h5v14H5v1h7v-1H9V2h5v3h1V1H2v4z"
        fillRule="nonzero"
        fillOpacity="1"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="1"
      ></path>
    </svg>
  );

  const cancelIconMarkup = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#ffffff"
      strokeWidth="1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const toggleLink = useCallback(() => {
    if (editor.isActive("link")) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    setShowLinkInput(true);
  }, [editor]);

  const handleLinkInput = (e) => {
    if (e.keyCode == 13) {
      const url = e.target.value;

      if (url === "") {
        handleCancelLinkInput();
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: e.target.value })
        .setTextSelection(editor.state.selection.to)
        .run();

      setShowLinkInput(false);

      createLinkTooltip();
    }
  };

  const handleCancelLinkInput = () => {
    setShowLinkInput(false);
    editor.chain().focus().extendMarkRange("link").run();
  };

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-toolbar"
          tippyOptions={{
            duration: 100,
            theme: "menu",
            offset: [0, 10],
            animation: "scale-subtle",
          }}
          editor={editor}
        >
          <div className="bubble-toolbar-inner">
            {showLinkInput ? (
              <div className="flex items-center">
                <div>
                  <label htmlFor="link" className="sr-only">
                    link
                  </label>
                  <input
                    type="text"
                    name="link"
                    id="link"
                    autoComplete="off"
                    className="block w-full text-sm focus:ring-0 bg-inherit border-none text-white px-0 h-10 leading-[44px]"
                    placeholder="鏈接"
                    autoFocus
                    maxLength={2048}
                    onKeyDown={handleLinkInput}
                    onBlur={handleCancelLinkInput}
                  />
                </div>
                <div
                  className="ml-2 cursor-pointer"
                  onClick={handleCancelLinkInput}
                >
                  {cancelIconMarkup}
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={classNames(
                    editor.isActive("bold") ? "active" : "",
                    "btn"
                  )}
                >
                  <GrBold />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={classNames(
                    editor.isActive("italic") ? "active" : "",
                    "btn"
                  )}
                >
                  <BsInfoLg size={16} />
                </button>
                <button
                  onClick={toggleLink}
                  className={editor.isActive("link") ? "active" : ""}
                >
                  <FaLink size={15} />
                </button>
                <div className="bubble-toolbar-button-divider"></div>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={classNames(
                    editor.isActive("heading", { level: 2 }) ? "active" : "",
                    "btn"
                  )}
                >
                  {bigTitleIconMarkup}
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={classNames(
                    editor.isActive("heading", { level: 3 }) ? "active" : "",
                    "btn"
                  )}
                >
                  {subTitleIconMarkup}
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  className={editor.isActive("blockquote") ? "active" : ""}
                >
                  <RiDoubleQuotesR />
                </button>
              </>
            )}
          </div>
        </BubbleMenu>
      )}
    </>
  );
}
