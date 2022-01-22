import { Flex, Box, Spacer } from "@chakra-ui/react";
import type { NextPage } from "next";

import DndContainer from "../src/components/KanbanBoard";

const IndexPage: NextPage = () => {
  return (
    <div>
      <Flex m={3} mb={0} py={2}>
        <Box>Kanban Board</Box>
        <Spacer />
        <Box>Box 2</Box>
      </Flex>
      <DndContainer />
    </div>
  );
};

export default IndexPage;
