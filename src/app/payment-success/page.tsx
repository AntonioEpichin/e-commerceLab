import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { auth } from 'auth';
import { sendMail } from '@/lib/mailService';
import PaymentClient from '@/components/checkout/PaymentClient';


interface PaymentSuccessProps {
  searchParams: {
    amount: string;
  };
}



export default async function Page({ searchParams: { amount } }: PaymentSuccessProps) {

  const {user} = await auth()

  // Função para gerar um número de ordem aleatório
  function generateOrderNumber(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderNumber = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderNumber += characters[randomIndex];
    }
    return orderNumber;
  }

  const orderNumber: string = generateOrderNumber();

  // Template de e-mail em HTML
  const mailTemplate: string = `
  <html>
  <head>
      <title>Sua ordem foi processada com sucesso</title>
  </head>
  <body>
      <h1>Obrigado pela confiança!</h1>
      <p>Sua ordem foi processada com sucesso.</p>
      <p>O número da sua ordem é: <strong>${orderNumber}</strong></p>
      <p>Estamos à disposição para qualquer dúvida.</p>
      <p>Atenciosamente,</p>
      <p>Equipe Comercial</p>
  </body>
  </html>
  `;

  // Dados do e-mail
  const from: string = process.env.MAIL_USERNAME;
  const to: string = user.email; // Enviar para o e-mail do usuário logado
  const subject: string = "Sua ordem foi processada com sucesso";

  // Enviar o e-mail
  await sendMail(from, to, subject, mailTemplate);

  //COLOCAR AQUI A LÓGICA PARA SALVAR NO BANCO DE DADOS


  return (
      <Container maxWidth="lg" sx={{ padding: '20px', textAlign: 'center', marginTop: '20px' }}>
        <Box sx={{ background: '#418041', padding: '40px', borderRadius: '8px', color: 'white' }}>
          <Box mb={4}>
            <Typography variant="h1" component="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
              Obrigado, {user.name}!
            </Typography>
            <Typography variant="h2" component="h2" sx={{ fontSize: '1.5rem' }}>
              Sua ordem foi processada com sucesso! O número da sua ordem é: <strong>{orderNumber}</strong>
            </Typography>

            <Paper elevation={3} sx={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', marginTop: '20px', color: '#418041', fontSize: '2rem', fontWeight: 'bold' }}>
              R$ {Number(amount).toFixed(2).replace('.', ',')}
            </Paper>
          </Box>
        </Box>
        <PaymentClient/>
      </Container>

  );
};
