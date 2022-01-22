import _ from "lodash";
import { Flex, Box, Text } from "@chakra-ui/react";

import useBoard from "../hooks/board/useBoard";

const KanbanBoard = () => {
  const {
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
  } = useBoard();

  return (
    <>
      <Flex m={1} p={1} wrap="wrap">
        {columns.map((column, idx) => (
          <Box
            margin={1}
            padding={2}
            bgColor="gray.200"
            width={`300px`}
            minHeight={`500px`}
            key={`group-${idx}`}
            onDragStart={(e) => {
              handleColumnDragStart(column.id);
            }}
            onDragEnter={(e) => handleDragEnterColumn(column.id)}
            onDragOver={(e) => {
              handleDragOver(e);
              handleColumnDragOver(column.id);
            }}
            onDrop={(e) => {
              handleDrop(e);
              handleColumnDrop(e);
            }}
            draggable
          >
            <Text fontSize="xl" mb={1}>
              {column.name}
            </Text>
            {cards
              .filter((item) => item.columnId === column.id)
              .map((item) => (
                <Box
                  bgColor={`whiteAlpha.300`}
                  minHeight={`70px`}
                  mb={1}
                  p={2}
                  key={`item-${item.id}`}
                  id={`item-${idx}-${item.id}`}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragOver={() => handleDragOverItem(item)}
                >
                  <Text>
                    {item.name} [{item.order}]
                  </Text>
                  <Text fontSize="sm">{item.description}</Text>
                </Box>
              ))}
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default KanbanBoard;
