import { PencilAltIcon } from "@heroicons/react/outline";
import { MdOutlineHorizontalRule } from "react-icons/md";

const getSuggestionItems = ({ query }) => {
  return [
    {
      code: "heading-2",
      title: "Heading 2",
      description: "大標題",
      icon: PencilAltIcon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      code: "heading-3",
      title: "Heading 3",
      description: "小標題",
      icon: PencilAltIcon,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      code: "bold",
      title: "bold",
      description: "粗體",
      icon: PencilAltIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("bold").run();
      },
    },
    {
      code: "italic",
      title: "italic",
      description: "斜體",
      icon: PencilAltIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("italic").run();
      },
    },
    {
      code: "horizontal-rule",
      title: "分隔線",
      description: "隔開文字",
      icon: MdOutlineHorizontalRule,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
    {
      code: "upload",
      title: "上傳檔案, 圖片",
      description: "",
      icon: PencilAltIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
      },
    },
    {
      code: "takeaway",
      title: "重點回顧",
      description: "適合放置於文末，提示讀者此篇文章的重要概念",
      icon: PencilAltIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertSummary().run();
      },
    },
    {
      code: "test",
      title: "測試專用",
      description: "",
      icon: PencilAltIcon,
      command: ({ editor, range }) => {},
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);
};

export default getSuggestionItems;
