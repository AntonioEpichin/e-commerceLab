
import React from 'react';
import { Typography, Box } from '@mui/material';
import { useCart } from '../../context/CartContext';




function Info () {
  const { cartItems } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.preço, 0);
  };
  
  return (
    <Box
    sx={{
      p: 4,
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      backgroundColor: '#fafafa',
      textAlign: 'center'
    }}
  >
    <Typography component="h2" variant="h5">
      Valor total
    </Typography>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
      {calculateTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
    </Typography>
  </Box>
  );
};

export default Info;
