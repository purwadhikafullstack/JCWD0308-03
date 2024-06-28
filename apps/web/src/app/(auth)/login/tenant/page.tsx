'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { loginAccount } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';

const TenantLoginPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { signInGoogle , data} = useAuth();


  if (loading) {
    return <div>loading... </div>;
  }

  const handleSubmit = async (values: any, actions: any) => {
    try {
      setLoading(true);
      const res = await loginAccount(values, 'tenants');
      console.log("res login tenant :"  , res);
      
      if (res.status === 'ok') {
        
        toast({
          title: 'Login as tenant successful',
          description: 'You have successfully logged in.',
          duration: 3000,
        });
        setTimeout(() => {router.push('/')}, 3300) 
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
      console.log('login tenant error : ', error);
      alert();
    } finally {
      setLoading(false);
      actions.resetForm();
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      console.log('user data google signIn : ', data);
      toast({
        title: 'Succes login',
        description: 'You will redirect to home page',
        duration: 3000,
      });
      setTimeout(() => {
        router.push('/');
      }, 3500);
    } catch (error) {
      console.log('erorr signIn with google : ', error);
      toast({
        title: 'Something went wrong please try again!',
      });
    }
  };

  return (
    <LoginForm
      title="Login as Tenant"
      subtitle="Enter your email below to login to your account"
      onSubmit={handleSubmit}
      buttonLabel="Login"
      forgotPasswordHref="#"
      linkHref="/signup/tenant"
      onClickGoogle={handleGoogleSignIn}
    />
  );
};

export default TenantLoginPage;
