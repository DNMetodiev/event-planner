import './HomePage.css';
import { Box, Heading, Text, SimpleGrid, Container } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Container maxW="container.xl" centerContent>
      <Heading as="h1" size="xl" mt="6">
        Welcome to Event Planner!
      </Heading>
      <Text fontSize="md" my="4">
        Find and manage events with ease.
      </Text>
      <SimpleGrid columns={[1, null, 3]} spacing="40px" mb="6">
        {Array.from({ length: 6 }, (_, index) => (
          <Box key={index} p="5" shadow="md" borderWidth="1px">
            <Heading as="h3" size="md">Event {index + 1}</Heading>
            <Text mt={4}>Details about the event...</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;