import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMainFormContext } from "../MainForm";
import { ItemType } from "../types";

type DndProviderPropsType = {
    children?: React.ReactNode;
};

const DndProvider: React.FC<DndProviderPropsType> = ({ children }) => {
    const {
        rulesList,
        setFormIsOpen,
        setActiveItem,
        consumerList,
        setConsumerList,
    } = useMainFormContext();
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const itemToMove = rulesList.find((item) => item.code === active.id);
        const itemToSort = consumerList.find((item) => item.code === active.id);
        if (over?.id === "container") {
            if (itemToMove) {
                setFormIsOpen(true);

                return;
            }
        }
        if (itemToSort) {
            const oldIndex = consumerList.findIndex(
                (item) => item.code === active.id
            );
            const newIndex = consumerList.findIndex(
                (item) => item.code === over?.id
            );
            if (oldIndex !== newIndex) {
                setConsumerList((prevList) =>
                    arrayMove(prevList, oldIndex, newIndex)
                );
            }
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        const activeListItem: ItemType | undefined = rulesList.find(
            (item) => item.code === active.id
        );
        setActiveItem(activeListItem);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            {children}
        </DndContext>
    );
};

export default DndProvider;
