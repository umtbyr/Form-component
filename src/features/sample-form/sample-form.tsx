import { Box, Button, Grid2 } from "@mui/material";
import * as React from "react";
import { DndListInput, TextInput } from "../../components";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputType, ItemType, ListType } from "../../MainForm/types";

const sourceList: ItemType[] = [
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
];

type SampleFormProps = {};

export const SampleForm: React.FC<SampleFormProps> = () => {
    //react hook for registiration
    //validations

    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
        leftList: yup
            .array()
            .of(
                yup.object().shape({
                    text: yup.string().required(),
                    code: yup.string().required(),
                })
            )
            .required()

            .min(1, "List should not be empty"),
        rightList: yup
            .array()
            .of(
                yup.object().shape({
                    text: yup.string().required(),
                    code: yup.string().required(),
                })
            )
            .required(),
    });

    const methods = useForm<FormInputType>({
        resolver: yupResolver(schema),
        defaultValues: {
            leftList: (sourceList as ItemType[]) || ([] as ItemType[]),
            rightList: [] as ItemType[],
        },
    });

    const { control } = methods;

    const leftList = useFieldArray<FormInputType>({
        control,
        name: "leftList" as ListType,
    });
    const rightList = useFieldArray<FormInputType>({
        control,
        name: "rightList" as ListType,
    });

    return (
        <FormProvider {...methods}>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    border: "solid 2px #666",
                    p: 3,
                    minHeight: "400px",
                    my: 10,
                    mx: "auto",
                    bgcolor: "#f2f2f2",
                }}
            >
                <Grid2 container direction="column" spacing={2}>
                    <Grid2>
                        <TextInput name="title" />
                    </Grid2>
                    <Grid2>
                        <TextInput name="description" multiline rows={4} />
                    </Grid2>
                    <Grid2>
                        <DndListInput
                            leftList={leftList}
                            rightList={rightList}
                        />
                    </Grid2>
                    <Grid2>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </FormProvider>
    );
};
