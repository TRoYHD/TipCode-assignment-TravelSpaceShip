// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Sidebar, MobileSidebar } from './components/Sidebar';
import SpaceshipPage from './pages/Spaceship/SpaceshipPage';
import CrewMemberPage from './pages/CrewMember/CrewMemberPage';
import MissionPage from './pages/Mission/MissionPage';
import ErrorBoundary from './utils/ErrorBoundary';
import { ThemeContextProvider } from './components/ThemeContext';
import './styles.css';
import { getToken, setToken } from './utils/setToken';

// Function to generate and store token
const generateAndStoreToken = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/generate-token`); // Adjust the URL to your actual endpoint
    const { token } = response.data;
    setToken(token); // Save the token to localStorage
  } catch (error) {
    console.error('Error generating token:', error); // Log error if token generation fails
  }
};

// Define the Layout component
const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false); // State to manage mobile sidebar visibility

  // Function to toggle the mobile sidebar
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // useEffect to generate and store token when the app starts
  useEffect(() => {
    generateAndStoreToken(); // Generate and store token when the app starts

    const token = getToken(); // Retrieve the token from localStorage
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the default Authorization header for axios
    } else {
      console.error('No token found in local storage.'); // Log error if no token is found
    }
  }, []);

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Navbar toggleSidebar={handleDrawerToggle} /> {/* Navbar with sidebar toggle */}
          <Sidebar /> {/* Sidebar component */}
          <MobileSidebar open={mobileOpen} toggleSidebar={handleDrawerToggle} /> {/* Mobile sidebar component */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <ErrorBoundary>
              <Switch>
                <Route path="/spaceships" component={SpaceshipPage} /> {/* Route for SpaceshipPage */}
                <Route path="/crewmembers" component={CrewMemberPage} /> {/* Route for CrewMemberPage */}
                <Route path="/missions" component={MissionPage} /> {/* Route for MissionPage */}
                <Route path="/" exact component={SpaceshipPage} /> {/* Default route for SpaceshipPage */}
              </Switch>
            </ErrorBoundary>
          </Box>
        </Box>
      </Router>
    </ThemeContextProvider>
  );
};

export default Layout;
