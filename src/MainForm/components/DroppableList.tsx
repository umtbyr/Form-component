import { useDroppable } from "@dnd-kit/core";

type Props = {
    id: string;
    children?: React.ReactNode;
};

const DroppableList: React.FC<Props> = ({ id, children }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div
            style={{
                width: "300px",
                padding: "8px",
                backgroundColor: "#f4f4f4",
                border: "1px solid #ddd",
            }}
            ref={setNodeRef}
        >
            {children}
        </div>
    );
};

export default DroppableList;
