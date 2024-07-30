'use client';

import React, { useState, useEffect } from 'react';
import { Box, Paper, MobileStepper, Button } from '@mui/material';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const banners = [
  "/images/banners/banner01.png",
  "/images/banners/banner02.png",
  "/images/banners/banner03.png",
];

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#418041',
      light: 'rgba(65, 128, 65, 0.8)',
    }
  }
});

export default function BannerCarousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = banners.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Avança o slide a cada 5 segundos
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ maxWidth: '100%', flexGrow: 1, padding: 2.5 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
        </Paper>
        <Paper
          elevation={2}
          sx={{
            borderRadius: '10px', // Abaulamento nas bordas
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            sx={{
              height: 255,
              display: 'block',
              maxWidth: '100%',
              overflow: 'hidden',
              width: '100%',
              objectFit: 'cover',
            }}
            src={banners[activeStep]}
            alt={`Banner ${activeStep + 1}`}
          />
        </Paper>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>
          }
        />
      </Box>
    </ThemeProvider>
  );
}
