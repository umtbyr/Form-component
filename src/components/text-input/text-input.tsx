import { Button, TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type CustomTextFieldProps = TextFieldProps & {
    name: string;
};

export const TextInput: React.FC<CustomTextFieldProps> = ({
    name,
    ...rest
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return <TextField {...field} {...rest} />;
            }}
        />
    );
};
