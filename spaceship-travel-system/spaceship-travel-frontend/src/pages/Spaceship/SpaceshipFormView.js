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
  name: yup.string().required('Name is required'),
  capacity: yup.number().required('Capacity is required').positive().integer(),
  launchDate: yup.date().required('Launch Date is required').transform(parseDateString),
  status: yup.string().required('Status is required').oneOf(['Ready', 'In Mission', 'Under Maintenance'], 'Status must be one of: Ready, In Mission, Under Maintenance'),
});

const SpaceshipFormView = ({ mode }) => {
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      capacity: '',
      launchDate: '',
      status: '',
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit') {
      axios.get(`http://localhost:3000/spaceships/${id}`)
        .then(response => {
          const { Name, Capacity, LaunchDate, Status } = response.data;
          const transformedData = {
            name: Name || '',
            capacity: Capacity || '',
            launchDate: LaunchDate ? formatDate(LaunchDate) : '',
            status: Status || '',
          };
          reset(transformedData);
        })
        .catch(error => console.error('Error fetching spaceship:', error));
    }
  }, [id, mode, reset]);

  const onSubmit = (data) => {
    setLoading(true);
    const formattedData = {
      ...data,
      launchDate: formatDate(data.launchDate),
    };
    const request = mode === 'create'
      ? axios.post('http://localhost:3000/spaceships', formattedData)
      : axios.put(`http://localhost:3000/spaceships/${id}`, formattedData);

    request
      .then(() => history.push('/spaceships'))
      .catch(error => console.error('Error saving spaceship:', error))
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardHeader title={mode === 'create' ? 'Create Spaceship' : 'Edit Spaceship'} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Name" 
                  fullWidth 
                  error={!!fieldState.error} 
                  helperText={fieldState.error?.message} 
                  variant="outlined" 
                  margin="normal" 
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="capacity"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Capacity" 
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
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Status" 
                  fullWidth 
                  select 
                  error={!!fieldState.error} 
                  helperText={fieldState.error?.message} 
                  variant="outlined" 
                  margin="normal" 
                >
                  <MenuItem value="Ready">Ready</MenuItem>
                  <MenuItem value="In Mission">In Mission</MenuItem>
                  <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
                </TextField>
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

export default SpaceshipFormView;
