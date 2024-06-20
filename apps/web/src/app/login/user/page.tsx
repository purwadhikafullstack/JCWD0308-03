'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { loginAccount } from '@/lib/account';
import { createToken } from '@/app/action';

const UserLoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: any, actions: any) => {
    try {
      setLoading(true);
      const res = await loginAccount(values, 'users');
      console.log('token cookie : ', res);
      router.push('/');
    } catch (error: any) {
      alert('Login failed : ' + error.message);
    } finally{
      setLoading(false);
    }
    actions.resetForm();
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
