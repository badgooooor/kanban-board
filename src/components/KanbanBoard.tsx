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
            sm: "85%",
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
          _hover={{
            boxShadow: "0px 0px 15px 1px rgba(84,146,247,0.5)",
            transition: "box-shadow 0.5s",
          }}
        >
          <ColumnHeader
            column={column}
            handleColumnDragStart={handleColumnDragStart}
            handleColumnDragOver={handleColumnDragOver}
            handleColumnDrop={handleColumnDrop}
          />
          <Box maxHeight={"550px"} overflowY={"scroll"}>
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
        </Box>
      ))}
    </Flex>
  );
};

export default KanbanBoard;
