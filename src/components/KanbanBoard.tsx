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
    <Flex m={1} p={1} width={`100vw`} minHeight={"100vh"} overflowX="scroll">
      {columns.map((column, idx) => (
        <Box
          margin={1}
          padding={2}
          bgColor="gray.200"
          minWidth={{
            sm: "99%",
            md: `300px`,
          }}
          height="fit-content"
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
  );
};

export default KanbanBoard;
