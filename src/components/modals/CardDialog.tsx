import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Stack,
  Input,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import useArchive from "../../hooks/archive/useArchive";
import useCards from "../../hooks/board/useCards";
import useColumns from "../../hooks/board/useColumns";

import { Card } from "../../types/KanbanBoard";
import StatusBadge from "../StatusBadge";

type Props = {
  card: Card;
  isOpen: boolean;
  onClose: () => void;
};

const CardDialog = ({ isOpen, onClose, card }: Props) => {
  const [name, setName] = useState<string>(card.name);
  const [description, setDescription] = useState<string>(card.description);
  const [status, setStatus] = useState<"open" | "closed">(card.status);

  const { updateCard, removeCard } = useCards();
  const { getColumn } = useColumns();
  const { createArchiveCard } = useArchive();

  const cardColumn = useMemo(() => {
    return getColumn(card.columnId);
  }, [getColumn, card.columnId]);

  const handleClose = () => {
    updateCard({
      ...card,
      name,
      description,
      status,
    });
    onClose();
  };

  const handleArchiveAndClose = () => {
    createArchiveCard(
      {
        ...card,
        name,
        description,
      },
      cardColumn
    );
    removeCard(card);
    onClose();
  };

  const handleNameChanged = (e: any) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDescriptionChanged = (e: any) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleStatusChanged = () => {
    if (status === "open") {
      setStatus("closed");
    } else if (status === "closed") {
      setStatus("open");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center">
            <Text fontSize="xl" mr={2}>
              {card.name}
            </Text>
            <StatusBadge status={card.status} />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={2}>
            <Input value={name} onChange={handleNameChanged} size="lg" />
            <Textarea
              value={description}
              onChange={handleDescriptionChanged}
              size="lg"
            />
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="card-status" mb="0">
                Status <StatusBadge status={status} />
              </FormLabel>
              <Switch
                id="card-status"
                isChecked={status === "open"}
                onChange={handleStatusChanged}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Save
          </Button>
          <Button colorScheme="gray" mr={3} onClick={handleArchiveAndClose}>
            Archive
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardDialog;
