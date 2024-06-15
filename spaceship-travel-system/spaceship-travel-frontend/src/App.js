import React, { useState } from 'react';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Sidebar, MobileSidebar } from './components/Sidebar';
import SpaceshipPage from './pages/Spaceship/SpaceshipPage';
import CrewMemberPage from './pages/CrewMember/CrewMemberPage';
import MissionPage from './pages/Mission/MissionPage';
import ErrorBoundary from './ErrorBoundary';
import { ThemeContextProvider } from './components/ThemeContext';
import './styles.css';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Navbar toggleSidebar={handleDrawerToggle} />
          <Sidebar />
          <MobileSidebar open={mobileOpen} toggleSidebar={handleDrawerToggle} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <ErrorBoundary>
              <Switch>
                <Route path="/spaceships" component={SpaceshipPage} />
                <Route path="/crewmembers" component={CrewMemberPage} />
                <Route path="/missions" component={MissionPage} />
                <Route path="/" exact component={SpaceshipPage} />
              </Switch>
            </ErrorBoundary>
          </Box>
        </Box>
      </Router>
    </ThemeContextProvider>
  );
};

export default Layout;
