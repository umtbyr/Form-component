import { Box } from "@mui/material";
import {
    Controller,
    useFieldArray,
    useFormContext,
    useWatch,
} from "react-hook-form";
import { ListItem } from "../list-item";
import { FormInputType, ItemType, ListType } from "../../../../MainForm/types";

type LeftContainerProps = {
    name: ListType;
};

export const LeftContainer: React.FC<LeftContainerProps> = ({ name }) => {
    const { control } = useFormContext<FormInputType>();

    const leftList = useWatch({ name, control });
    console.log(leftList);

    return (
        <Box
            sx={{ border: "1px solid red", width: "100%", minHeight: "300px" }}
        >
            {leftList.map((item, index) => {
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
