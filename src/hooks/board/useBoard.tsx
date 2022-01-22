import useCards from "./useCards";
import useColumns from "./useColumns";

const useBoard = () => {
  const {
    columns,
    handleColumnDragOver,
    handleColumnDragStart,
    handleColumnDrop,
  } = useColumns();
  const {
    cards,
    handleDragStart,
    handleDragEnterColumn,
    handleDragOver,
    handleDragOverItem,
    handleDrop,
  } = useCards();

  return {
    columns,
    cards,
    handleDragStart,
    handleDragEnterColumn,
    handleDragOver,
    handleDragOverItem,
    handleDrop,
    handleColumnDragOver,
    handleColumnDragStart,
    handleColumnDrop,
  };
};

export default useBoard;
