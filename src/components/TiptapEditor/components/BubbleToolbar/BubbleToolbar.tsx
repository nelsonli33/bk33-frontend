import React, { useState, useCallback } from "react";
import { BubbleMenu } from "@tiptap/react";
import { isTextSelection } from "@tiptap/core";
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
      width="16"
      height="16"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 5h1V2h5v14H5v1h7v-1H9V2h5v3h1V1H2v4z"
        fillRule="nonzero"
        fillOpacity="1"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="1.7"
      ></path>
    </svg>
  );

  const subTitleIconMarkup = (
    <svg
      width="13"
      height="13"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 5h1V2h5v14H5v1h7v-1H9V2h5v3h1V1H2v4z"
        fillRule="nonzero"
        fillOpacity="1"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="2"
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

  const toggleCustomBlockquote = () => {
    const { quoteType } = editor.getAttributes("customBlockquote");

    let nextQuoteType =
      quoteType === undefined || quoteType === null ? 1 : (quoteType + 1) % 3;

    switch (nextQuoteType) {
      case 0:
        editor.chain().focus().unsetBlockquote().run();
        break;
      case 1:
        editor
          .chain()
          .focus()
          .wrapIn("customBlockquote", {
            class:
              "pl-5 border-l-[3px] border-solid border-slate-900 -ml-[23px]",
          })
          .updateAttributes("customBlockquote", { quoteType: 1 })
          .run();
        break;
      case 2:
        editor
          .chain()
          .focus()
          .unsetBlockquote()
          .wrapIn("customBlockquote", {
            class: "p-0 pl-[50px] quote-2",
          })
          .updateAttributes("customBlockquote", { quoteType: 2 })
          .run();
        break;
    }
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
          shouldShow={({ editor, view, state, from, to }) => {
            const { doc, selection } = state;
            const { empty } = selection;

            // Sometime check for `empty` is not enough.
            // Doubleclick an empty paragraph returns a node size of 2.
            // So we check also for an empty text size.
            const isEmptyTextBlock =
              !doc.textBetween(from, to).length &&
              isTextSelection(state.selection);

            const isImage = editor.isActive("image");
            const isFigureImage =
              editor.isActive("figureImage") && !editor.isActive("figcaption");
            const isHorizontalRule = editor.isActive("horizontalRule");

            if (
              !view.hasFocus() ||
              empty ||
              isEmptyTextBlock ||
              isImage ||
              isFigureImage ||
              isHorizontalRule
            ) {
              return false;
            }

            return true;
          }}
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
                  <GrBold className="stroke-1" />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={classNames(
                    editor.isActive("italic") ? "active" : "",
                    "btn"
                  )}
                >
                  <BsInfoLg size={16} className="stroke-1" />
                </button>
                <button
                  onClick={toggleLink}
                  className={classNames(
                    editor.isActive("link") ? "active" : "",
                    "btn"
                  )}
                >
                  <FaLink size={15} />
                </button>

                {!editor.isActive("figcaption") && (
                  <>
                    <div className="bubble-toolbar-button-divider"></div>
                    <button
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                      }
                      className={classNames(
                        editor.isActive("heading", { level: 2 })
                          ? "active"
                          : "",
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
                        editor.isActive("heading", { level: 3 })
                          ? "active"
                          : "",
                        "btn"
                      )}
                    >
                      {subTitleIconMarkup}
                    </button>
                    <button
                      onClick={toggleCustomBlockquote}
                      className={classNames(
                        editor.isActive("customBlockquote") ? "active" : "",
                        "btn"
                      )}
                    >
                      <RiDoubleQuotesR />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </BubbleMenu>
      )}
    </>
  );
}
