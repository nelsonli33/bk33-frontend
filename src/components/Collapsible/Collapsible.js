import React, { useState } from "react";

export default function Collapsible(props) {
  const { title, children } = props;
  const [open, setOpen] = useState(true);

  const handlePanelToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        className="cursor-pointer items-center justify-between mt-4 pt-1 pb-2 hover:bg-gray-50 flex flex-row"
        onClick={handlePanelToggle}
      >
        <h5 className="px-2">{title}</h5>
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}
