import { Box, Grid, Paper, Typography } from "@mui/material";
import DroppableList from "./DroppableList";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { FormInputType } from "../types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMainFormContext } from "../MainForm";
type Props = {
    register: UseFormRegister<FormInputType>;
    errors: FieldErrors<FormInputType>;
};

const ConsumerList: React.FC<Props> = ({ register, errors }) => {
    //consuming the context that is provided from mainForm
    const {
        setConsumerList,
        setIsEditing,
        setFormIsOpen,
        setActiveItem,
        consumerList,
    } = useMainFormContext();
    //delete and edit item functionallity.
    const sortableItemDelete = (code: string) => {
        setConsumerList((prev) => prev.filter((item) => item.code !== code));
    };
    const sortableItemEdit = (code: string) => {
        const itemToEdit = consumerList.find((item) => item.code === code);
        setIsEditing(true);
        setActiveItem(itemToEdit);
        setFormIsOpen(true);
    };

    return (
        <Grid item xs={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <DroppableList id="container">
                    <SortableContext
                        strategy={verticalListSortingStrategy}
                        items={consumerList.map((item) => item.code)}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center ",
                            }}
                        >
                            {consumerList.map((item) => (
                                <SortableItem
                                    onEdit={sortableItemEdit}
                                    onDelete={sortableItemDelete}
                                    key={item.code}
                                    id={item.code}
                                    label={item.text}
                                ></SortableItem>
                            ))}
                        </Box>

                        <input
                            type="hidden"
                            value={JSON.stringify(consumerList)}
                            {...register("consumer")}
                        />
                        <Box sx={{display:'flex', justifyContent:'center'}}>
                            {errors.consumer && (
                                <Typography
                                    sx={{
                                        mt: 2,
                                        color: "red",
                                        textAlign: "center",
                                    }}
                                >
                                    {errors.consumer.message}
                                </Typography>
                            )}
                        </Box>
                    </SortableContext>
                </DroppableList>
            </Paper>
        </Grid>
    );
};

export default ConsumerList;
