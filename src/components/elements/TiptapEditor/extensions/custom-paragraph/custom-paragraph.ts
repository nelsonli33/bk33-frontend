import Paragraph from "@tiptap/extension-paragraph";
import { Plugin, PluginKey } from "prosemirror-state";

export const CustomParagraph = Paragraph.extend({
  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new Plugin({
        key: new PluginKey("paragraph"),
        props: {
          handleDOMEvents: {
            dragstart: (view, event) => {
              if (editor.isActive(this.name)) {
                event.preventDefault();
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});
