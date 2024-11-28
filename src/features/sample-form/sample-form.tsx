import { Box, Button, Grid2 } from "@mui/material";
import * as React from "react";
import { DndListInput, TextInput } from "../../components";
import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputType } from "../types";
import { validationSchema } from "./resolver";
import { RULES } from "./sample-rules";

type SampleFormProps = {};

export const SampleForm: React.FC<SampleFormProps> = () => {
    //react hook for registiration
    //validations

    const methods = useForm<FormInputType>({
        resolver: yupResolver(validationSchema),
    });

    const submitHandler = (data: any) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                onSubmit={methods.handleSubmit(submitHandler)}
            >
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
                            <TextInput name="title" label="title" />
                        </Grid2>
                        <Grid2>
                            <TextInput
                                name="description"
                                multiline
                                rows={4}
                                label="description"
                            />
                        </Grid2>
                        <Grid2>
                            <DndListInput items={RULES} name="rules" />
                        </Grid2>
                        <Grid2>
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
        </FormProvider>
    );
};
