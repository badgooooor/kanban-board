import { Box, Text, useDisclosure } from "@chakra-ui/react";

import CardDialog from "./modals/CardDialog";

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
      mb={1}
      p={2}
      key={`item-${card.id}`}
      id={`item-${card.id}`}
      onDragStart={() => handleDragStart(card)}
      onDragOver={() => handleDragOverItem(card)}
      onClick={onOpen}
      draggable
    >
      <Text>{card.name}</Text>
      <Text fontSize="sm">{card.description}</Text>

      <CardDialog isOpen={isOpen} onClose={onClose} card={card} />
    </Box>
  );
};

export default ColumnCard;
