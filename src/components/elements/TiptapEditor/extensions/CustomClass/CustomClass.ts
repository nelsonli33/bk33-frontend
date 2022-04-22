import { Extension } from "@tiptap/core";

export const CustomClass = Extension.create({
  name: "customClass",

  addGlobalAttributes() {
    return [
      {
        // which type get apply
        types: ["textStyle", "link", "customBlockquote"],
        attributes: {
          class: {
            default: "",
          },
        },
      },
    ];
  },
});
