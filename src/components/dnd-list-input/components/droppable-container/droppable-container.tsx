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
    onSettings?: (id: string) => void;
    onDelete?: (id: string) => void;
}
export const DroppableContainer: React.FC<DroppableContainerProps> = ({
    id,
    items,
    activeItem,
    onSettings,
    onDelete,
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
                        onDelete={onDelete}
                        onSettings={onSettings}
                        key={item.code}
                        data={item}
                        id={item.code}
                        hidden={activeItem?.code === item.code}
                        isIconsHidden={id === "rulesListRight"}
                    />
                ))}
            </SortableContext>
        </div>
    );
};
