import _ from "lodash";
import { useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { columnCardsLength } from "../../stores/cards";

import { columnState, orderedColumns } from "../../stores/columns";
import { Column } from "../../types/KanbanBoard";

const useColumns = () => {
  const [, setColumns] = useRecoilState(columnState);
  const columns = useRecoilValue(orderedColumns);
  const columnsLength = useRecoilValue(columnCardsLength);

  const dragColumn = useRef<string | null>();
  const dragOverColumn = useRef<string | null>();

  const handleColumnDragStart = (columnId: string) => {
    dragColumn.current = columnId;
  };

  const handleColumnDragOver = (columnId: string) => {
    dragOverColumn.current = columnId;
  };

  const updateColumns = (
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

  const updateColumnName = (columnId: string, updatedName: string) => {
    const updatedColumns = _.cloneDeep(columns);

    const columnIdx = columns.findIndex((column) => column.id === columnId);
    updatedColumns[columnIdx].name = updatedName;

    setColumns(updatedColumns);
  };

  const deleteColumn = (columnId: string) => {
    const cardListLength = columnsLength[columnId] ?? 0;

    if (cardListLength === 0) {
      const updatedColumns = _.cloneDeep(columns).filter(
        (column) => column.id !== columnId
      );

      setColumns(updatedColumns);
    }
  };

  const canDelete = (columnId: string) => {
    const cardListLength = columnsLength[columnId] ?? 0;

    return cardListLength === 0;
  };

  const handleColumnDrop = (e: any) => {
    if (dragColumn.current && dragOverColumn.current) {
      const updatedColumns = updateColumns(
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
    updateColumnName,
    canDelete,
    deleteColumn,
  };
};

export default useColumns;