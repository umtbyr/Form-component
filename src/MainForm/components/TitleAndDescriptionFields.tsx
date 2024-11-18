import { Grid, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputType } from "../types";


type Props = {
    register: UseFormRegister<FormInputType>;
    errors: FieldErrors<FormInputType>;
};

const TİtleAndDescriptionFields: React.FC<Props> = ({register,errors}) => {
    return (
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
    );
};

export default TİtleAndDescriptionFields;
