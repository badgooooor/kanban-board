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
} from "@chakra-ui/react";
import { useState } from "react";
import useCards from "../../hooks/board/useCards";

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

  const { updateCard } = useCards();

  const handleClose = () => {
    updateCard({
      ...card,
      name,
      description,
      status,
    });
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
    <Modal isOpen={isOpen} onClose={handleClose}>
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
            <Input
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
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CardDialog;
