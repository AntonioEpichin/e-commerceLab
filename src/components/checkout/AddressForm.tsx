import React from 'react';
import { TextField, Grid, Box } from '@mui/material';

const AddressForm: React.FC = () => {
  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="Nome"
            label="Nome"
            name="Nome"
            autoComplete="Nome"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="CPF"
            label="CPF"
            name="CPF"
            autoComplete="CPF"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="Data de nascimento"
            name="Data de nascimento"
            type='date'
            label="Data de nascimento"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm;
