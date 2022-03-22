import { GrBold } from "react-icons/gr";
import { GoItalic } from "react-icons/go";
import { BsCode, BsLink45Deg } from "react-icons/bs";
import { AiOutlineUnorderedList, AiOutlineOrderedList } from "react-icons/ai";
import { RiDoubleQuotesR } from "react-icons/ri";

import React, { Fragment } from "react";
import { EditMode } from "../../models";
import { BlockButton } from "./BlockButton";
import { Heading1Icon } from "./Heading1Icon";
import { Heading2Icon } from "./Heading2Icon";
import { LinkButton } from "./LinkButton";
import { MarkButton } from "./MarkButton";

export interface ToolbarProps {
  onEditModeChange: (editMode: EditMode) => void;
}

export const Toolbar = ({ onEditModeChange }: ToolbarProps) => {
  return (
    <Fragment>
      <MarkButton markType="bold" aria-label="bold">
        <GrBold />
      </MarkButton>
      <MarkButton markType="italic" aria-label="italic">
        <GoItalic />
      </MarkButton>
      <MarkButton markType="code" aria-label="code">
        <BsCode />
      </MarkButton>
      <LinkButton aria-label="link" onEditModeChange={onEditModeChange}>
        <BsLink45Deg />
      </LinkButton>
      <BlockButton blockType="heading2" aria-label="heading2">
        <Heading1Icon />
      </BlockButton>
      <BlockButton blockType="heading3" aria-label="heading3">
        <Heading2Icon />
      </BlockButton>
      <BlockButton blockType="block-quote" aria-label="block-quote">
        <RiDoubleQuotesR />
      </BlockButton>
      <BlockButton blockType="bulleted-list" aria-label="bulleted-list">
        <AiOutlineUnorderedList />
      </BlockButton>
      <BlockButton blockType="numbered-list" aria-label="numbered-list">
        <AiOutlineOrderedList />
      </BlockButton>
    </Fragment>
  );
};
