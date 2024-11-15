import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableItemProps = {
    id: string;
    label: string;
};

const SortableItem: React.FC<SortableItemProps> = ({ id, label }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition, 
        margin: "4px",
        padding: "8px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#e3f2fd", 
        cursor: "grab",
        width: "100%",
        boxSizing: "border-box",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {label}
        </div>
    );
};

export default SortableItem;