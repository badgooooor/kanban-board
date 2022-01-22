import { useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { columnState, orderedColumns } from "../../stores/columns";
import { Column } from "../../types/KanbanBoard";

const useColumns = () => {
  const [, setColumns] = useRecoilState(columnState);
  const columns = useRecoilValue(orderedColumns);

  const dragColumn = useRef<string | null>();
  const dragOverColumn = useRef<string | null>();

  const handleColumnDragStart = (columnId: string) => {
    console.log("col ", columnId);

    dragColumn.current = columnId;
  };

  const handleColumnDragOver = (columnId: string) => {
    console.log("drag over ", columnId);
    dragOverColumn.current = columnId;
  };

  const updateColumn = (
    targetColumnId: string,
    overColumnId: string
  ): Column[] => {
    const newColumns = columns.filter((column) => column.id !== targetColumnId);

    const targetIndex = columns.findIndex(
      (column) => column.id === targetColumnId
    );
    const targetColumn = columns[targetIndex];

    const overIndex = columns.findIndex((column) => column.id === overColumnId);

    newColumns.splice(overIndex, 0, targetColumn);

    return newColumns.map((column, idx) => {
      return {
        ...column,
        order: idx + 1,
      };
    });
  };

  const handleColumnDrop = (e: any) => {
    console.log(`drop`, dragOverColumn.current, dragColumn.current);
    if (dragColumn.current && dragOverColumn.current) {
      const updatedColumns = updateColumn(
        dragColumn.current,
        dragOverColumn.current
      );
      setColumns(updatedColumns);
    }

    dragColumn.current = null;
    dragOverColumn.current = null;
  };

  return {
    columns,
    handleColumnDragOver,
    handleColumnDragStart,
    handleColumnDrop,
  };
};

export default useColumns;
