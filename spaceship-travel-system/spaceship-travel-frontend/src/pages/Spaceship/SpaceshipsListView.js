import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardContent, CardHeader, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const SpaceshipsListView = () => {
  const [spaceships, setSpaceships] = useState([]);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchSpaceships = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      try {
        const response = await axios.get('http://localhost:3000/spaceships', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSpaceships(response.data);
      } catch (error) {
        console.error('Error fetching spaceships:', error);
      }
    };

    fetchSpaceships();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    try {
      await axios.delete(`http://localhost:3000/spaceships/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSpaceships(prevSpaceships => prevSpaceships.filter(ship => ship.SpaceshipID !== id));
    } catch (error) {
      console.error('Error deleting spaceship:', error);
    }
  };

  const columns = [
    { field: 'SpaceshipID', headerName: 'Spaceship ID', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Name', headerName: 'Name', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Capacity', headerName: 'Capacity', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'LaunchDate', headerName: 'Launch Date', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'Status', headerName: 'Status', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="contained" color="primary" size="small" onClick={() => history.push(`/spaceships/edit/${params.row.SpaceshipID}`)}>
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
        <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(params.row.SpaceshipID)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <Card>
      <CardHeader title="Spaceships" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          List of all spaceships
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" size="small" onClick={() => history.push('/spaceships/create')}>
            Add Spaceship
          </Button>
        </Box>
        <Box className="data-grid-container" sx={{ height: 400, width: '100%', display: isMobile ? 'none' : 'block' }}>
          <DataGrid
            rows={spaceships}
            columns={columns}
            pageSize={10}
            autoHeight
            getRowId={(row) => row.SpaceshipID}
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
            {spaceships.map((ship) => (
              <Box className="mobile-row" key={ship.SpaceshipID}>
                <Box className="mobile-cell">
                  <span>Spaceship ID:</span>
                  <span>{ship.SpaceshipID}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Name:</span>
                  <span>{ship.Name}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Capacity:</span>
                  <span>{ship.Capacity}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Launch Date:</span>
                  <span>{ship.LaunchDate}</span>
                </Box>
                <Box className="mobile-cell">
                  <span>Status:</span>
                  <span>{ship.Status}</span>
                </Box>
                <Box className="mobile-cell" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" color="primary" size="small" onClick={() => history.push(`/spaceships/edit/${ship.SpaceshipID}`)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(ship.SpaceshipID)}>
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

export default SpaceshipsListView;
