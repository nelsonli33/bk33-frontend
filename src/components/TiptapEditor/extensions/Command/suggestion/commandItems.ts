import { PencilAltIcon } from "@heroicons/react/outline";
import { MdOutlineHorizontalRule } from "react-icons/md";

const getSuggestionItems = ({ query }) => {
  return [
    {
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
      title: "bold",
      description: "粗體",
      icon: PencilAltIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("bold").run();
      },
    },
    {
      title: "italic",
      description: "斜體",
      icon: PencilAltIcon,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("italic").run();
      },
    },
    {
      title: "分隔線",
      description: "隔開文字",
      icon: MdOutlineHorizontalRule,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);
};

export default getSuggestionItems;
