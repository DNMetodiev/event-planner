import { useState, useEffect } from 'react';
import './HomePage.css';
import { Box, Heading, Text, SimpleGrid, Container, ScaleFade, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../../services/eventService';
import { onAuthChange, getUserRole } from '../../services/authService';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      if (authUser) {
        try {
          const userRole = await getUserRole(authUser.uid);
          setRole(userRole);
          setUser(authUser);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUser(null);
        setRole('');
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const navigateToCreateEvent = () => {
    navigate('/create-event');
  };

  return (
    <Container maxW="container.xl" centerContent>
      <Heading as="h1" size="xl" mt="6">
        Welcome to Event Planner!
      </Heading>
      <Text fontSize="md" my="4">
        Find and manage events with ease.
      </Text>

      {role === 'admin' && (
        <Button colorScheme="blue" onClick={navigateToCreateEvent} my="4">
          Create Event
        </Button>
      )}

      <SimpleGrid columns={[1, null, 3]} spacing="40px" mb="6">
        {events.map((event, index) => (
          <ScaleFade key={index} in={true} initialScale={0.9}>
            <Box p="5" shadow="md" borderWidth="1px">
              <Heading as="h3" size="md">{event.name}</Heading>
              <Text mt={4}>{event.description}</Text>
            </Box>
          </ScaleFade>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;