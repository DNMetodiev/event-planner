import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import { onAuthChange, getUserRole } from '../src/services/authService';
import Navbar from '../src/components/Navbar/Navbar';
import Footer from '../src/components/Footer/Footer';
import HomePage from '../src/pages/HomePage/HomePage';
import AuthForm from '../src/components/AuthForm/AuthForm';
import AdminDashboard from '../src/components/AdminDashoard/AdminDashboard';
import UserDashboard from '../src/components/UserDashboard/UserDashboard';
import CreateEventForm from '../src/components/CreateEventForm/CreateEventForm';
import AboutUs from '../src/AboutUs/AboutUs';
import DetailedEvent from '../src/DetailedEvent/DetailedEvent';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');

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

  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Flex direction="column" minHeight="100vh" width="100%">
          <Box flex="1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthForm />} />
              <Route path="/events/:eventId" element={<DetailedEvent userId={user?.uid} />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              {user && role === 'admin' && (
                <Route path="/create-event" element={<CreateEventForm />} />
              )}
              {user && (
                <Route path="/dashboard" element={role === 'admin' ? <AdminDashboard /> : <UserDashboard />} />
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </Router>
    </ChakraProvider>
  );
}


export default App;