"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

const UserLoginPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (values: any, actions: any) => {
    // Handle user login logic
    console.log('User login form submitted', values);
    // router.push('/user-dashboard');
    actions.setSubmitting(false);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic
    console.log('Continue with Google');
  };

  const initialValues = { email: '', password: '' };

  return (
    <LoginForm
      initialValues={initialValues}
      title="Login as Traveller"
      subtitle="Enter your email below to login to your account"
      onSubmit={handleSubmit}
      buttonLabel="Login"
      forgotPasswordHref="#"
      googleLogin={handleGoogleLogin}
      linkHref="/signup/user"
    />
  );
};

export default UserLoginPage;
