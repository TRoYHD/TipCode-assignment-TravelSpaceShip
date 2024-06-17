import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom'; 

// Define the Sidebar component
const Sidebar = () => {
  return (
    <Drawer
      variant="permanent" // Permanent drawer for larger screens
      sx={{
        width: { xs: 0, md: 240 }, // Drawer width: 0 on extra small screens, 240 on medium and larger screens
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: 0, md: 240 }, // Paper width: 0 on extra small screens, 240 on medium and larger screens
          boxSizing: 'border-box', // Include padding and border in element's total width and height
        },
        display: { xs: 'none', md: 'block' } // Hide drawer on extra small screens
      }}
    >
      <Toolbar /> {/* Add a toolbar for spacing */}
      <Box sx={{ overflow: 'auto' }}> {/* Box to allow overflow auto for scrolling */}
        <List>
          {/* List item for navigating to Spaceships */}
          <ListItem button component={Link} to="/spaceships">
            <ListItemText primary="Spaceships" />
          </ListItem>
          {/* List item for navigating to Crew Members */}
          <ListItem button component={Link} to="/crewmembers">
            <ListItemText primary="Crew Members" />
          </ListItem>
          {/* List item for navigating to Missions */}
          <ListItem button component={Link} to="/missions">
            <ListItemText primary="Missions" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

// Define the MobileSidebar component for smaller screens
const MobileSidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer
      anchor="left" // Drawer slides in from the left
      open={open} // Controlled by the open prop
      onClose={toggleSidebar} // Function to close the drawer
      sx={{
        '& .MuiDrawer-paper': {
          width: 240, // Fixed width of 240 for the drawer paper
          boxSizing: 'border-box', // Include padding and border in element's total width and height
        }
      }}
    >
      <Toolbar /> {/* Add a toolbar for spacing */}
      <Box sx={{ overflow: 'auto' }}> {/* Box to allow overflow auto for scrolling */}
        <List>
          {/* List item for navigating to Spaceships, closes the sidebar when clicked */}
          <ListItem button component={Link} to="/spaceships" onClick={toggleSidebar}>
            <ListItemText primary="Spaceships" />
          </ListItem>
          {/* List item for navigating to Crew Members, closes the sidebar when clicked */}
          <ListItem button component={Link} to="/crewmembers" onClick={toggleSidebar}>
            <ListItemText primary="Crew Members" />
          </ListItem>
          {/* List item for navigating to Missions, closes the sidebar when clicked */}
          <ListItem button component={Link} to="/missions" onClick={toggleSidebar}>
            <ListItemText primary="Missions" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

// Export the Sidebar and MobileSidebar components
export { Sidebar, MobileSidebar };
