import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Textarea, useToast } from '@chakra-ui/react';
import { uploadEventImage, addEvent } from '../../services/eventService';

const CreateEventForm = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (eventData.image) {
        imageUrl = await uploadEventImage(eventData.image);
      }
      await addEvent({ ...eventData, imageUrl });
      toast({
        title: 'Event created.',
        description: 'The event has been successfully created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating event.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={eventData.name} onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={eventData.description} onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Price</FormLabel>
          <Input type="number" name="price" value={eventData.price} onChange={handleInputChange} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Event Image</FormLabel>
          <Input type="file" name="image" onChange={handleImageChange} />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">Create Event</Button>
      </form>
    </Box>
  );
};

export default CreateEventForm;