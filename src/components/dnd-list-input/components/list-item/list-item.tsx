import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { ItemType } from "../../../../MainForm/types";
type ListItemProps = {
    text: string;
    code: string;
};
export const ListItem: React.FC<ListItemProps> = ({ text, code }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: code });
    const style: React.CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        borderRadius: "4px",
        cursor: "grab",
        width: "80%",
        boxSizing: "border-box",
    };

    return (
        <Box
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            sx={{
                border: "0.5px solid black",
                py: 2,
                px: 1,
                m: 1,
                display: "flex",
                gap: 1,
                alignItems: "center",
                height: "100px",
                justifyContent: "center",
            }}
        >
            <Typography component="p" sx={{ flex: 1 }}>
                {text}
            </Typography>
        </Box>
    );
};

{
    /*             <IconButton
    onClick={() => {
        onDelete(id);
    }}
>
    <DeleteIcon sx={{ color: "red" }} />
</IconButton>
<IconButton onClick={() => onEdit(id)}>
    <SettingsIcon />
</IconButton> */
}
