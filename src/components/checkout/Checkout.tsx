'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CssBaseline, Grid, Stack, Step, StepLabel, Stepper, Typography, ThemeProvider, createTheme } from '@mui/material';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Info from './Info';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const Checkout: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [totalPrice, setTotalPrice] = useState('$134.98');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 1) {
      setTotalPrice('$144.97');
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (!isClient) {
    return null;
  }

  return (
    <ThemeProvider theme={createTheme({ palette: { primary: { main: '#418041' } } })}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2 }}>
            <Info />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2}>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography>Your order number is #12345. We have emailed your order confirmation.</Typography>
                <Button variant="contained">Go to my orders</Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Checkout;
