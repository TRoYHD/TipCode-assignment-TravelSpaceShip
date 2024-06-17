import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardContent, CardHeader, Typography, useTheme, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

// Define the MissionsListView component
const MissionsListView = () => {
  const [missions, setMissions] = useState([]); // State to store missions data
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const history = useHistory(); // Get the history object for navigation
  const theme = useTheme(); // Get the current theme
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the device is mobile

  // Fetch missions data from the server
  useEffect(() => {
    const fetchMissions = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/missions`, {
          headers: {
            Authorization: `Bearer ${token}` // Set the authorization header
          }
        });
        setMissions(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching missions:', error); // Log error if fetching fails
      }
    };

    fetchMissions(); // Call the fetch function
  }, []);

  // Handle deletion of a mission
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/missions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Set the authorization header
        }
      });
      setMissions(prevMissions => prevMissions.filter(mission => mission.MissionID !== id)); // Remove the deleted mission from state
    } catch (error) {
      console.error('Error deleting mission:', error); // Log error if deletion fails
    }
  };

  // Filter missions based on search term
  const filteredMissions = missions.filter(mission =>
    mission.MissionID.toString().includes(searchTerm) ||
    mission.Destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.Duration.toString().includes(searchTerm)
  );

  // Define columns for the data grid
  const columns = [
    { field: 'MissionID', headerName: 'Mission ID', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'SpaceshipID', headerName: 'Spaceship ID', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Destination', headerName: 'Destination', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'LaunchDate', headerName: 'Launch Date', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Duration', headerName: 'Duration', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="contained" color="primary" size="small" onClick={() => history.push(`/missions/edit/${params.row.MissionID}`)}>
          Edit
        </Button>
      )
    },
    {
      field: 'delete',
      headerName: 'Delete',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(params.row.MissionID)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Missions</Typography>
            <Button variant="contained" color="primary" size="large" onClick={() => history.push('/missions/create')}>
              Add Mission
            </Button>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          List of all missions
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box className="data-grid-container" sx={{ height: 600, width: '100%', display: isMobile ? 'none' : 'block' }}>
          <DataGrid
            rows={filteredMissions}
            columns={columns}
            pagination
            autoPageSize 
            disableSelectionOnClick
            getRowId={(row) => row.MissionID}
            sx={{
              '& .MuiDataGrid-root': {
                backgroundColor: theme.palette.background.paper,
              },
              '& .MuiDataGrid-cell': {
                color: theme.palette.text.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                textAlign: 'center',
                fontSize: '1rem'
              }
            }}
          />
        </Box>
        {isMobile && (
          <Box className="mobile-grid-container">
            {filteredMissions.map((mission) => (
              <Box className="mobile-row" key={mission.MissionID}>
                <Box className="mobile-cell">
                  <span>Mission ID:</span>
                  <span>{mission.MissionID}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Spaceship ID:</span>
                  <span>{mission.SpaceshipID}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Destination:</span>
                  <span>{mission.Destination}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Launch Date:</span>
                  <span>{mission.LaunchDate}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Duration:</span>
                  <span>{mission.Duration}</span>
                </Box>
                <Box className="mobile-cell" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" color="primary" size="small" sx={{ minWidth: '60px' }} onClick={() => history.push(`/missions/edit/${mission.MissionID}`)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" size="small" sx={{ minWidth: '60px' }} onClick={() => handleDelete(mission.MissionID)}>
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MissionsListView;
