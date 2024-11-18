import { Grid, Paper, Typography } from "@mui/material";
import { ItemType } from "../types";
import DraggableItem from "./DraggableItem";

type Props = {
    sourceList: ItemType[];
};

const SourceList: React.FC<Props> = ({ sourceList }) => {
    return (
        <Grid item xs={6}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                }}
            >
                <Typography sx={{ textAlign: "center" }} variant="h6">
                    Rule List
                </Typography>
                {sourceList.map((item) => (
                    <DraggableItem
                        key={item.code}
                        id={item.code}
                        label={item.text}
                    />
                ))}
            </Paper>
        </Grid>
    );
};

export default SourceList;
