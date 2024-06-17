import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardContent, CardHeader, Typography, useTheme, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

// Define the CrewMembersListView component
const CrewMembersListView = () => {
  const [crewMembers, setCrewMembers] = useState([]); // State to store crew members data
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const history = useHistory(); // Get the history object for navigation
  const theme = useTheme(); // Get the current theme
  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the device is mobile

  // Fetch crew members data from the server
  useEffect(() => {
    const fetchCrewMembers = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/crewmembers`, {
          headers: {
            Authorization: `Bearer ${token}` // Set the authorization header
          }
        });
        setCrewMembers(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching crew members:', error); // Log error if fetching fails
      }
    };

    fetchCrewMembers(); // Call the fetch function
  }, []);

  // Handle deletion of a crew member
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/crewmembers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Set the authorization header
        }
      });
      setCrewMembers(prevCrewMembers => prevCrewMembers.filter(member => member.CrewMemberID !== id)); // Remove the deleted crew member from state
    } catch (error) {
      console.error('Error deleting crew member:', error); // Log error if deletion fails
    }
  };

  // Filter crew members based on search term
  const filteredCrewMembers = crewMembers.filter(member =>
    member.CrewMemberID.toString().includes(searchTerm) ||
    member.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.Role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.ExperienceLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.AssignedSpaceshipID && member.AssignedSpaceshipID.toString().includes(searchTerm))
  );

  // Define columns for the data grid
  const columns = [
    { field: 'CrewMemberID', headerName: 'Crew Member ID', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Name', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Role', headerName: 'Role', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'ExperienceLevel', headerName: 'Experience Level', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'AssignedSpaceshipID', headerName: 'Assigned Spaceship', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="contained" color="primary" size="small" onClick={() => history.push(`/crewmembers/edit/${params.row.CrewMemberID}`)}>
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
        <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(params.row.CrewMemberID)}>
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
            <Typography variant="h6">Crew Members</Typography>
            <Button variant="contained" color="primary" size="large" onClick={() => history.push('/crewmembers/create')}>
              Add Crew Member
            </Button>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          List of all crew members
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
            rows={filteredCrewMembers}
            columns={columns}
            pagination
            autoPageSize 
            disableSelectionOnClick
            getRowId={(row) => row.CrewMemberID}
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
            {filteredCrewMembers.map((member) => (
              <Box className="mobile-row" key={member.CrewMemberID}>
                <Box className="mobile-cell">
                  <span>Crew Member ID:</span>
                  <span>{member.CrewMemberID}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Name:</span>
                  <span>{member.Name}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Role:</span>
                  <span>{member.Role}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Experience Level:</span>
                  <span>{member.ExperienceLevel}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Assigned Spaceship:</span>
                  <span>{member.AssignedSpaceshipID}</span>
                </Box>
                <Box className="mobile-cell" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" color="primary" size="small" sx={{ minWidth: '60px' }} onClick={() => history.push(`/crewmembers/edit/${member.CrewMemberID}`)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" size="small" sx={{ minWidth: '60px' }} onClick={() => handleDelete(member.CrewMemberID)}>
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

export default CrewMembersListView;
