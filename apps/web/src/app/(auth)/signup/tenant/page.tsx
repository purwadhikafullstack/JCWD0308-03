'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SingUpForm from '@/components/auth/SignUpForm';
import { registerAccount } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import { Heading } from '@/components/Heading';

const TenantSignup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { signInGoogle, data } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false)
  const handleSubmit = async (values: any, actions: any) => {
    setLoading(true);
    try {
      const response = await registerAccount(values, 'tenants');
      if (response.status === 'ok') {
        setSentSuccess(true);
      } else if (response.message === 'Email already registered') {
        toast({
          title: response.message,
          description: 'You will redirect to login page',
          duration: 3000,
        });
        setTimeout(() => {
          router.push('/login/tenant');
        }, 3500);
      } else {
        toast({
          variant : 'destructive',
          title: 'Failed to register account',
          description: response.message || response || response.msg,
          duration: 5000,
        });
      }
    } catch (error: any) {
      console.error('Failed to register account front :', error);
      // return null;
    }
    setLoading(false);
    actions.resetForm();
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div>
      {sentSuccess && (
        <div>
          <Heading title='Your account created successfully'/>
          <p className='text-center text-pretty'>C</p>

        </div>
      )}
      <SingUpForm
        initialValues={{ name: '', email: '', phoneNumber: '' }}
        title="Register as Tenant"
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
          {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'tel',
            placeholder: 'Enter your phone number',
          },
        ]}
        onSubmit={handleSubmit}
        buttonLabel="Create an account"
        linkHref="/login/user"
        onClickGoogle={handleGoogleSignIn}
        loading={loading}
      />
    </div>
  );
};

export default TenantSignup;
