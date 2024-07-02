'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { loginAccount, registerUserGoogle } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setUser } from '@/hooks/features/profile/userSlice';
import { createToken } from '@/app/action';
import Cookies from 'js-cookie';


const UserLoginPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { signInGoogle , data} = useAuth();
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user);

  const handleSubmit = async (values: any, actions: any) => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await loginAccount(values, 'users');

      if (res.status === 'ok') {
        dispatch(setUser(res.user))
        console.log("user login :", user );
        
        toast({
          title: 'Login successful',
          description: 'You have successfully logged in.',
          duration: 3000,
        });
        setTimeout(() => {router.push('/')}, 3500)
      } else {
        console.log('login error : ', res);
        toast({
          title: 'Login failed',
          description: res.message || res,
          duration: 5000,
        });
      }

      if (
        res.message ==
        'Email not registered, please register an account first, you will redirect to register page'
      ) {
        setTimeout(() => {
          router.push('/signup/user');
        }, 5500);
      }
    } catch (error: any) {
      console.log('login error : ', error);
    } finally {
      setLoading(false);
      actions.resetForm();
    }
  };

  useEffect(() => {
    async function registerUserFromGoogle() {
      const {user} = data
      const userData = { name: user.displayName, email: user.email, profile: user.photoURL }
      
      setLoading(true)
      try {
        const res = await registerUserGoogle(userData , 'users')
        console.log("register user from google : ", res);
        dispatch(setUser(res.user))
        if (res.status === 'ok') {
          createToken(res.token)
          Cookies.set('token', res.token)
          toast({
            title: 'Succes login',
            description: 'You will redirect to home page',
            duration: 3000,
          });
          setTimeout(() => {
            router.push('/');
          }, 3500);
        } else if (res.message === 'Account already registered as tenant please login as tenant'){
          toast({
            title: 'Account already registered as tenant please login as tenant',
            description: 'You will redirect to home page',
            duration: 3000,
          });
          setTimeout(() => {
            router.push('/');
          }, 3500);
        } else {
          console.log('something went wrong : ', res);
          toast({
            title: 'Something went wrong please try again!',
          });
        }
      } catch (error) {
        toast({
          title: 'Something went wrong please try again!',
        })
      }
      setLoading(false)
    }
    if (data) registerUserFromGoogle()
    
  }, [data, router, toast])

  return (
    <Suspense>
      <LoginForm
        title="Login as Traveller"
        subtitle="Enter your email below to login to your account"
        onSubmit={handleSubmit}
        buttonLabel="Login"
        forgotPasswordHref="#"
        linkHref="/signup/user"
        onClickGoogle={signInGoogle}
        loading={loading}
      />
    </Suspense>
  );
};

export default UserLoginPage;