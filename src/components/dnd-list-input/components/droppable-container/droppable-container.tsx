import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ItemType } from "../../../../features/types";
import { SortableItem } from "../sortable-item";

interface DroppableContainerProps {
    id: string;
    items: ItemType[];
    activeItem: ItemType | null | undefined;
    onUpdate?: (id: string) => void;
    onDelete?: (id: string) => void;
    isEditing?: boolean;
}
export const DroppableContainer: React.FC<DroppableContainerProps> = ({
    id,
    items,
    activeItem,
    onUpdate,
    onDelete,
    isEditing,
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
                    <SortableItem
                        isEditing={isEditing}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        key={item.code}
                        data={item}
                        id={item.code}
                        hidden={activeItem?.code === item.code}
                        showIcon={id === "rulesListRight"}
                    />
                ))}
            </SortableContext>
        </div>
    );
};
