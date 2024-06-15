import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Button, Card, CardContent, CardHeader, Box, CircularProgress, MenuItem } from '@mui/material';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

// Utility function to format the date to YYYY-MM-DD
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

// Parsing function to ensure the date is in the correct format for validation
const parseDateString = (value, originalValue) => {
  const parsedDate = dayjs(originalValue, 'YYYY-MM-DD', true);
  return parsedDate.isValid() ? parsedDate.toDate() : new Date(NaN);
};

const schema = yup.object().shape({
  spaceshipId: yup.string().required('Spaceship ID is required'),
  destination: yup.string().required('Destination is required').oneOf(['Moon', 'Mars', 'Jupiter'], 'Destination must be one of: Moon, Mars, Jupiter'),
  launchDate: yup.date().required('Launch Date is required').transform(parseDateString),
  duration: yup.number().required('Duration is required').positive().integer(),
});

const MissionFormView = ({ mode }) => {
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      spaceshipId: '',
      destination: '',
      launchDate: '',
      duration: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [spaceships, setSpaceships] = useState([]);

  useEffect(() => {
    // Fetch available spaceships for the dropdown
    axios.get('http://localhost:3000/spaceships')
      .then(response => setSpaceships(response.data))
      .catch(error => console.error('Error fetching spaceships:', error));
  }, []);

  useEffect(() => {
    if (mode === 'edit') {
      axios.get(`http://localhost:3000/missions/${id}`)
        .then(response => {
          const { SpaceshipID, Destination, LaunchDate, Duration } = response.data;
          const transformedData = {
            spaceshipId: SpaceshipID.toString() || '',
            destination: Destination || '',
            launchDate: LaunchDate ? formatDate(LaunchDate) : '',
            duration: Duration.toString() || '',
          };
          reset(transformedData);
        })
        .catch(error => console.error('Error fetching mission:', error));
    }
  }, [id, mode, reset]);

  const onSubmit = (data) => {
    setLoading(true);
    const formattedData = {
      ...data,
      launchDate: formatDate(data.launchDate),
    };
    const request = mode === 'create'
      ? axios.post('http://localhost:3000/missions', formattedData)
      : axios.put(`http://localhost:3000/missions/${id}`, formattedData);

    request
      .then(() => history.push('/missions'))
      .catch(error => console.error('Error saving mission:', error))
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardHeader title={mode === 'create' ? 'Create Mission' : 'Edit Mission'} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <Controller
              name="spaceshipId"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Spaceship ID" 
                  fullWidth 
                  select
                  error={!!fieldState.error} 
                  helperText={fieldState.error?.message} 
                  variant="outlined" 
                  margin="normal" 
                >
                  {spaceships.map((spaceship) => (
                    <MenuItem key={spaceship.SpaceshipID} value={spaceship.SpaceshipID}>
                      {spaceship.SpaceshipID}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="destination"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Destination" 
                  fullWidth 
                  select
                  error={!!fieldState.error} 
                  helperText={fieldState.error?.message} 
                  variant="outlined" 
                  margin="normal" 
                >
                  <MenuItem value="Moon">Moon</MenuItem>
                  <MenuItem value="Mars">Mars</MenuItem>
                  <MenuItem value="Jupiter">Jupiter</MenuItem>
                </TextField>
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="launchDate"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Launch Date" 
                  fullWidth 
                  error={!!fieldState.error} 
                  helperText={fieldState.error?.message} 
                  variant="outlined" 
                  margin="normal" 
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="duration"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Duration" 
                  fullWidth 
                  error={!!fieldState.error} 
                  helperText={fieldState.error?.message} 
                  variant="outlined" 
                  margin="normal" 
                  type="number"
                />
              )}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default MissionFormView;
