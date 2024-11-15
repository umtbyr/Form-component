import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

type Props = {
    id: string;
    children?: React.ReactNode;
};

const DroppableList: React.FC<Props> = ({ id, children }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <Box sx={{ minHeight: "300px" }} ref={setNodeRef}>
            {children}
        </Box>
    );
};

export default DroppableList;
