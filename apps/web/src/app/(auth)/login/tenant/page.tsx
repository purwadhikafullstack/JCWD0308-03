'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { loginAccount } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';

const TenantLoginPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);


  if (loading) {
    return <div>loading... </div>;
  }

  const handleSubmit = async (values: any, actions: any) => {
    try {
      setLoading(true);
      const res = await loginAccount(values, 'tenants');
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



  return (
    <LoginForm
      title="Login as Tenant"
      subtitle="Enter your email below to login to your account"
      onSubmit={handleSubmit}
      buttonLabel="Login"
      forgotPasswordHref="#"
      linkHref="/signup/tenant"
    />
  );
};

export default TenantLoginPage;
