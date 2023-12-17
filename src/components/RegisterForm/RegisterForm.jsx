import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { register } from '../../services/authService'; // Assume you have this function implemented

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(email, password);
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  return (
    <Box my={4} textAlign="left">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button width="full" mt={4} type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
