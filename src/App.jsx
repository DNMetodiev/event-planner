import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import { onAuthChange } from '../src/services/authService';
import Navbar from '../src/components/Navbar/Navbar';
import Footer from '../src/components/Footer/Footer';
import HomePage from '../src/pages/HomePage/HomePage';
import AuthForm from '../src/components/AuthForm/AuthForm';
import AdminDashboard from '../src/components/AdminDashoard/AdminDashboard';
import UserDashboard from '../src/components/UserDashboard/UserDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const PrivateRoute = ({ children, allowedRoles }) => {
    return user && allowedRoles.includes(user.role) ? children : <Navigate to="/login" />;
  };

  return (
    <ChakraProvider>
      <Router>
        <Flex direction="column" minHeight="100vh" width="100%">
          <Navbar />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthForm />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute allowedRoles={['user', 'admin']}>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
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