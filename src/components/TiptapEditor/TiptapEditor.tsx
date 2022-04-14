import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleToolbar from "./components/BubbleToolbar";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CustomClass from "./extensions/CustomClass";
import CustomTextStyle from "./extensions/CustomTextStyle";
import CustomBlockquote from "./extensions/CustomBlockquote";
import Abbreviation from "./extensions/Abbreviation";
import LinkTooltip from "./extensions/LinkTooltip";
import Commands from "./extensions/Command";
import Figcaption from "./extensions/Figcaption";
import FigureImageNodeView from "./extensions/FigureImageNodeView";
import getSuggestionItems from "./extensions/Command/suggestion/commandItems";
import renderItems from "./extensions/Command/suggestion/renderItems";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-subtle.css";

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
      CustomTextStyle,
      CustomClass,
      Abbreviation,
      LinkTooltip,
      Image,
      Figcaption,
      FigureImageNodeView,
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      CustomBlockquote,
    ],
    content: `
       <p>
          I like lists. Let’s add one:
        </p>
        <ul>
          <li>This is a bullet list.</li>
          <li>And it has three list items.</li>
          <li>Here is the third one.</li>
        </ul>
        <p>
          Do you want to see one more? I bet! Here is another one:
        </p>
        <ol>
          <li>That’s a different list, actually it’s an ordered list.</li>
          <li>It also has three list items.</li>
          <li>And all of them are numbered.</li>
        </ol>
      
        <p>
          Lists would be nothing without list items.
        </p>
        <p>
        "微笑是我們心靈的最真誠傾訴，是在困難面前最好的良藥。" — 王鍾偉
        </p>
        <p>
        That’s a boring paragraph followed by a fenced code block:
      </p>
    `,
    editorProps: {
      attributes: {
        class: "mx-auto focus:outline-none",
      },
    },

    // triggered on every change
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      //send the content to an API here
    },

    editable: true,
  });

  return (
    <div>
      <BubbleToolbar editor={editor} />
      <EditorContent editor={editor} />

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
    </div>
  );
}

// <div data-type="figureImage" src="https://source.unsplash.com/random/738x415" alt="alt test" title="great">
// <figcaption>This is editable.</figcaption>
// </div>
