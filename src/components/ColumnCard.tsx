import { Box, Text, Flex, Spacer, useDisclosure } from "@chakra-ui/react";

import CardDialog from "./modals/CardDialog";
import StatusBadge from "./StatusBadge";

import { Card } from "../types/KanbanBoard";

type Props = {
  card: Card;
  handleDragStart: (card: Card) => void;
  handleDragOverItem: (card: Card) => void;
};

const ColumnCard = ({ card, handleDragStart, handleDragOverItem }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bgColor={`whiteAlpha.300`}
      minHeight={`70px`}
      mb={4}
      p={2}
      key={`item-${card.id}`}
      id={`item-${card.id}`}
      onDragStart={() => handleDragStart(card)}
      onDragOver={() => handleDragOverItem(card)}
      onClick={onOpen}
      _hover={{
        boxShadow: "0px 0px 15px 1px rgba(14,60,165,0.5)",
        transition: "box-shadow 0.5s",
      }}
      draggable
    >
      <Flex alignItems="center">
        <Text>{card.name}</Text>
        <Spacer />
        <StatusBadge status={card.status} />
      </Flex>
      <Box maxW={"100%"}>
        <Text fontSize="sm" maxW={"250px"} textOverflow={"ellipsis"}>
          {card.description}
        </Text>
      </Box>

      <CardDialog isOpen={isOpen} onClose={onClose} card={card} />
    </Box>
  );
};

export default ColumnCard;
