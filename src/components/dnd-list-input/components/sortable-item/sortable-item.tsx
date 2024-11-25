import React, { CSSProperties } from "react";
import { ItemType } from "../../../../features/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface SortableItemProps {
    id: string;
    data: ItemType | undefined;
    hidden?: boolean;
}
export const SortableItem: React.FC<SortableItemProps> = ({
    id,
    data,
    hidden,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id,
            data: data,
        });
    const style: CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        visibility: hidden ? "hidden" : "visible",
        border: "1px solid gray",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
        cursor: "grab",
    };
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {data?.text}
        </div>
    );
};
