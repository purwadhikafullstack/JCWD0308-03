'use client';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { googleProvider } from '@/firebase/config';
import { auth } from '@/firebase/config';
import { useState } from 'react';

export default function useAuth() {
  const [data, setData] = useState<any>();

  async function signInGoogle() {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      if (token && user) {
        setData({user, token})
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
  return { signInGoogle, data };
}