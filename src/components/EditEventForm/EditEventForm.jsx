import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  useToast
} from '@chakra-ui/react';
import { getEventById, updateEvent } from '../services/eventService';

const EditEventForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (eventId) {
      getEventById(eventId).then(setEventData).catch(console.error);
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(eventId, eventData);
      toast({ title: "Event updated successfully.", status: "success" });
      navigate(`/events/${eventId}`);
    } catch (error) {
      toast({ title: "Error updating event.", description: error.message, status: "error" });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={eventData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="description" isRequired mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={eventData.description} onChange={handleChange} />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">Update Event</Button>
      </form>
    </Box>
  );
};

export default EditEventForm;