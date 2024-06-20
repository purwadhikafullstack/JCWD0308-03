'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

const TenantLoginPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (values: any, actions: any) => {
    // Handle tenant login logic
    console.log('Tenant login form submitted', values);
    // router.push('/tenant-dashboard');
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
      title="Login as Tenant"
      subtitle="Enter your email below to login to your tenant account"
      onSubmit={handleSubmit}
      buttonLabel="Submit"
      forgotPasswordHref="#"
      googleLogin={handleGoogleLogin}
      linkHref="/signup/tenant"
    />
  );
};

export default TenantLoginPage;
