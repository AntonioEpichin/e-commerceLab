'use server';

import { redirect } from 'next/navigation';
import { signIn } from "../../../../../auth"
import { AuthError } from 'next-auth';

export default async function login(formData: FormData) {

  const { email, password } = Object.fromEntries(formData.entries());


  try {
    await signIn('credentials', { email, password });
  } catch (e) {
    if (e instanceof AuthError) {
      if (e.type === 'CredentialsSignin') {
        throw new Error('Credenciais inválidas, tente novamente');
      }
    }

    redirect('/');
  }
}

