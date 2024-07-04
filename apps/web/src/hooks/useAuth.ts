'use client';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { googleProvider } from '@/firebase/config';
import { auth } from '@/firebase/config';
import { useState } from 'react';
import { createToken } from '@/app/action';
import { useAppDispatch } from './hooks';
import { setUser } from './features/profile/userSlice';
import Cookies from 'js-cookie';
import { useToast } from '@/components/ui/use-toast';
import { result } from 'cypress/types/lodash';

export default function useAuth() {
  const [data, setData] = useState<any>();
  // const dispatch = useAppDispatch();

  async function signInGoogle() {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      if (token && user) {
        // createToken(token)
        // dispatch(setUser(user))
        setData({user, token})
        console.log("data : ", data.user);
        
      }

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
  
  return { signInGoogle, data };

}
