import {
  Box,
  Badge,
  Flex,
  Spacer,
  Stack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import useArchive from "../hooks/archive/useArchive";
import StatusBadge from "./StatusBadge";

const ArchiveList = () => {
  const { archiveCardList } = useArchive();
  console.log(`list`, archiveCardList);

  return (
    <Box m={1} mx={2} p={1}>
      <Stack spacing={2}>
        <Text>Archive Cards</Text>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 5 }}
          spacingX="10px"
          spacingY="20px"
        >
          {archiveCardList.map((archiveCard) => (
            <Box
              p={2}
              key={`archive-card-${archiveCard.id}`}
              bg={`gray.300`}
              height="80px"
            >
              <Flex alignItems="center">
                <Flex alignItems="center">
                  <Text mr={2}>{archiveCard.name}</Text>
                  <Badge>{archiveCard.columnSnapshot.name}</Badge>
                </Flex>
                <Spacer />
                <StatusBadge status={archiveCard.status} />
              </Flex>
              <Text fontSize="sm">{archiveCard.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default ArchiveList;
