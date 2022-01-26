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
} from "@chakra-ui/react";
import useColumns from "../../hooks/board/useColumns";

import useCreateColumn from "../../hooks/form/useCreateColumn";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateColumnDialog = ({ isOpen, onClose }: Props) => {
  const { name, nameError, resetForm, handleNameChanged } = useCreateColumn();
  const { createColumn } = useColumns();

  const handleCreateColumn = () => {
    createColumn(name);
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
            <Input
              value={name}
              placeholder="Name"
              onChange={handleNameChanged}
              isInvalid={nameError}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleCreateColumn}
            disabled={nameError}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateColumnDialog;
