import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { auth } from 'auth';
import PaymentClient from '@/components/checkout/PaymentClient';

interface PaymentSuccessProps {
  searchParams: {
    amount: string;
  };
}

export default async function Page({ searchParams: { amount } }: PaymentSuccessProps) {
  const { user } = await auth();

  return (
    <Container maxWidth="lg" sx={{ padding: '20px', textAlign: 'center', marginTop: '20px' }}>
      <Box sx={{ background: '#418041', padding: '40px', borderRadius: '8px', color: 'white' }}>
        <Box mb={4}>
          <Typography variant="h1" component="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Obrigado, {user.name}!
          </Typography>
          <PaymentClient amount={amount} user={{ name: user.name, email: user.email }} />
        </Box>
      </Box>
    </Container>
  );
}
