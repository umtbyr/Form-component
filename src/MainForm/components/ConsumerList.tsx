import { Grid, Paper, Typography } from "@mui/material";
import DroppableList from "./DroppableList";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { FormInputType, ItemType } from "../types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
type Props = {
    register: UseFormRegister<FormInputType>;
    errors: FieldErrors<FormInputType>;
    consumerList: ItemType[];
    sortableItemEdit: (code: string) => void;
    sortableItemDelete: (code: string) => void;
};

const ConsumerList: React.FC<Props> = ({
    sortableItemDelete,
    sortableItemEdit,
    consumerList,
    register,
    errors,
}) => {
    return (
        <Grid item xs={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <DroppableList id="container">
                    <SortableContext
                        strategy={verticalListSortingStrategy}
                        items={consumerList.map((item) => item.code)}
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

                        <input
                            type="hidden"
                            value={JSON.stringify(consumerList)}
                            {...register("consumer")}
                        />

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
                    </SortableContext>
                </DroppableList>
            </Paper>
        </Grid>
    );
};

export default ConsumerList;
