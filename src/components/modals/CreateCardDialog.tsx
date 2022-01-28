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
  Select,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import StatusBadge from "../StatusBadge";

import useCards from "../../hooks/board/useCards";

import { orderedColumns } from "../../stores/columns";
import useCreateCard from "../../hooks/form/useCreateCard";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateCardDialog = ({ isOpen, onClose }: Props) => {
  const columnList = useRecoilValue(orderedColumns);

  const {
    value,
    nameError,
    resetForm,
    handleColumnChanged,
    handleDescriptionChanged,
    handleNameChanged,
    handleStatusChanged,
  } = useCreateCard(columnList);

  const { createCard } = useCards();

  const handleCreateCard = () => {
    createCard({
      id: uuidv4(),
      columnId: value.column,
      name: value.name,
      description: value.description,
      status: value.status,
      createdAt: new Date(),
      order: 0,
    });
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center">
            <Text fontSize="xl" mr={2}>
              Create new card
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={2}>
            <Select placeholder="Select Column" onChange={handleColumnChanged}>
              {columnList.map((column) => (
                <option key={`dialog-create-card-${column}`} value={column.id}>
                  {column.name}
                </option>
              ))}
            </Select>
            <Input
              value={value.name}
              placeholder="Name"
              onChange={handleNameChanged}
              isInvalid={nameError}
            />
            <Input
              value={value.description}
              placeholder="Description"
              onChange={handleDescriptionChanged}
            />
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="card-status" mb="0">
                Status <StatusBadge status={value.status} />
              </FormLabel>
              <Switch
                id="card-status"
                isChecked={value.status === "open"}
                onChange={handleStatusChanged}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreateCard}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardDialog;
