import { Flex, Box, Text, Input } from "@chakra-ui/react";
import { MdModeEditOutline, MdClose } from "react-icons/md";
import { useState } from "react";

import { Column } from "../types/KanbanBoard";
import useColumns from "../hooks/board/useColumns";

type Props = {
  column: Column;
  handleColumnDragStart: (id: string) => void;
  handleColumnDragOver: (id: string) => void;
  handleColumnDrop: (e: any) => void;
};

const ColumnHeader = ({
  column,
  handleColumnDragStart,
  handleColumnDragOver,
  handleColumnDrop,
}: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>(column.name);

  const { updateColumnName } = useColumns();

  const toggleEditMode = () => {
    if (editMode === true) {
      updateColumnName(column.id, columnName);
    }
    setEditMode(!editMode);
  };

  const handleColumnNameChanged = (e: any) => {
    e.preventDefault();
    setColumnName(e.target.value);
  };

  return (
    <Box
      mb={4}
      onDragStart={(e) => handleColumnDragStart(column.id)}
      onDragOver={(e) => handleColumnDragOver(column.id)}
      onDrop={(e) => handleColumnDrop(e)}
      draggable
    >
      <Flex alignItems="baseline">
        <Box flex="1">
          {editMode ? (
            <Input
              size="sm"
              variant="filled"
              value={columnName}
              onChange={handleColumnNameChanged}
            />
          ) : (
            <Text fontSize="xl" mb={1}>
              {column.name}
            </Text>
          )}
        </Box>

        <Flex ml={2}>
          {!editMode ? (
            <MdModeEditOutline onClick={toggleEditMode} />
          ) : (
            <MdClose onClick={toggleEditMode} />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ColumnHeader;
