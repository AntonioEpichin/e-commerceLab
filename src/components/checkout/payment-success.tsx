import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { auth } from 'auth';

interface PaymentSuccessProps {
  searchParams: {
    amount: string;
  };
}



export default async function PaymentSuccess({ searchParams: { amount } }: PaymentSuccessProps) {

  const {user} = await auth()

  return (
      <Container maxWidth="lg" sx={{ padding: '20px', textAlign: 'center', marginTop: '20px' }}>
        <Box sx={{ background: '#418041', padding: '40px', borderRadius: '8px', color: 'white' }}>
          <Box mb={4}>
            <Typography variant="h1" component="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
              Obrigado, {user.name}!
            </Typography>
            <Typography variant="h2" component="h2" sx={{ fontSize: '1.5rem' }}>
              Sua ordem foi processada com sucesso.
            </Typography>

            <Paper elevation={3} sx={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', marginTop: '20px', color: '#418041', fontSize: '2rem', fontWeight: 'bold' }}>
              R$ {Number(amount).toFixed(2).replace('.', ',')}
            </Paper>
          </Box>
        </Box>
      </Container>
  );
};
