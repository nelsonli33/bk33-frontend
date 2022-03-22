import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import BubbleToolbar from "./components/BubbleToolbar";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

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
      }),
    ],
    content: `
    <p>
          Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.
        </p>
    <p>
      Neat, isn’t it? Add an empty paragraph to see the floating menu.
    </p>`,
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
    </div>
  );
}
