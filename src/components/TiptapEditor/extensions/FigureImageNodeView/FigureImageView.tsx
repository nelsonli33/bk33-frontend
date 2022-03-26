import React, { useEffect, useState } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { classNames } from "../../../../utilities/css";

export default function FigureImageView(props) {
  const { editor, node, updateAttributes, getPos, selected, extension } = props;

  const isEmptyContent = node.content.size === 2;

  const [enableAlt, setEnableAlt] = useState(false);

  const handleAltChange = (event) => {
    updateAttributes({
      alt: event.target.value,
    });
  };

  const handleAltKeyDown = (event) => {
    event.stopPropagation();
    //key code for enter
    if (event.keyCode === 13) {
      event.preventDefault();
      setEnableAlt(false);
      editor
        .chain()
        .focus()
        .setTextSelection(getPos() + node.content.size)
        .run();
    }
  };

  return (
    <NodeViewWrapper>
      <figure className={classNames(selected && "ProseMirror-selectednode")}>
        <div contentEditable={false} className="cursor-pointer">
          <img
            src={node.attrs.src}
            alt={node.attrs.alt}
            title={node.attrs.title}
          />
        </div>
        <div className="relative px-10 py-2">
          {enableAlt ? (
            <input
              type="text"
              value={node.attrs.alt}
              className="border-none p-0 block w-full focus:ring-0 text-base text-center text-gray-500 placeholder:text-slate-400"
              placeholder="Type alt text for image (optional)"
              autoFocus={true}
              maxLength={200}
              onChange={handleAltChange}
              onKeyDown={handleAltKeyDown}
            />
          ) : (
            <NodeViewContent className="content" />
          )}
          {selected && (
            <button
              className={classNames(
                "px-2 m-2 border rounded-sm absolute right-0 bottom-0 text-sm",
                enableAlt
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "text-gray-400 border-gray-400"
              )}
              contentEditable={false}
              onClick={() => {
                setEnableAlt(!enableAlt);
              }}
            >
              Alt
            </button>
          )}
        </div>
      </figure>
    </NodeViewWrapper>
  );
}
