import { Extension } from "@tiptap/core";
import { createLinkTooltip } from "./createLinkTooltip";

export const LinkTooltip = Extension.create({
  name: "linkTooltip",

  onCreate() {
    // The editor is ready.
    createLinkTooltip();
  },

  addOptions() {
    return {
      pluginKey: "linkTooltip",
    };
  },
});
