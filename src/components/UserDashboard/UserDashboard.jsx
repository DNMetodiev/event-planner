import { Box, Heading, Text } from '@chakra-ui/react';

const UserDashboard = () => {
  return (
    <Box p={5}>
      <Heading as="h2" size="lg">User Dashboard</Heading>
      <Text>Welcome to your Dashboard!</Text>
    </Box>
  );
};

export default UserDashboard;