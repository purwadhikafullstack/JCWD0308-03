'use client';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { googleProvider } from '@/firebase/config';
import { auth } from '@/firebase/config';
import { useState } from 'react';
import { createToken } from '@/app/action';

export default function useAuth() {
  const [data, setData] = useState<any>(null);

  async function signInGoogle() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        if (token && user) {
          setData({ token, user });
          createToken(token)
        }

        // console.log("data : " , data.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  return { signInGoogle, data };
}
