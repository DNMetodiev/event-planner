import { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import { getEvents } from '../services/eventService';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getEvents();
      setEvents(allEvents);
    };
    fetchEvents();
  }, []);

  return (
    <VStack spacing={4}>
      <Heading as="h2">Admin Dashboard</Heading>
      {events.map((event) => (
        <Box key={event.id} p={4} shadow="md" borderWidth="1px" borderRadius="lg">
          <Heading as="h3" size="md">{event.name}</Heading>
          <Text>Likes: {event.likes?.length || 0}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default AdminDashboard;