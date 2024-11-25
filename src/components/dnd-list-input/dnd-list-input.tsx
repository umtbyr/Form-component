import { Box } from "@mui/material";

import { DroppableContainer } from "./components";
import { DialogComponent } from "./components";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import { ItemType, ParamType } from "../../features/types";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

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
    const [isEditing, setIsEditing] = useState(false);
    const [activeItem, setActiveItem] = useState<ItemType | null>();
    const { getValues, setValue } = useFormContext();
    const rules = getValues(name) || [];
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        console.log("active", active);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveItem(active.data.current as ItemType);

        if (over?.id === "rulesListRight") {
            setFormIsOpen(true);
        } else if (
            over?.id === "rulesListLeft" &&
            !data.some((item) => item.code === active.id)
        ) {
            rules.splice(
                rules.findIndex((item: ItemType) => item.code === active.id),
                1
            );
            setData((prevData) => {
                const updatedActiveData = active.data.current as ItemType;
                updatedActiveData.params = undefined;

                return [updatedActiveData, ...prevData];
            });
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
        if (isEditing) {
            setIsEditing(false);
        }
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
                                items={data}
                                id="rulesListLeft"
                            />
                        </Box>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <DroppableContainer items={rules} id="rulesListRight" />
                    </div>
                </div>
            </DndContext>
            {formIsOpen && (
                <DialogComponent
                    isEditing={isEditing}
                    open={formIsOpen}
                    OnSubmitHandler={OnSubmitHandler}
                    onCloseHanlder={onCloseFormHandler}
                    item={activeItem}
                ></DialogComponent>
            )}
        </>
    );
};
