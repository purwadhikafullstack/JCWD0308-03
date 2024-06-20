'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import SingUpForm from '@/components/auth/SignUpForm';
import { registerAccount } from '@/lib/account';

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

  const handleSubmit = async (values: any, actions: any) => {
    console.log('Submitting values:', values);
    try {
      const response = await registerAccount(values, 'users');
      console.log('Successfully registered:', response);
      // Redirect on success
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
        subtitle="Create a new account"
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
        buttonLabel="Register"
        linkHref="/login/user"
      />
    </div>
  );
};

export default UserSignup;
