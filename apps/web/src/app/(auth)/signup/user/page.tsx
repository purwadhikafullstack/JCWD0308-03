'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import SingUpForm from '@/components/auth/SignUpForm';
import { registerAccount } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const initialValues = {
  email: '',
  name: '',
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const UserSignup = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const response = await registerAccount(values, 'users');
      
      router.push('/welcome');
    } catch (error: any) {
      console.error('Failed to register account:', error);
      alert('Cannot register account: ' + error.message);
    }
    actions.resetForm();
  };

  return (
    <div>
      <SingUpForm
        initialValues={initialValues}
        validationSchema={validationSchema}
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
      />
    </div>
  );
};

export default UserSignup;
