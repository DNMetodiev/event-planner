import { Box, Flex, Text, Link } from '@chakra-ui/react';
import './Navbar.css';

const Navbar = () => {
  return (
    <Box width="100%" px={4} py={2} shadow="md" bg="blue.500">
      <Flex justify="space-between" align="center" width="100%">
        <Text fontSize="xl" fontWeight="bold" color="white">
          Event Planner
        </Text>
        <Flex>
          <Link px={2} color="white" href="/">Home</Link>
          <Link px={2} color="white" href="/about">About</Link>
          <Link px={2} color="white" href="/events">Events</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;