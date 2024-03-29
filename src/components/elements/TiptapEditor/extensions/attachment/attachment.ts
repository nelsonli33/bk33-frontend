// import { Extension } from "@tiptap/core";
// import { Plugin, PluginKey } from "prosemirror-state";
// import { handleFileEvent } from "../services/upload_helpers";

// export interface AttachmentOptions {
//   uploadsPath: string | null;
// }

// declare module "@tiptap/core" {
//   interface Commands<ReturnType> {
//     attachment: {
//       uploadAttachment: ({ file }) => ReturnType;
//     };
//   }
// }

// export const Attachment = Extension.create<AttachmentOptions>({
//   name: "attachment",

//   addOptions() {
//     return {
//       uploadsPath: null,
//     };
//   },

//   addCommands() {
//     return {
//       uploadAttachment:
//         ({ file }) =>
//         () => {
//           const { uploadsPath, renderMarkdown, eventHub } = this.options;

//           return handleFileEvent({
//             file,
//             uploadsPath,
//             renderMarkdown,
//             editor: this.editor,
//             eventHub,
//           });
//         },
//     };
//   },
//   addProseMirrorPlugins() {
//     const { editor } = this;

//     return [
//       new Plugin({
//         key: new PluginKey("attachment"),
//         props: {
//           handlePaste: (_, event) => {
//             const { uploadsPath, renderMarkdown, eventHub } = this.options;

//             return handleFileEvent({
//               editor,
//               file: event.clipboardData.files[0],
//               uploadsPath,
//               renderMarkdown,
//               eventHub,
//             });
//           },
//           handleDrop: (_, event) => {
//             const { uploadsPath, renderMarkdown, eventHub } = this.options;

//             return handleFileEvent({
//               editor,
//               file: event.dataTransfer.files[0],
//               uploadsPath,
//               renderMarkdown,
//               eventHub,
//             });
//           },
//         },
//       }),
//     ];
//   },
// });
