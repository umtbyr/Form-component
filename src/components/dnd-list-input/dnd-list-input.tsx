import { Box } from "@mui/material";
import * as React from "react";
import { LeftContainer } from "./components";
import { RightContainer } from "./components";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { UseFieldArrayReturn } from "react-hook-form";
import { FormInputType } from "../../MainForm/types";
import DroppableList from "../../MainForm/components/DroppableList";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
//dialog burda olabilir
//sürükle bırak contexti burda olmalı
//dialogdan gelen data ilgili alana hook forma setvalue eklersin.

type DndListInputProps = {
    leftList: UseFieldArrayReturn<FormInputType, "leftList">;
    rightList: UseFieldArrayReturn<FormInputType, "rightList">;
};

export const DndListInput: React.FC<DndListInputProps> = ({
    leftList,
    rightList,
}) => {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    
    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const draggedItem =
            leftList.fields.find((item) => item.code === active.id) ||
            rightList.fields.find((item) => item.code === active.id);

        if (!draggedItem) return;

        if (leftList.fields.some((item) => item.code === active.id)) {
            leftList.remove(
                leftList.fields.findIndex((item) => item.code === active.id)
            );
        } else if (rightList.fields.some((item) => item.code === active.id)) {
            rightList.remove(
                rightList.fields.findIndex((item) => item.code === active.id)
            );
        }

        /*       if (over.id === "left") {
            if (!leftList.fields.some((item) => item.code === active.id)) {
                leftList.append({ ...draggedItem });
            }
        } else if (over.id === "right") {
            if (!rightList.fields.some((item) => item.code === active.id)) {
                rightList.append({ ...draggedItem });
            }
        } */
    };
    return (
        <Box
            sx={{
                width: "100%",
                border: "dashed 1px #999",
                p: 2,
                display: "flex",
            }}
        >
            <DndContext onDragEnd={onDragEnd} sensors={sensors}>
                <DroppableList id="left">
                    <SortableContext
                        strategy={verticalListSortingStrategy}
                        items={leftList.fields.map((item) => item.code)}
                    >
                        <LeftContainer name="leftList" />
                    </SortableContext>
                </DroppableList>
                <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={rightList.fields.map((item) => item.code)}
                >
                    <DroppableList id="right">
                        <RightContainer name="rightList" />
                    </DroppableList>
                </SortableContext>
            </DndContext>
        </Box>
    );
};
