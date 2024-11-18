import { Box, Grid, Paper, Typography } from "@mui/material";
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py:2
                    }}
                >
                    {sourceList.map((item) => (
                        <DraggableItem
                            key={item.code}
                            id={item.code}
                            label={item.text}
                        />
                    ))}
                </Box>
            </Paper>
        </Grid>
    );
};

export default SourceList;
