import React, { useState } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { NodeSelection } from "prosemirror-state";
import { useToggle } from "../../../../../hooks/useToggle";
import { classNames } from "../../../../../utilities/css";
export default function SummaryView({
  editor,
  node,
  updateAttributes,
  getPos,
  selected,
  extension,
  deleteNode,
}) {
  return (
    <NodeViewWrapper>
      <div
        className={classNames(
          "border border-gray-300 mt-4 pt-0 px-4 pb-4 rounded cursor-default",
          selected && "ProseMirror-selectednode"
        )}
        onClick={() => {
          editor.commands.setNodeSelection(getPos());
        }}
      >
        <div className="flex justify-center  relative -top-3.5">
          <div className="inline-block px-3 font-semibold bg-white">
            重點回顧
          </div>
        </div>
        <NodeViewContent
          className="cursor-text"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
    </NodeViewWrapper>
  );
}

{
  /* <li>
          想拿高薪，很多人會直覺認為，該先去學一項熱門技能、考一張厲害證照，求工作表現、向上能見度。但一個人的價格不僅是內涵的抽象深化，而是外在的具體呈現。
        </li>
        <li>高薪者與低薪者的分野，在於良好的習慣，再回推一層，是自我紀律。</li>
        <li>求高薪，先從3個步驟著手：建立高薪心態、擴大態度、加強硬實力。</li> */
}
