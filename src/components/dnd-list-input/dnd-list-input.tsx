import { Box } from "@mui/material";
import { DroppableContainer } from "./components";
import { InputDialog } from "./components";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { ItemType, ParamType } from "../../features/types";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { SortableItem } from "./components/sortable-item";
import { arrayMove } from "@dnd-kit/sortable";

//dialog burda olabilir
//sürükle bırak contexti burda olmalı
//dialogdan gelen data ilgili alana hook forma setvalue eklersin.

type DndListInputProps = {
    items: ItemType[];
    name: string;
};

export const DndListInput: React.FC<DndListInputProps> = ({ items, name }) => {
    const [data, setData] = useState(items);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<ItemType | null>();
    const { getValues, setValue } = useFormContext();
    const rules: ItemType[] = getValues(name) || [];

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const activeDraggedItem =
            rules.find((item: ItemType) => item.code === active.id) ||
            data.find((item) => item.code === active.id);
        setActiveItem(activeDraggedItem);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        console.log("over :", over?.id);

        if (!over?.id) {
            setActiveItem(null);
            return null;
        }

        if (
            rules.some((item) => item.code === over.id) &&
            rules.some((item) => item.code === active.id)
        ) {
            const oldIndex = rules.findIndex((item) => item.code === active.id);
            const newIndex = rules.findIndex((item) => item.code === over.id);
            const updatedRules = arrayMove(rules, oldIndex, newIndex);
            setValue(name, updatedRules);
            setActiveItem(null);
        } else if (
            over?.id === "rulesListRight" &&
            !rules.some((item) => item.code === active.id)
        ) {
            //adding item from left to right...
            setFormIsOpen(true);
        } else if (
            over?.id === "rulesListLeft" &&
            !data.some((item) => item.code === active.id)
        ) {
            //adding item from right to left...
            rules.splice(
                rules.findIndex((item) => item.code === active.id),
                1
            );
            setValue(name, rules);
            setData((prevData) => {
                const updatedActiveData = active.data.current as ItemType;
                updatedActiveData.params = undefined;

                return [updatedActiveData, ...prevData];
            });
            setActiveItem(null);
        } else {
            setActiveItem(null);
            //logic for sorting in the left list will add if needed.
        }
    };

    const OnSubmitHandler = (
        activeItem: ItemType,
        paramsArray: ParamType[]
    ) => {
        setActiveItem((prevItem) => {
            if (!prevItem) return null;

            const updatedActiveItem = {
                ...prevItem,
                params: paramsArray as ParamType[],
            };

            rules.push(updatedActiveItem);
            setValue(name, rules);
            const updatedData = data.filter(
                (item) => item.code !== activeItem.code
            );
            setData(updatedData);
        });
    };

    const onCloseFormHandler = () => {
        setActiveItem(null);
        setFormIsOpen(false);

    };

    return (
        <>
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <div style={{ display: "flex", gap: "20px" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <Box>
                            <DroppableContainer
                                activeItem={activeItem}
                                items={data}
                                id="rulesListLeft"
                            />
                        </Box>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <DroppableContainer
                            activeItem={activeItem}
                            items={rules}
                            id="rulesListRight"
                        />
                    </div>
                    <DragOverlay>
                        {activeItem?.code ? (
                            <SortableItem
                                id={activeItem.code}
                                data={items.find(
                                    (item) => item.code === activeItem.code
                                )}
                            />
                        ) : null}
                    </DragOverlay>
                </div>
            </DndContext>
            {formIsOpen && (
                <InputDialog
                    open={formIsOpen}
                    OnSubmitHandler={OnSubmitHandler}
                    onCloseHanlder={onCloseFormHandler}
                    item={activeItem}
                ></InputDialog>
            )}
        </>
    );
};
