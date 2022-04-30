import React, { useRef } from "react";
// TODO: change all package into case-camel
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import BubbleToolbar from "./components/BubbleToolbar";
import CustomClass from "./extensions/custom-class";
import CustomBlockquote from "./extensions/custom-blockquote";
import Abbreviation from "./extensions/abbreviation";
import LinkTooltip from "./extensions/link-tooltip";
import Commands from "./extensions/command";
import Figcaption from "./extensions/figcaption";
import FigureImage from "./extensions/figure-image";
import getSuggestionItems from "./extensions/command/suggestion/commandItems";
import renderItems from "./extensions/command/suggestion/renderItems";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-subtle.css";
import Summary from "./extensions/summary";
import { TiptapEditorContext } from "./context/TipTapEditorContext";

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable an included extension
        strike: false,
        gapcursor: false,
        blockquote: false,
        // Configure an included extension
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          "aria-expanded": "false",
          class: "js-link-tooltip",
        },
      }),
      CustomClass,
      Abbreviation,
      LinkTooltip,
      Image,
      Figcaption,
      FigureImage,
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      Placeholder.configure({
        placeholder: "內文 …",
      }),
      CustomBlockquote,
      Summary,
    ],
    content: `
      <p>測試</p>
    `,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },

    // triggered on every change
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      //send the content to an API here
    },

    editable: true,
  });

  const inputFileRef = useRef();

  return (
    <TiptapEditorContext.Provider value={{ inputFileRef: inputFileRef }}>
      <BubbleToolbar editor={editor} />
      <EditorContent editor={editor} />

      {editor && editor.isEditable && (
        <input
          type="file"
          name="file"
          className="hidden"
          ref={inputFileRef}
          onChange={(event) => {
            console.log(event.target.files[0]);
          }}
          hidden={true}
        />
      )}

      <style jsx global>{`
        .tippy-box[data-theme~="menu"] > .tippy-content {
          padding: 0;
        }

        .tippy-box[data-theme~="link"] {
          background-image: linear-gradient(to bottom, #31312a, #222224);
          color: #ffffff;
        }
        .tippy-box[data-theme~="link"] > .tippy-content {
          padding: 9px 12px;
        }
        .tippy-box[data-theme~="link"][data-placement^="top"]
          > .tippy-arrow::before {
          border-top-color: #222224;
        }
        .tippy-box[data-theme~="link"][data-placement^="bottom"]
          > .tippy-arrow::before {
          border-bottom-color: #222224;
        }
        .tippy-box[data-theme~="link"][data-placement^="left"]
          > .tippy-arrow::before {
          border-left-color: #222224;
        }
        .tippy-box[data-theme~="link"][data-placement^="right"]
          > .tippy-arrow::before {
          border-right-color: #222224;
        }
        .tippy-box[data-theme~="link"] > .tippy-arrow::before {
          transform: scale(1.2);
        }

        .tippy-box[data-theme~="slash"] {
          position: relative;
          background-color: #ffffff;
          font-size: inherit;
          line-height: inherit;
        }
        .tippy-box[data-theme~="slash"] > .tippy-content {
          padding: 0;
        }
      `}</style>
    </TiptapEditorContext.Provider>
  );
}

// <div data-type="figureImage" src="https://source.unsplash.com/random/738x415" alt="alt test" title="great">
// <figcaption>This is editable.</figcaption>
// </div>
