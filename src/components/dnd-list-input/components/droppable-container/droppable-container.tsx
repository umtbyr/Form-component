import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ItemType } from "../../../../features/types";
import { DraggableItem } from "../draggable-item";

interface DroppableContainerProps {
    id: string;
    items: ItemType[];
}
export const DroppableContainer: React.FC<DroppableContainerProps> = ({
    id,
    items,
}) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                border: "1px solid black",
                padding: "16px",
                minWidth: "200px",
                backgroundColor: isOver ? "#DDD" : "transparent",
            }}
        >
            <SortableContext
                items={items.map((item) => item.code)}
                id={id}
                strategy={verticalListSortingStrategy}
            >
                {items?.map((item) => (
                    <DraggableItem key={item.code} data={item} id={item.code} />
                ))}
            </SortableContext>
        </div>
    );
};
