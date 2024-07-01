

import * as React from 'react';
import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSession, signOut } from 'next-auth/react';
import * as z from 'zod';
import login from "@/app/(auth)/login/_actions/login";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#418041',
      light: 'rgba(65, 128, 65, 0.8)',
    }
  }
});

const SignInSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

type SignInFormData = {
  email: string;
  password: string;
};

function SignIn({ session }) {
  const { status } = useSession();
  const [loading, setLoading] = React.useState(true);
  const [formErrors, setFormErrors] = useState<Partial<SignInFormData>>({});
  const [loginError, setLoginError] = useState<string | null>(null);

  React.useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = '/login';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: SignInFormData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      SignInSchema.parse(data);
      setFormErrors({});
      
      const loginData = new FormData();
      loginData.append('email', data.email);
      loginData.append('password', data.password);

      await login(loginData);
      setLoginError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc: Partial<SignInFormData>, curr) => {
          acc[curr.path[0] as keyof SignInFormData] = curr.message;
          return acc;
        }, {});
        setFormErrors(errors);
      } else if (error.message) {
        setLoginError(error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated' || session) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Você já está logado
            </Typography>
            <Button
              onClick={handleLogout}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(formErrors.password)}
              helperText={formErrors.password}
            />
            {loginError && (
              <Typography color="error" variant="body2" align="center">
                Credenciais inválidas, tente novamente
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
