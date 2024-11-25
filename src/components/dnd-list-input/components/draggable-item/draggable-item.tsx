import React, { CSSProperties } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ItemType } from "../../../../features/types";
interface DraggableItemProps {
    id: string;
    data: ItemType;
}
export const DraggableItem: React.FC<DraggableItemProps> = ({ id, data }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: data,
    });
    const style: CSSProperties = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : "",
        border: "1px solid gray",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
        cursor: "grab",
    };
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {data.text}
        </div>
    );
};
