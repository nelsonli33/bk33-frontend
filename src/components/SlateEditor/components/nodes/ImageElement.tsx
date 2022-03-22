import React from "react";
import { RenderElementProps, useSelected, useFocused } from "slate-react";

export const ImageElement = ({
  element,
  attributes,
  children,
}: RenderElementProps) => {
  const selected = useSelected();
  const focused = useFocused();

  const url = element.url as string;
  const alt = typeof element.alt === "string" ? element.alt : undefined;
  const imgClass =
    selected && focused ? `rf-img ${classes.selected}` : "rf-img";

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img className={imgClass} src={url} alt={alt} />
      </div>
      {children}
    </div>
  );
};
