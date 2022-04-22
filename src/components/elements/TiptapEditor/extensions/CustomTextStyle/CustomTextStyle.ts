import TextStyle from "@tiptap/extension-text-style";

export const CustomTextStyle = TextStyle.extend({
    parseHTML() {
        return [
          {
            tag: 'span',
          },
        ]
    },
})