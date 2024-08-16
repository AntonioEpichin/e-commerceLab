'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';

interface PaymentClientProps {
  amount: string;
  user: {
    name: string;
    email: string;
  };
}

export default function PaymentClient({ amount, user }: PaymentClientProps) {
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function sendOrderMail() {
      const payload = { amount: amount };
      try {
        const response = await fetch('/api/send-mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.success) {
          setOrderNumber(data.orderNumber);
        } else {
          console.error('Failed to send email:', data.message);
        }
      } catch (error) {
        console.error('Error during API call:', error);
      } finally {
        setLoading(false);
      }
    }

    sendOrderMail();
  }, [amount]);

  if (loading) {
    return <Typography variant="h2" component="h2" sx={{ fontSize: '1.5rem' }}>Enviando E-mail...</Typography>

  }

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Typography variant="h2" component="h2" sx={{ fontSize: '1.5rem' }}>
        Sua ordem foi processada com sucesso! O número da sua ordem é: <strong>{orderNumber}</strong>
      </Typography>

      <Paper elevation={3} sx={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', marginTop: '20px', color: '#418041', fontSize: '2rem', fontWeight: 'bold' }}>
        R$ {Number(amount).toFixed(2).replace('.', ',')}
      </Paper>
    </Container>
  );
}
