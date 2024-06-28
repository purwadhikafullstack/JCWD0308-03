'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import SingUpForm from '@/components/auth/SignUpForm';
import { registerAccount } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';

const UserSignup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {data, signInGoogle}= useAuth()

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const response = await registerAccount(values, 'users');
      if(response.status === 'ok') {
         toast({
          title: 'Account created successfully, please check your email for verification',
          description: 'You will redirect to home page',
          duration: 3000,
        })
        setTimeout(() => {router.push('/')}, 3500)
      } else if (response.message === 'Email already registered') {
        toast({
          title: response.message,
          description: "You will redirect to login page",
          duration: 3000,
        })
        setTimeout(() => {router.push('/login/user')}, 3500)
      } else {
        toast({
          title: 'Failed to register account',
          description: response.message,
          duration: 5000,
        })
      }
    } catch (error: any) {
      console.error('Failed to register account front :', error);
    }
    actions.resetForm();
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
    <div>
      <SingUpForm
      initialValues={{ name: '', email: '' }}
        title="Register as Traveller"
        subtitle="Enter your information to create an account"
        fields={[
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter your name',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
          },
        ]}
        onSubmit={handleSubmit}
        buttonLabel="Create an account"
        linkHref="/login/user"
        onClickGoogle={handleGoogleSignIn}
      />
    </div>
  );
};

export default UserSignup;
