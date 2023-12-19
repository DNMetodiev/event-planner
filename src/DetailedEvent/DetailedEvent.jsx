import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Input,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { formatRelative } from 'date-fns';


import { getEventById, getEventComments, addCommentToEvent, likeEvent, buyEvent } from '../../src/services/eventService';
import { getCurrentUser } from "../services/authService";

const DetailedEvent = () => {
  const [event, setEvent] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { eventId } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!eventId) {
          throw new Error('Event ID is undefined');
        }
        const eventData = await getEventById(eventId);
        setEvent(eventData);
        const commentsData = await getEventComments(eventId);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching event data: ', error);
      }
    };
    fetchData();
  }, [eventId]);

  const handleLike = async () => {
    if (!currentUser) {
      console.error("User not logged in");
      navigate('/login');
      return;
    }
    try {
      await likeEvent(eventId);
      setEvent({ ...event, likes: (event.likes || 0) + 1 });
    } catch (error) {
      console.error('Error liking event: ', error);
    }
  };

  const handleBuy = async () => {
    try {
      await buyEvent(eventId, currentUser.uid);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error buying event: ', error);
    }
  };

  const handleComment = async () => {
    if (!currentUser) {
      console.error("User not logged in");
      navigate('/login');
      return;
    }
    try {
      await addCommentToEvent(eventId, { userId: currentUser.uid, comment: newComment });
      const updatedComments = await getEventComments(eventId);
      setComments(updatedComments);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Heading>{event.name}</Heading>
        <Text>{event.description}</Text>
        <Text>Likes: {event.likes || 0}</Text>
        <Button colorScheme="blue" onClick={handleLike}>Like</Button>
        <Button colorScheme="green" onClick={handleBuy}>Buy</Button>
      </Box>
      <Box>
        <Heading>Comments</Heading>
        <VStack spacing={4} align="stretch">
          {comments.map((comment) => {
            const createdAt = comment.createdAt instanceof Date ? comment.createdAt : new Date();
            return (
              <Box key={comment.id} p={4} bg="gray.100" borderRadius="md" boxShadow="sm">
                <HStack justify="space-between">
                  <Text fontWeight="bold">{comment.userName}</Text>
                  <Text fontSize="xs">{formatRelative(createdAt, new Date())}</Text>
                </HStack>
                <Text mt={2}>{comment.text}</Text>
              </Box>
            );
          })}
        </VStack>
        <HStack mt={4}>
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleComment}>Comment</Button>
        </HStack>
      </Box>
    </VStack>
  );
};

export default DetailedEvent;