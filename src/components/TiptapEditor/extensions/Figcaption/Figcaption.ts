import React from "react";
import { Node, mergeAttributes } from "@tiptap/core";

export const Figcaption = Node.create({
  name: "figcaption",

  group: "figure",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "inline*",

  selectable: true,

  draggable: false,

  isolating: true,

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { doc, selection } = this.editor.state;
        const { $anchor } = selection;
        if ($anchor.parent.type === this.type) {
          if ($anchor.after(1) + 2 === doc.nodeSize) {
            this.editor.chain().focus().insertContent("<p></p>").run();
          } else {
            this.editor
              .chain()
              .focus()
              .setTextSelection($anchor.after(1) + 1)
              .run();
          }
          return true;
        }
      },
      "Mod-a": () => {
        const { selection } = this.editor.state;
        const { $anchor } = selection;
        if ($anchor.parent.type === this.type) {
          const nodeStart = $anchor.start($anchor.depth);
          const nodeEnd = nodeStart + $anchor.parent.content.size;
          this.editor
            .chain()
            .focus()
            .setTextSelection({ from: nodeStart, to: nodeEnd })
            .run();
          return true;
        }
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figcaption",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["figcaption", mergeAttributes(HTMLAttributes), 0];
  },
});
