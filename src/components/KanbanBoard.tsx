import _ from "lodash";
import { Flex, Box } from "@chakra-ui/react";

import ColumnHeader from "./ColumnHeader";
import ColumnCard from "./ColumnCard";

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
            onDragEnter={(e) => handleDragEnterColumn(column.id)}
            onDragOver={(e) => {
              handleDragOver(e);
            }}
            onDrop={(e) => {
              handleDrop(e);
              handleColumnDrop(e);
            }}
          >
            <ColumnHeader
              column={column}
              handleColumnDragStart={handleColumnDragStart}
              handleColumnDragOver={handleColumnDragOver}
              handleColumnDrop={handleColumnDrop}
            />
            {cards
              .filter((item) => item.columnId === column.id)
              .map((card) => (
                <ColumnCard
                  key={`card-${card.id}`}
                  card={card}
                  handleDragOverItem={handleDragOverItem}
                  handleDragStart={handleDragStart}
                />
              ))}
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default KanbanBoard;
