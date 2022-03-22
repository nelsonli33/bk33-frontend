import React from "react";
import { RenderLeafProps } from "slate-react";

export const Leaf = (props: RenderLeafProps) => {
  const { leaf, attributes, children } = props;

  let content = children;

  if (leaf.bold) {
    content = <strong>{content}</strong>;
  }
  if (leaf.italic) {
    content = <em>{content}</em>;
  }
  if (leaf.code) {
    content = <code>{content}</code>;
  }

  return <span {...attributes}>{content}</span>;
};
