import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Button, Card, CardContent, CardHeader, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  role: yup.string().required('Role is required'),
  experienceLevel: yup
    .string()
    .oneOf(['Beginner', 'Intermediate', 'Expert'], 'Experience Level must be one of: Beginner, Intermediate, Expert')
    .required('Experience Level is required'),
  assignedSpaceshipID: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (typeof originalValue === 'string' && originalValue.trim() === '' ? null : value)),
});

const CrewMemberFormView = ({ mode }) => {
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      role: '',
      experienceLevel: '',
      assignedSpaceshipID: '',
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit') {
      axios.get(`http://localhost:3000/crewmembers/${id}`)
        .then(response => {
          const { Name, Role, ExperienceLevel, AssignedSpaceshipID } = response.data;
          const transformedData = {
            name: Name || '',
            role: Role || '',
            experienceLevel: ExperienceLevel || '',
            assignedSpaceshipID: AssignedSpaceshipID !== null ? AssignedSpaceshipID.toString() : '',
          };
          reset(transformedData);
        })
        .catch(error => console.error('Error fetching crew member:', error));
    }
  }, [id, mode, reset]);

  const onSubmit = (data) => {
    setLoading(true);
    const request = mode === 'create'
      ? axios.post('http://localhost:3000/crewmembers', data)
      : axios.put(`http://localhost:3000/crewmembers/${id}`, data);

    request
      .then(() => history.push('/crewmembers'))
      .catch(error => console.error('Error saving crew member:', error))
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardHeader title={mode === 'create' ? 'Create Crew Member' : 'Edit Crew Member'} />
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
              name="role"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Role" 
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
              name="experienceLevel"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Experience Level" 
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
              name="assignedSpaceshipID"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="Assigned Spaceship ID" 
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

export default CrewMemberFormView;
