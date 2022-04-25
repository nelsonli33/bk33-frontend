import { Node, mergeAttributes } from "@tiptap/core";

export interface DivOptions {
  HTMLAttributes: Record<string, any>;
}

export const Div = Node.create<DivOptions>({
  name: "div",

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      style: {
        default: "",
      },
    };
  },

  group: "block",

  content: "block*",

  parseHTML() {
    return [{ tag: "div" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
