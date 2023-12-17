import { chakra, Image, Flex, Icon, HStack } from "@chakra-ui/react";
import { FaReddit, FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      bg="gray.300"
      color="black"
      py="4"
      mt={'auto'}
    >
      <HStack spacing="1">
        <Icon as={FaGithub} boxSize="6" />
        <Icon as={FaReddit} boxSize="6" />
        <Icon as={FaFacebook} boxSize="6" />
      </HStack>
      <Flex align="center">
        <Image
          src="https://www.svgrepo.com/show/525382/home-wifi-angle.svg"
          alt="Company Logo"
          h="8"
          w="auto"
          mr="2"
        />
        <chakra.a

          fontSize="lg"
          fontWeight="bold"
          href="#"
          _hover={{
            textDecoration: "underline",
          }}
        >
          Event Planner
        </chakra.a>
      </Flex>
      <chakra.p right={0} fontSize="sm">&copy; {new Date().getFullYear()} All rights reserved.</chakra.p>
    </Flex>
  );
}
