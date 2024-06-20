'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import SingUpForm from '@/components/auth/SignUpForm';

const initialValues = {
  name: '',
  email: '',
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup.string().email('Invalid email'),
});

const TenantSignup = () => {
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = (values: any, actions: any) => {
    // Here you would typically handle the form submission logic, e.g., API call
    console.log('Form submitted:', values);
    // Redirect to welcome or other page upon successful registration
    // router.push('/welcome');
    actions.resetForm();
  };

  return (
    <div>
      <SingUpForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        title="Register as Tenant"
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
        linkHref="/login/tenant"
      />
    </div>
  );
};

export default TenantSignup;
