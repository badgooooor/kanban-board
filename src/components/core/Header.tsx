import _ from "lodash";
import {
  Flex,
  Stack,
  Box,
  Button,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdList, MdPlaylistAdd, MdFolder } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

import CreateCardDialog from "../modals/CreateCardDialog";
import CreateColumnDialog from "../modals/CreateColumnDialog";

const Header = () => {
  const router = useRouter();

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

  const renderPageButton = () => {
    if (_.includes(router.pathname, "archive")) {
      return (
        <Link href="/" passHref>
          <Button
            leftIcon={<MdList />}
            colorScheme="gray"
            variant="solid"
            size={"sm"}
          >
            Board
          </Button>
        </Link>
      );
    } else {
      return (
        <Link href="/archive" passHref>
          <Button
            leftIcon={<MdFolder />}
            colorScheme="gray"
            variant="solid"
            size={"sm"}
          >
            Archives
          </Button>
        </Link>
      );
    }
  };

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
          onClick={onCreateColumnOpen}
        >
          New column
        </Button>
        {renderPageButton()}
      </Stack>
      <CreateCardDialog isOpen={isCreateCardOpen} onClose={onCreateCardClose} />
      <CreateColumnDialog
        isOpen={isCreateColumnOpen}
        onClose={onCreateColumnClose}
      />
    </Flex>
  );
};

export default Header;
