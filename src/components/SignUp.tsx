'use client';

import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dynamic from "next/dynamic";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as z from 'zod';
import register from '@/app/(auth)/signup/_actions/register';




const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#418041',  // Cor principal verde escuro
      light: 'rgba(65, 128, 65, 0.8)',  // Verde claro para efeitos de hover
    }
  }
});

const SignUpSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
  confirm_password: z.string().min(8, { message: "Confirmação de senha deve ter no mínimo 8 caracteres" }),
}).refine(data => data.password === data.confirm_password, {
  message: "As senhas não correspondem",
  path: ["confirm_password"],
});

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

function SignUp() {
  const [formErrors, setFormErrors] = useState<Partial<SignUpFormData>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: SignUpFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirm_password: formData.get('confirm_password') as string,
    };

    try {
      SignUpSchema.parse(data);
      setFormErrors({});
      
      // Convert data object back to FormData
      const registerData = new FormData();
      registerData.append('name', data.name);
      registerData.append('email', data.email);
      registerData.append('password', data.password);
      registerData.append('confirm_password', data.confirm_password);

      await register(registerData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc: Partial<SignUpFormData>, curr) => {
          acc[curr.path[0] as keyof SignUpFormData] = curr.message;
          return acc;
        }, {});
        setFormErrors(errors);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#006A39' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Criar Conta
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  error={Boolean(formErrors.name)}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={Boolean(formErrors.password)}
                  helperText={formErrors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirme sua Senha"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                  error={Boolean(formErrors.confirm_password)}
                  helperText={formErrors.confirm_password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continuar
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <span>Já tem uma conta? </span> <Link href="/login" variant="body2">
                  Entrar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(SignUp), { ssr: false });
