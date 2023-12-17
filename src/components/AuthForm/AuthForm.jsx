import { useState } from 'react';
import { Box, Button, Fade } from '@chakra-ui/react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const AuthForm = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Box textAlign="center" py={10}>
      <Fade in={showLogin}>
        {showLogin && <LoginForm />}
      </Fade>
      <Fade in={!showLogin}>
        {!showLogin && <RegisterForm />}
      </Fade>
      <Button colorScheme="blue" onClick={toggleForm} mt={4}>
        {showLogin ? 'Create new account' : 'Back to login'}
      </Button>
    </Box>
  );
};

export default AuthForm;