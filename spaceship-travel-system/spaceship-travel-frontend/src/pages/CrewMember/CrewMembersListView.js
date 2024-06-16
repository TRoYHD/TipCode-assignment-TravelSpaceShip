import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardContent, CardHeader, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const CrewMembersListView = () => {
  const [crewMembers, setCrewMembers] = useState([]);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchCrewMembers = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      try {
        const response = await axios.get('http://localhost:3000/crewmembers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCrewMembers(response.data);
      } catch (error) {
        console.error('Error fetching crew members:', error);
      }
    };

    fetchCrewMembers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    try {
      await axios.delete(`http://localhost:3000/crewmembers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCrewMembers(prevCrewMembers => prevCrewMembers.filter(member => member.CrewMemberID !== id));
    } catch (error) {
      console.error('Error deleting crew member:', error);
    }
  };

  const columns = [
    { field: 'CrewMemberID', headerName: 'Crew Member ID', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Name', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Role', headerName: 'Role', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'ExperienceLevel', headerName: 'Experience Level', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'AssignedSpaceshipID', headerName: 'Assigned Spaceship', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 1,
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
      flex: 1,
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
      <CardHeader title="Crew Members" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          List of all crew members
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" size="small" onClick={() => history.push('/crewmembers/create')}>
            Add Crew Member
          </Button>
        </Box>
        <Box className="data-grid-container" sx={{ height: 400, width: '100%', display: isMobile ? 'none' : 'block' }}>
          <DataGrid
            rows={crewMembers}
            columns={columns}
            pageSize={10}
            autoHeight
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
            {crewMembers.map((member) => (
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
                  <Button variant="contained" color="primary" size="small" onClick={() => history.push(`/crewmembers/edit/${member.CrewMemberID}`)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(member.CrewMemberID)}>
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
