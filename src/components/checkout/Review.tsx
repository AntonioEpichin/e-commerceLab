// components/checkout/Review.tsx

import React from 'react';
import { List, ListItem, ListItemText, Typography, Grid } from '@mui/material';
import { useCart } from '@/context/CartContext';

interface ReviewProps {
  paymentDetails: {
    cardName: string;
    cardNumber: string;
    expDate: string;
    cvv: string;
  };
}

const Review: React.FC<ReviewProps> = ({ paymentDetails }) => {
  const { cartItems, total } = useCart();

  const address = '123 Main St, City, State, ZIP';

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={item.nome} />
            <Typography variant="body2">{item.preço.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Card holder</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentDetails.cardName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Card number</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>xxxx-xxxx-xxxx-{paymentDetails.cardNumber.slice(-4)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Expiry date</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentDetails.expDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>CVV</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentDetails.cvv}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
