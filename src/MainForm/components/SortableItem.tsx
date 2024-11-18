import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
type SortableItemProps = {
    id: string;
    label: string;
    onDelete: (code: string) => void;
    onEdit: (code: string) => void;
};

const SortableItem: React.FC<SortableItemProps> = ({
    id,
    label,
    onDelete,
    onEdit,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style: React.CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        borderRadius: "4px",
        cursor: "grab",
        width: "100%",
        boxSizing: "border-box",
    };

    return (
        <Box
            style={style}
            ref={setNodeRef}
            {...attributes}
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
            <Typography {...listeners} component="p" sx={{ flex: 1 }}>
                {label}
            </Typography>
            <IconButton
                onClick={() => {
                    onDelete(id);
                }}
            >
                <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <IconButton onClick={() => onEdit(id)}>
                <SettingsIcon />
            </IconButton>
        </Box>
    );
};

export default SortableItem;
