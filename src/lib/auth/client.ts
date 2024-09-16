'use client';

import { authGetRequest, authLogin } from '@/redux/actions/auth';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;
    try {
      const response = await authLogin({ email, password });
      const data = response.data;
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        const user = await authGetRequest();
        localStorage.setItem('userProfile', JSON.stringify({ ...data, ...user.data }));
      }
      return data;
    } catch (error) {
      return { error: 'Please check your email and password.' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    try {
      const data = localStorage.getItem('userProfile');

      if (!data) {
        return { data: null };
      }
      const parsedData: User = JSON.parse(data);

      return { data: parsedData };
    } catch (error) {
      return { error: 'An unknown error occurred' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
    return {};
  }
}

export const authClient = new AuthClient();
