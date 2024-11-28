import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { countSquareBrackets } from "../../utils/utils";
import { InputFields, ItemType, ParamType } from "../../../../features/types";
import * as yup from "yup";
import {
    Box,
    TextField,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Close } from "@mui/icons-material";
type Props = {
    item: ItemType | undefined | null;
    onCloseHanlder: () => void;
    OnSubmitHandler: (item: ItemType, paramsArray: ParamType[]) => void;
    open: boolean;
    isEditing?: boolean;
};

export const InputDialog: React.FC<Props> = ({
    item,
    onCloseHanlder,
    OnSubmitHandler,
    open,
    isEditing,
}) => {
    if (!item || !item.text) {
        return <p>No items avaliable</p>;
    }

    const paramsLength = countSquareBrackets(item.text);

    const Inputs = Array.from(
        { length: paramsLength },
        (_, index) => `input${index + 1}`
    );

    const schema = yup.object().shape(
        Inputs.reduce((acc, inputName) => {
            acc[inputName] = yup
                .number()
                .positive()
                .required(`${inputName} is required`)
                .typeError(`${inputName} must be a number`);
            return acc;
        }, {} as Record<string, yup.Schema<number>>)
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputFields>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<InputFields> = (inputs) => {
        const paramsArray = Object.values(inputs).map((input, index) => {
            return {
                param: input,
                order: index,
            } as ParamType;
        });

        OnSubmitHandler(item, paramsArray.reverse());
        onCloseHanlder();
    };

    return (
        <>
            <Dialog open={open}>
                <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
                    {isEditing ? "Edit Rule" : "Create Rule"}
                </DialogTitle>
                <IconButton
                    onClick={onCloseHanlder}
                    aria-label="close"
                    sx={(theme) => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <Close />
                </IconButton>
                <DialogContent dividers sx={{ p: 5 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        component="form"
                    >
                        <Typography
                            component="p"
                            sx={{ mb: 2, fontSize: "1.2rem" }}
                        >
                            {item.text}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 3 }}>
                            {Inputs.map((name, index) => (
                                <TextField
                                    defaultValue={item.params?.[index]?.param}
                                    key={name}
                                    fullWidth
                                    {...register(name)}
                                    type="number"
                                    placeholder={name}
                                    error={!!errors[name]}
                                    helperText={errors[name]?.message}
                                ></TextField>
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mx: 3.5,
                        my: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {isEditing ? "Edit" : "Submit"}
                    </Button>
                    <Button
                        variant="outlined"
                        type="button"
                        onClick={onCloseHanlder}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
