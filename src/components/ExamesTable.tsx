'use client'

import React, { useState, useEffect } from 'react';
import { Avatar, Paper, Typography, IconButton, Box, Container, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext'; 

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#418041',
      light: 'rgba(65, 128, 65, 0.8)',
    }
  }
});

const Item = ({ exame, onAdd }) => {
  const formattedPrice = parseFloat(exame.preço).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <ListItem divider>
      <ListItemText
        primary={exame.nome}
      />
      <ListItemSecondaryAction>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ minWidth: '80px', textAlign: 'right', mr: 2 }}>
            {formattedPrice}
          </Typography>
          <IconButton edge="end" aria-label="add" onClick={() => onAdd(exame)}>
            <AddCircleIcon sx={{ color: 'primary.main' }} />
          </IconButton>
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default function ExamesTable() {
  const [exames, setExames] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const { addItemToCart } = useCart();
  const { searchTerm } = useSearch();

  useEffect(() => {
    fetch('/exames.json')
      .then(response => response.json())
      .then(data => setExames(data))
      .catch(error => console.error('Error fetching exams data:', error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredExames = exames.filter(exame =>
    exame.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const count = Math.ceil(filteredExames.length / itemsPerPage);
  const paginatedExames = filteredExames.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" sx={{ maxWidth: '100% !important' }}>
        <Paper sx={{ padding: 2, borderRadius: '10px', backgroundColor: '#e0e0e0' }} elevation={0}>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, mb: 2, backgroundColor: 'primary.main', borderRadius: '10px' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <MonitorHeartIcon fontSize='large' />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
              Exames
            </Typography>
          </Box>
          <List>
            {paginatedExames.map((exame: any) => (
              <Item key={exame.id} exame={exame} onAdd={addItemToCart} />
            ))}
          </List>
          <Pagination count={count} page={page} onChange={handleChangePage} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
