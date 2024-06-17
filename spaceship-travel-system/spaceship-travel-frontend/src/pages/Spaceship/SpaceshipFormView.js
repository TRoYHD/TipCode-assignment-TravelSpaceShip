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

// Define validation schema using yup with custom error messages
const schema = yup.object().shape({
  name: yup.string().required('Please enter the name of the spaceship.')
    .test('unique-name', 'This name is already taken.', async function(value) {
      if (!value) return true; // Skip validation if value is not provided
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/spaceships/check-name`, {
          params: {
            name: value,
            excludeId: this.options.context.id // Exclude the current spaceship being edited
          }
        });
        return response.data.isUnique;
      } catch (error) {
        console.error('Error checking spaceship name uniqueness:', error);
        return false; // Return false in case of an error
      }
    }),
  capacity: yup.number()
    .typeError('Please enter a valid number for capacity.')
    .required('Capacity is required.')
    .positive('Capacity must be a positive number.')
    .integer('Capacity must be an integer.'),
  launchDate: yup.string()
    .required('Please enter the launch date.')
    .test('valid-date', 'Please enter a valid date in the format YYYY-MM-DD.', (value) => {
      return dayjs(value, 'YYYY-MM-DD', true).isValid();
    }),
  status: yup.string()
    .required('Please select the status of the spaceship.')
    .oneOf(['Ready', 'In Mission', 'Under Maintenance'], 'Status must be one of: Ready, In Mission, Under Maintenance'),
});

const SpaceshipFormView = ({ mode }) => {
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, control, reset, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      capacity: '',
      launchDate: '',
      status: '',
    },
    context: { id } // Pass the ID to the context for unique name validation
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit') {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/spaceships/${id}`)
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
      ? axios.post(`${process.env.REACT_APP_API_BASE_URL}/spaceships`, formattedData)
      : axios.put(`${process.env.REACT_APP_API_BASE_URL}/spaceships/${id}`, formattedData);

    request
      .then(() => history.push('/spaceships'))
      .catch(error => {
        if (error.response && error.response.data) {
          if (error.response.data.error === 'Spaceship ID does not exist.') {
            setError('spaceshipId', { type: 'manual', message: 'Spaceship ID does not exist.' });
          } else if (error.response.data.error.includes('Incorrect date value')) {
            setError('launchDate', { type: 'manual', message: 'Please enter a valid date in the format YYYY-MM-DD.' });
          } else if (error.response.data.error.includes('Cannot delete or update a parent row')) {
            setError('general', { type: 'manual', message: 'Cannot delete or update this spaceship because there are associated missions.' });
          }
        }
        console.error('Error saving spaceship:', error);
      })
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
          <Box mb={2}>
            <p style={{ color: 'red' }}>{errors.general?.message}</p>
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
