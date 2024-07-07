
'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, CssBaseline, Grid, Stack, Step, StepLabel, Stepper, Typography, ThemeProvider, createTheme } from '@mui/material';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Info from './Info';
import { useCart } from '@/context/CartContext';

const steps = ['Informações do Paciente', 'Informações de Pagamento', 'Revise seu pedido'];

function getStepContent(step: number, handleChange: any, paymentDetails: any) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm handleChange={handleChange} />;
    case 2:
      return <Review paymentDetails={paymentDetails} />;
    default:
      throw new Error('Unknown step');
  }
}

const Checkout: React.FC = () => {
  const { cartItems } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.preço, 0);
  };

  const [activeStep, setActiveStep] = useState(0);
  const [totalPrice, setTotalPrice] = useState("R$ 0,00");
  const [isClient, setIsClient] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 1) {
      setTotalPrice(calculateTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
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
                <Typography variant="h5" style={{ marginTop: '20px' }} >Obrigado pela sua compra!</Typography>
                <Typography>Your order number is #12345. We have emailed your order confirmation.</Typography>
                <Button variant="contained">Ir para meus pedidos</Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, handleChange, paymentDetails)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Voltar
                    </Button>
                  )}
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Confirmar Compra' : 'Próximo'}
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
