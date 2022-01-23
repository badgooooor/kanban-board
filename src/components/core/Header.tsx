import {
  Flex,
  Stack,
  Box,
  Button,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { MdPlaylistAdd } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import CreateCardDialog from "../modals/CreateCardDialog";

const Header = () => {
  const {
    isOpen: isCreateCardOpen,
    onOpen: onCreateCardOpen,
    onClose: onCreateCardClose,
  } = useDisclosure();
  const {
    isOpen: isCreateColumnOpen,
    onOpen: onCreateColumnOpen,
    onClose: onCreateColumnClose,
  } = useDisclosure();

  return (
    <Flex m={3} mb={0} py={2}>
      <Box>Kanban Board</Box>
      <Spacer />
      <Stack direction="row" spacing={2}>
        <Button
          leftIcon={<IoCreateOutline />}
          colorScheme="pink"
          variant="solid"
          size={"sm"}
          onClick={onCreateCardOpen}
        >
          New card
        </Button>
        <Button
          leftIcon={<MdPlaylistAdd />}
          colorScheme="green"
          variant="solid"
          size={"sm"}
        >
          New column
        </Button>
      </Stack>
      <CreateCardDialog isOpen={isCreateCardOpen} onClose={onCreateCardClose} />
    </Flex>
  );
};

export default Header;
