// components/checkout/PaymentForm.tsx

import React from 'react';
import { TextField, Grid, Box } from '@mui/material';

interface PaymentFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ handleChange }) => {
  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <TextField
        required
        fullWidth
        id="cardName"
        label="Nome no Cartão"
        name="cardName"
        autoComplete="cc-name"
        onChange={handleChange}
      />
      <TextField
        required
        fullWidth
        id="cardNumber"
        label="Número do Cartão"
        name="cardNumber"
        autoComplete="cc-number"
        margin="normal"
        onChange={handleChange}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="expDate"
            label="Validade"
            name="expDate"
            type='month'
            autoComplete="cc-exp"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="cvv"
            label="CVV"
            name="cvv"
            autoComplete="cc-csc"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentForm;
