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
import { Box, Button, Grid, TextField, Typography, Paper } from "@mui/material";

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
        clearErrors,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FormInputType>({
        resolver: yupResolver(schema),
        defaultValues: {
            consumer: consumerList,
        },
    });

    useEffect(() => {
        setValue("consumer", consumerList);
        if (consumerList.length > 0) {
            clearErrors("consumer");
        } else {
            trigger("consumer");
        }
    }, [consumerList, setValue, trigger, clearErrors]);

    const onCloseFormHandler = () => {
        setActiveItem(null);
        setFormIsOpen(false);
    };
    const onSubmitFormHandler = (activeItem: ItemType) => {
        setConsumerList((prevList) => [...prevList, activeItem]);
        setRulesList((prevList) =>
            prevList.filter((item) => item.code !== activeItem.code)
        );
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
        <Box
            sx={{
                border: "1px solid black",
                borderRadius: "8px",
            }}
        >
            <Box
                sx={{ mx: 3, my: 5 }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h4" gutterBottom></Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            fullWidth
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        ></TextField>
                    </Grid>
                </Grid>
                <DndContext
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                >
                    <Grid container spacing={3} mt={3}>
                        <Grid item xs={6}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                }}
                            >
                                <Typography
                                    sx={{ textAlign: "center" }}
                                    variant="h6"
                                >
                                    Rule List
                                </Typography>
                                {rulesList.map((item) => (
                                    <DraggableItem
                                        key={item.code}
                                        id={item.code}
                                        label={item.text}
                                    />
                                ))}
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <DroppableList id="container">
                                    <SortableContext
                                        strategy={verticalListSortingStrategy}
                                        items={consumerList.map(
                                            (item) => item.code
                                        )}
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
                            </Paper>
                        </Grid>
                    </Grid>
                </DndContext>
                <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mb: 5, width: "30%" }}
                    >
                        submit
                    </Button>
                </Box>
            </Box>
            {formIsOpen && (
                <FormComponent
                    onSubmitHanlder={onSubmitFormHandler}
                    onCloseHanlder={onCloseFormHandler}
                    item={activeItem}
                ></FormComponent>
            )}
        </Box>
    );
};

export default MainForm;
