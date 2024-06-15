import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: { xs: 0, md: 240 },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: 0, md: 240 },
          boxSizing: 'border-box',
        },
        display: { xs: 'none', md: 'block' }
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/spaceships">
            <ListItemText primary="Spaceships" />
          </ListItem>
          <ListItem button component={Link} to="/crewmembers">
            <ListItemText primary="Crew Members" />
          </ListItem>
          <ListItem button component={Link} to="/missions">
            <ListItemText primary="Missions" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

const MobileSidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        }
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/spaceships" onClick={toggleSidebar}>
            <ListItemText primary="Spaceships" />
          </ListItem>
          <ListItem button component={Link} to="/crewmembers" onClick={toggleSidebar}>
            <ListItemText primary="Crew Members" />
          </ListItem>
          <ListItem button component={Link} to="/missions" onClick={toggleSidebar}>
            <ListItemText primary="Missions" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export { Sidebar, MobileSidebar };
