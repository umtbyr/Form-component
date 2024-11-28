import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type CustomTextFieldProps = TextFieldProps & {
    name: string;
};

export const TextInput: React.FC<CustomTextFieldProps> = ({
    name,
    ...rest
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const errorMessage = errors[name]?.message;
                return (
                    <TextField
                        error={!!errorMessage}
                        {...field}
                        {...rest}
                        value={field.value || ""}
                    />
                );
            }}
        />
    );
};
