'use client';
import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { loginAccount } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setUser } from '@/hooks/features/profile/userSlice';

const UserLoginPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { signInGoogle , data} = useAuth();
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user) 

  if (loading) {
    return <div>loading... </div>;
  }

  const handleSubmit = async (values: any, actions: any) => {
    try {
      setLoading(true);
      const res = await loginAccount(values, 'users');

      if (res.status === 'ok') {
        
        toast({
          title: 'Login successful',
          description: 'You have successfully logged in.',
          duration: 3000,
        });
        router.push('/');
      } else {
        toast({
          title: 'Login failed',
          description: res.message,
          duration: 5000,
        });
      }

      if (
        res.message ==
        'Email not registered, please register an account first, you will redirect to register page'
      ) {
        setTimeout(() => {
          router.push('/signup/user');
        }, 6000);
      }
    } catch (error: any) {
      console.log('login error : ', error);
    } finally {
      setLoading(false);
      actions.resetForm();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      console.log('user data google signIn : ', data);
      toast({
        title: 'Succes login',
        description: 'You will redirect to home page',
        duration: 2000,
      });
      setTimeout(() => {
        router.push('/');
      }, 2500);
    } catch (error) {
      console.log('erorr signIn with google : ', error);
      toast({
        title: 'Something went wrong please try again!',
      });
    }
  };

  return (
    <Suspense>
      <LoginForm
        title="Login as Traveller"
        subtitle="Enter your email below to login to your account"
        onSubmit={handleSubmit}
        buttonLabel="Login"
        forgotPasswordHref="#"
        linkHref="/signup/user"
        onClickGoogle={handleGoogleSignIn}
      />
    </Suspense>
  );
};

export default UserLoginPage;
