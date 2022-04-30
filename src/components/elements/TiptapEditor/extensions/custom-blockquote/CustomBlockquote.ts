import Blockquote from "@tiptap/extension-blockquote";

export const CustomBlockquote = Blockquote.extend({
  name: "customBlockquote",

  addAttributes() {
    return {
      quoteType: {
        default: 1,
        rendered: false,
      },
    };
  },
});
