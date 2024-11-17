import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
type Props = {
    id: string;
    label: string;
};

const DraggableItem: React.FC<Props> = ({ id, label }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style: React.CSSProperties = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        transition: "none",
        margin: "4px",
        padding: "8px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#fff",
        cursor: "pointer",
        width: "100%",
        boxSizing: "border-box",
    };

    return (
        <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Typography component="p">{label}</Typography>
        </Box>
    );
};

export default DraggableItem;
