import React, { useEffect, useState } from "react";
import DroppableList from "./components/DroppableList";
import {
    DndContext,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    DragEndEvent,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableItem from "./components/DraggableItem";
import SortableItem from "./components/SortableItem";
import FormComponent from "./components/FormComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Box,
    Button,
    Grid2,
    TextField,
    Typography,
    Paper,
} from "@mui/material";

type ParamType = {
    param: number;
    order: number;
};

type ItemType = {
    text: string;
    code: string;
    params?: ParamType[];
};

type FormInputType = {
    title: string;
    description: string;
    consumer: ItemType[];
};

const MainForm: React.FC = () => {
    const [rulesList, setRulesList] = useState<ItemType[]>([
        {
            text: "Son [] gündeki en son [] veriyi incele",
            code: "SDFDFHHF",
        },
        {
            text: "bir haftadaki son [] veriyi incele",
            code: "DFSGFG",
        },
        {
            text: "Son [] gündeki en son [] veriyi ve son [] veriyi incele",
            code: "HYRTGT",
        },
    ]);

    const [formIsOpen, setFormIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<ItemType | null>();
    const [consumerList, setConsumerList] = useState<ItemType[]>([]);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        const activeListItem = rulesList.find(
            (item) => item.code === active.id
        );
        setActiveItem(activeListItem);
    };
    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        consumer: yup
            .array()
            .of(
                yup.object().shape({
                    text: yup.string().required(),
                    code: yup.string().required(),
                })
            )
            .min(1, "Rules can not be empty")
            .default([]),
    });

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputType>({
        resolver: yupResolver(schema),
        defaultValues: {
            consumer: consumerList,
        },
    });

    useEffect(() => {
        setValue("consumer", consumerList);
    }, [consumerList, setValue]);

    const onCloseFormHandler = () => {
        setActiveItem(null);
        setFormIsOpen(false);
    };
    const onSubmitFormHandler = (activeItem: ItemType) => {
        setConsumerList((prevList) => [...prevList, activeItem]);
        setRulesList((prevList) =>
            prevList.filter((item) => item.code !== activeItem.code)
        );
        console.log(consumerList);
    };
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
            console.log(over?.id);

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

    const onSubmit: SubmitHandler<FormInputType> = (data) => {
        console.log(data);
    };

    return (
        <>
            {formIsOpen && (
                <FormComponent
                    onSubmitHanlder={onSubmitFormHandler}
                    onCloseHanlder={onCloseFormHandler}
                    item={activeItem}
                ></FormComponent>
            )}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" gutterBottom></Typography>
                <Grid2 container spacing={3}>
                    <Grid2>
                        <TextField
                            label="Title"
                            fullWidth
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        ></TextField>
                    </Grid2>
                    <label htmlFor="title">Title</label>
                    <input {...register("title")} id="title" type="text" />
                    {errors.title && (
                        <p style={{ color: "red" }}>{errors.title.message}</p>
                    )}
                </Grid2>
                <div>
                    <label htmlFor="descr">Description</label>
                    <textarea
                        {...register("description")}
                        id="descr"
                    ></textarea>
                    {errors.description && (
                        <p style={{ color: "red" }}>
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                >
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <div
                            style={{
                                width: "300px",
                                minHeight: "400px",
                                padding: "8px",
                                backgroundColor: "#f4f4f4",
                                border: "1px solid #ddd",
                            }}
                        >
                            <h3>Rules List</h3>
                            {rulesList.map((item) => (
                                <DraggableItem
                                    key={item.code}
                                    id={item.code}
                                    label={item.text}
                                />
                            ))}
                        </div>
                        <DroppableList id="container">
                            <SortableContext
                                strategy={verticalListSortingStrategy}
                                items={consumerList.map((item) => item.code)}
                            >
                                {consumerList.map((item) => (
                                    <SortableItem
                                        key={item.code}
                                        id={item.code}
                                        label={item.text}
                                    ></SortableItem>
                                ))}
                                <input
                                    type="hidden"
                                    value={JSON.stringify(rulesList)}
                                    {...register("consumer")}
                                />
                                {errors.consumer && (
                                    <p style={{ color: "red" }}>
                                        {errors.consumer.message}
                                    </p>
                                )}
                            </SortableContext>
                        </DroppableList>
                    </div>
                </DndContext>
                <button>submit</button>
            </Box>
        </>
    );
};

export default MainForm;
