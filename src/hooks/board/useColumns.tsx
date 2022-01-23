import _ from "lodash";
import { useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { columnCardsLength } from "../../stores/cards";

import { columnState, orderedColumns } from "../../stores/columns";
import { Column } from "../../types/KanbanBoard";
import { v4 as uuidv4 } from "uuid";

const useColumns = () => {
  const [, setColumns] = useRecoilState(columnState);
  const columns = useRecoilValue(orderedColumns);
  const { columnLength, totalLength } = useRecoilValue(columnCardsLength);

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
    const cardListLength = columnLength[columnId] ?? 0;

    if (cardListLength === 0) {
      const updatedColumns = _.cloneDeep(columns).filter(
        (column) => column.id !== columnId
      );

      setColumns(updatedColumns);
    }
  };

  const canDelete = (columnId: string) => {
    const cardListLength = columnLength[columnId] ?? 0;

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

  const createColumn = (name: string) => {
    const newColumn: Column = {
      id: uuidv4(),
      order: totalLength + 1,
      name: name,
    };

    setColumns([...columns, newColumn]);
  };

  return {
    columns,
    handleColumnDragOver,
    handleColumnDragStart,
    handleColumnDrop,
    canDelete,
    createColumn,
    updateColumnName,
    deleteColumn,
  };
};

export default useColumns;
