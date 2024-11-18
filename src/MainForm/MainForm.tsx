import React, { useContext, useEffect, useState } from "react";
import DialogComponent from "./components/DialogComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Grid } from "@mui/material";
import TİtleAndDescriptionFields from "./components/TitleAndDescriptionFields";
import SourceList from "./components/SourceList";
import ConsumerList from "./components/ConsumerList";
import { FormInputType, ItemType, ParamType } from "./types";
import { createContext } from "react";
import { mainFormContextType } from "./types";
import DndProvider from "./components/DndProvider";

//form context
const mainFormContext = createContext<mainFormContextType | null>(null);

//custom hook that checks context is not null.
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

    //valiadation shecma that uses yup library.
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

    //form react hook
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
    //since we programatically change the value of the consumerList, we should check the error state of it and trigger if there is any.
    useEffect(() => {
        setValue("consumer", consumerList);
        if (consumerList.length > 0) {
            clearErrors("consumer");
        } else {
            trigger("consumer");
        }
    }, [consumerList, setValue, trigger, clearErrors]);

    //dialog close handler which we pass to dialog via props.
    const onCloseFormHandler = () => {
        //clears the active item.
        setActiveItem(null);
        setFormIsOpen(false);
        //if dialog opens for any editing purposes set the editing state to false.
        if (isEditing) {
            setIsEditing(false);
        }
    };
    //dialog submit or edit handler which we pass to dialog via props.
    const onSubmitOrEditFormHandler = (
        activeItem: ItemType,
        paramsArray: ParamType[]
    ) => {
        setActiveItem((prev) => {
            //null check for active item.
            if (!prev) {
                return null;
            }
            //create an Item object with proper params that we get from the arguments of the func.
            const updatedActiveItem = {
                ...prev,
                params: paramsArray as ParamType[],
            };
            //we have two possible cases. one if we editing an item, in that case we should get rid of the old item first.
            if (isEditing) {
                setConsumerList((prev) => {
                    const updatedConsumerArray = prev.filter(
                        (item) => item.code !== activeItem.code
                    );
                    return [updatedActiveItem, ...updatedConsumerArray];
                });
            } else {
                //in the second case we don't need to delete any item from consumerList but we should delete the item we dragged from the sourceList(rulesList).
                setConsumerList((prev) => [updatedActiveItem, ...prev]);
                setRulesList((prevList) =>
                    prevList.filter((item) => item.code !== activeItem.code)
                );
            }
        });
    };
    //sumbit handler for main item it logs the form data for demo purpose.
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
                            <SourceList sourceList={rulesList} />
                            <ConsumerList register={register} errors={errors} />
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
                    <DialogComponent
                        isEditing={isEditing}
                        open={formIsOpen}
                        onSubmitOrEditHanlder={onSubmitOrEditFormHandler}
                        onCloseHanlder={onCloseFormHandler}
                        item={activeItem}
                    ></DialogComponent>
                )}
            </Box>
        </mainFormContext.Provider>
    );
};

export default MainForm;
