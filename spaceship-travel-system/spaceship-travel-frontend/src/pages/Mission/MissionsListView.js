import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardContent, CardHeader, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const MissionsListView = () => {
  const [missions, setMissions] = useState([]);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    axios.get('http://localhost:3000/missions')
      .then(response => setMissions(response.data))
      .catch(error => console.error('Error fetching missions:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/missions/${id}`)
      .then(() => setMissions(prevMissions => prevMissions.filter(mission => mission.MissionID !== id)))
      .catch(error => console.error('Error deleting mission:', error));
  };

  const columns = [
    { field: 'MissionID', headerName: 'Mission ID', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'SpaceshipID', headerName: 'Spaceship ID', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Destination', headerName: 'Destination', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'LaunchDate', headerName: 'Launch Date', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Duration', headerName: 'Duration', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 1,
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
      flex: 1,
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
      <CardHeader title="Missions" />
      <CardContent>
        <Typography variant="body2"  color="textSecondary" gutterBottom>
          List of all missions
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" size="small" onClick={() => history.push('/missions/create')}>
            Add Mission
          </Button>
        </Box>
        <Box className="data-grid-container" sx={{ height: 400, width: '100%', display: isMobile ? 'none' : 'block' }}>
          <DataGrid
            rows={missions}
            columns={columns}
            pageSize={10}
            autoHeight
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
            {missions.map((mission) => (
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
                  <Button variant="contained" color="primary" size="small" onClick={() => history.push(`/missions/edit/${mission.MissionID}`)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(mission.MissionID)}>
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
