import React, { useContext, useEffect, useState } from "react";
import FormComponent from "./components/FormComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Grid } from "@mui/material";
import TİtleAndDescriptionFields from "./components/TitleAndDescriptionFields";
import SoureList from "./components/SourceList";
import ConsumerList from "./components/ConsumerList";
import { FormInputType, ItemType, ParamType } from "./types";
import { createContext } from "react";
import { mainFormContextType } from "./types";
import DndProvider from "./components/dndProvider";

const mainFormContext = createContext<mainFormContextType | null>(null);
export const useMainFormContext = () => {
    const context = useContext(mainFormContext);
    if (!context) {
        throw new Error("context value can not be null!");
    } else {
        return context;
    }
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
    const [isEditing, setIsEditing] = useState(false);
    const [activeItem, setActiveItem] = useState<ItemType | null | undefined>(
        null
    );
    const [consumerList, setConsumerList] = useState<ItemType[]>([]);

    const mainCtxValue: mainFormContextType = {
        rulesList,
        setRulesList,
        activeItem,
        setActiveItem,
        formIsOpen,
        setFormIsOpen,
        consumerList,
        isEditing,
        setIsEditing,
        setConsumerList,
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
            .min(1, "Drag and drop a rule from the rule list.")
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
        if (isEditing) {
            toggleIsEditing();
        }
    };
    const onSubmitFormHandler = (
        activeItem: ItemType,
        paramsArray: ParamType[]
    ) => {
        if (isEditing) {
            toggleIsEditing();
        }
        setActiveItem((prev) => {
            if (!prev) {
                return null;
            }
            const updatedActiveItem = {
                ...prev,
                params: paramsArray as ParamType[],
            };
            setConsumerList((prev) => {
                const updatedConsumerArray = prev.filter(
                    (item) => item.code !== activeItem.code
                );
                return [...updatedConsumerArray, updatedActiveItem];
            });
            if (!isEditing) {
                setRulesList((prevList) =>
                    prevList.filter((item) => item.code !== activeItem.code)
                );
            }
        });
    };
    const sortableItemDelete = (code: string) => {
        setConsumerList((prev) => prev.filter((item) => item.code !== code));
    };
    const sortableItemEdit = (code: string) => {
        const itemToEdit = consumerList.find((item) => item.code === code);
        setIsEditing(true);
        setActiveItem(itemToEdit);
        setFormIsOpen(true);
    };

    const toggleIsEditing = () => {
        setIsEditing((prev) => !prev);
    };

    const onSubmit: SubmitHandler<FormInputType> = (data) => {
        console.log(data);
    };

    return (
        <mainFormContext.Provider value={mainCtxValue}>
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
                    <TİtleAndDescriptionFields
                        register={register}
                        errors={errors}
                    />
                    <DndProvider>
                        <Grid container spacing={3} mt={3}>
                            <SoureList sourceList={rulesList} />
                            <ConsumerList
                                consumerList={consumerList}
                                register={register}
                                errors={errors}
                                sortableItemDelete={sortableItemDelete}
                                sortableItemEdit={sortableItemEdit}
                            />
                        </Grid>
                    </DndProvider>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 3,
                        }}
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
                        isEditing={isEditing}
                        open={formIsOpen}
                        onSubmitHanlder={onSubmitFormHandler}
                        onCloseHanlder={onCloseFormHandler}
                        item={activeItem}
                    ></FormComponent>
                )}
            </Box>
        </mainFormContext.Provider>
    );
};

export default MainForm;
