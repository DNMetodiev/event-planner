import { useEffect, useState } from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import { getUserInteractions } from '../../services/eventService';
import { getCurrentUser } from '../../services/authService';

const UserDashboard = () => {
  const [likedEvents, setLikedEvents] = useState([]);
  const [commentedEvents, setCommentedEvents] = useState([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const fetchInteractions = async () => {
        const interactions = await getUserInteractions(currentUser.uid);
        setLikedEvents(interactions.likedEvents);
        setCommentedEvents(interactions.commentedEvents);
      };
      fetchInteractions();
    }
  }, []);

  return (
    <VStack spacing={4}>
      <Heading as="h2">My Activity</Heading>
      <Box>
        <Heading as="h3" size="md">Liked Events</Heading>
        {likedEvents.length ? (
          likedEvents.map((event) => (
            <Text key={event.id}>{event.name}</Text>
          ))
        ) : (
          <Text>No liked events yet.</Text>
        )}
      </Box>
      <Box>
        <Heading as="h3" size="md">Commented Events</Heading>
        {commentedEvents.length ? (
          commentedEvents.map((event) => (
            <Text key={event.id}>{event.name}</Text>
          ))
        ) : (
          <Text>No commented events yet.</Text>
        )}
      </Box>
    </VStack>
  );
};

export default UserDashboard;