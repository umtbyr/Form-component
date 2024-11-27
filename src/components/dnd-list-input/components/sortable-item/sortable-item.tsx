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
    isIconsHidden?: boolean;
    onSettings?: (id: string) => void;
    onDelete?: (id: string) => void;
}
export const SortableItem: React.FC<SortableItemProps> = ({
    id,
    data,
    hidden,
    isIconsHidden,
    onSettings,
    onDelete,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id,
            data: data,
        });
    const style: CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        visibility: hidden ? "hidden" : "visible",
        border: "1px solid gray",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
        cursor: "grab",
        display: "flex",
    };
    return (
        <Box ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Typography>{data?.text}</Typography>
            {isIconsHidden && (
                <>
                    <IconButton
                        onClick={() => onDelete?.(id)}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                    </IconButton>
                    <IconButton
                        onClick={() => onSettings?.(id)}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <SettingsOutlinedIcon></SettingsOutlinedIcon>
                    </IconButton>
                </>
            )}
        </Box>
    );
};
