"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#418041', // Main green color
    },
  },
});

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.paper">
        <Box component="form" onSubmit={handleSubmit} p={4} borderRadius={2} boxShadow={3} maxWidth={600} width="100%">
          <Box textAlign="center" mb={2}>
            <Typography variant="h5" component="h2" gutterBottom>
              Sonny
            </Typography>
            <Typography variant="body1" gutterBottom>
              has requested ${amount.toFixed(2)}
            </Typography>
          </Box>

          {clientSecret && <PaymentElement />}

          {errorMessage && <Typography color="error" gutterBottom>{errorMessage}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!stripe || loading}
            sx={{ mt: 2, fontWeight: 'bold' }}
          >
            {!loading ? `Pay $${amount}` : "Processing..."}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutPage;
