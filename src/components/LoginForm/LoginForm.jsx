import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { login } from '../../services/authService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed: ", error);
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
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;