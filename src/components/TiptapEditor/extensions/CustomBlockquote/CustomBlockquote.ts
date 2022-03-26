import Blockquote from "@tiptap/extension-blockquote";

export const CustomBlockquote = Blockquote.extend({
  name: "customBlockquote",

  addStorage() {
    return {
      quoteType: 1,
    };
  },

  addAttributes() {
    return {
      quoteType: {
        default: 1,
        rendered: false,
      },
    };
  },
});
