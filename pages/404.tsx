import { Center, Flex, Stack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <Center h="100vh">
      <Stack justifyContent="center">
        <Flex alignItems={"center"}>
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="xl"
            fontWeight="extrabold"
          >
            404
          </Text>
          <Text fontSize={"xl"}>
            , You try to find something, but there&apos;s nothing here
          </Text>
        </Flex>
        <Link passHref href={"/"}>
          Back to home
        </Link>
      </Stack>
    </Center>
  );
};

export default NotFoundPage;
