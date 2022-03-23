import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleToolbar from "./components/BubbleToolbar";
import Link from "@tiptap/extension-link";
import CustomClass from "./extensions/CustomClass";
import CustomTextStyle from "./extensions/CustomTextStyle";
import Abbreviation from "./extensions/Abbreviation";
import LinkTooltip from "./extensions/LinkTooltip";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-subtle.css";

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable an included extension
        strike: false,
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
    ],
    content: `
    <p>
        Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.
    </p>
    <p>
      Neat, isn’t it? Add an empty paragraph to see the floating menu.
    </p>
    <p>Hello <span class="rainbow">World</span>. :-)</p>

    <p>You can use <abbr title="Cascading Style Sheets">CSS</abbr> style your website.</p>
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
  });

  return (
    <div>
      <BubbleToolbar editor={editor} />
      <EditorContent editor={editor} />
      <div id="myTooltip"></div>
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
      `}</style>
    </div>
  );
}
// .tippy-content {
//   padding: 9px 12px;
// }
// .tippy-box[data-placement^="bottom"] > .tippy-arrow:before {
//   transform: scale(1.2);
// }
