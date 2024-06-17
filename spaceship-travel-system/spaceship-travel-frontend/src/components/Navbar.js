// Import necessary React and Material-UI components
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../components/ThemeContext'; // Custom hook for theme context

// Define the Navbar component, receiving toggleSidebar as a prop
const Navbar = ({ toggleSidebar }) => {
  const { mode, toggleTheme } = useThemeContext(); // Get theme mode and toggle function from context

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Icon button to toggle sidebar, only visible on small screens */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        {/* Title of the application */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Spaceship Travel System Panel
        </Typography>
        {/* Icon button to toggle theme */}
        <IconButton edge="end" color="inherit" onClick={toggleTheme}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
