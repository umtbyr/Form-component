import { Box } from "@mui/material";
import {
    Controller,
    useFieldArray,
    useFormContext,
    useWatch,
} from "react-hook-form";
import { ListItem } from "../list-item";
import { FormInputType, ItemType, ListType } from "../../../../MainForm/types";

type RightContainerProps = {
    name: ListType;
};

export const RightContainer: React.FC<RightContainerProps> = ({ name }) => {
    const { control } = useFormContext<FormInputType>();

    // Access the fields for the given list (leftList or rightList)
    const rightList = useWatch({ name, control });
    // console.log(fields);

    return (
        <Box
            sx={{ border: "1px solid red", width: "100%", minHeight: "300px" }}
        >
            {rightList.map((item, index) => {
                return (
                    <Controller
                        key={item.code}
                        name={`${name}.${index}`}
                        control={control}
                        render={() => (
                            <div>
                                <ListItem text={item.text} code={item.code} />
                            </div>
                        )}
                    />
                );
            })}
        </Box>
    );
};
