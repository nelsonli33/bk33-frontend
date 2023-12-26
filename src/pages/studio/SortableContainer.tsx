import { useDroppable } from "@dnd-kit/core";
import {
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import React from "react";
import SortableItem from "./SortableItem";

const SortableContainer = (props) => {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div className="bg-gray-150 p-2 m-2 flex-1" ref={setNodeRef}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
};

export default SortableContainer;
