import useCards from "./useCards";
import useColumns from "./useColumns";

const useBoard = () => {
  const { columns } = useColumns();
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
  };
};

export default useBoard;
