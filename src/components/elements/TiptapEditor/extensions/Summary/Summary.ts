import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import SummaryView from "./SummaryView";

export interface SummaryOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    summary: {
      /**
       * Toggle a bullet list
       */
      insertSummary: () => ReturnType;
    };
  }
}

export const Summary = Node.create<SummaryOptions>({
  name: "summary",

  group: "block",

  content: "bulletList+",

  selectable: true,

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
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

  addCommands() {
    return {
      insertSummary:
        () =>
        ({ commands }) => {
          return commands.insertContent([
            {
              type: this.name,
              content: [
                {
                  type: "bulletList",
                  content: [
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          text: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ]);
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(SummaryView);
  },
});
