import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

type Props = {
    id: string;
    children?: React.ReactNode;
};
//wrapper component for dropping funtionality.
const DroppableList: React.FC<Props> = ({ id, children }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <Box
            sx={{ minHeight: "400px", display: "flex", minWidth: "300px" }}
            ref={setNodeRef}
        >
            {children}
        </Box>
    );
};

export default DroppableList;
