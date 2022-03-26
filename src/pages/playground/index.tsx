import React, { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Figcaption from "../../components/TiptapEditor/extensions/Figcaption";
import FigureImageNodeView from "../../components/TiptapEditor/extensions/FigureImageNodeView";

const json = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "I like lists. Let’s add one:",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "This is a bullet list.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "And it has three list items.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Here is the third one.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Do you want to see one more? I bet! Here is another one:",
        },
      ],
    },
    {
      type: "orderedList",
      attrs: {
        start: 1,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "That’s a different list, actually it’s an ordered list.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "It also has three list items.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "And all of them are numbered.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Lists would be nothing without list itedms.",
        },
      ],
    },
    {
      type: "figureImageComponent",
      attrs: {
        src: "https://source.unsplash.com/random",
        alt: "alt test",
        title: "great",
      },
      content: [
        {
          type: "figcaption",
          content: [
            {
              type: "text",
              text: "caption",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Lists would be nothing without list items.",
        },
      ],
    },
  ],
};

export default function index() {
  const output = useMemo(() => {
    return generateHTML(json, [
      StarterKit,
      Link,
      Image,
      Figcaption,
      FigureImageNodeView,
      // other extensions …
    ]);
  }, [json]);
  return <div dangerouslySetInnerHTML={{ __html: output }}></div>;
}
