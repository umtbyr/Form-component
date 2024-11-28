import React, { CSSProperties } from "react";
import { ItemType } from "../../../../features/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, IconButton, Typography } from "@mui/material";
interface SortableItemProps {
    id: string;
    data: ItemType | undefined;
    hidden?: boolean;
    showIcon?: boolean;
    onUpdate?: (id: string) => void;
    onDelete?: (id: string) => void;
    isEditing?: boolean;
}
export const SortableItem: React.FC<SortableItemProps> = ({
    id,
    data,
    hidden,
    showIcon,
    onUpdate,
    onDelete,
    isEditing,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id,
            data: data,
        });

    const style: CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        visibility: isEditing ? "visible" : hidden ? "hidden" : "visible",
        border: "1px solid gray",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
        cursor: "grab",
        display: "flex",
    };

    return (
        <Box ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Typography sx={{ flex: 1 }}>{data?.text}</Typography>

            <Box
                sx={{
                    display: "flex",
                    visibility: isEditing
                        ? "visible"
                        : hidden || !showIcon
                        ? "hidden"
                        : "visible",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                        onClick={() => onDelete?.(id)}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <DeleteOutlineOutlinedIcon
                            sx={{
                                "&:hover": {
                                    color: "red",
                                },
                            }}
                        ></DeleteOutlineOutlinedIcon>
                    </IconButton>
                    <IconButton
                        onClick={() => onUpdate?.(id)}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <SettingsOutlinedIcon></SettingsOutlinedIcon>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};
