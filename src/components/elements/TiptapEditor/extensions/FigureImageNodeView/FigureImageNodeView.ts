import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import FigureImageView from "./FigureImageView";

export const FigureImageNodeView = Node.create({
  name: "figureImage",

  group: "block",

  content: "figcaption",

  atom: true,

  selectable: true,

  isolating: false,

  draggable: false,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": this.name,
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FigureImageView);
  },
});
