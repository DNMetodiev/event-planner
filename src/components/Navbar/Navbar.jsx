import { useState, useEffect } from 'react';
import { Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthChange, signOutUser, getUserRole } from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      if (authUser) {
        try {
          const fetchedRole = await getUserRole(authUser.uid);
          setRole(fetchedRole);
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

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      setRole('');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Box width="100%" px={4} py={2} shadow="md" bg="blue.500">
      <Flex justify="space-between" align="center" width="100%">
        <Text fontSize="xl" fontWeight="bold" color="white" onClick={() => navigate('/')}>
          Event Planner
        </Text>
        <Flex>
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" colorScheme="whiteAlpha" />
            <MenuList>
              {location.pathname !== '/' && <MenuItem onClick={() => navigate('/')}>Home</MenuItem>}
              {location.pathname !== '/about' && <MenuItem onClick={() => navigate('/about')}>About</MenuItem>}
              {user && (
                <>
                  {role === 'admin' && location.pathname !== '/admin-dashboard' && (
                    <MenuItem onClick={() => navigate('/admin-dashboard')}>Admin Dashboard</MenuItem>
                  )}
                  <MenuItem isDisabled>{user.email}</MenuItem>
                  {role === 'admin' && <MenuItem isDisabled>Role: Admin</MenuItem>}
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </>
              )}
              {!user && (
                <>
                  {location.pathname !== '/login' && <MenuItem onClick={() => navigate('/login')}>Sign In</MenuItem>}
                  {location.pathname !== '/register' && <MenuItem onClick={() => navigate('/register')}>Register</MenuItem>}
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;