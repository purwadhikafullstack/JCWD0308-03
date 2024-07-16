'use client';
import FormComp from '@/components/auth/Form';
import { useToast } from '@/components/ui/use-toast';
import { resetPassword } from '@/lib/account';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  const { toast } = useToast();
  const token = params.token
  const [loading, setLoading] = useState(false);

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const resetPasswordSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const handleSubmit = async (values: any, actions: any) => {
    setLoading(true);
    try {
      const response = await resetPassword(values, token);

      if (response.status === 'ok') {
        toast({
          title: 'Success',
          description: 'You will redirect to login page',
          duration: 4000,
        });
        if (response.isUser === true) {
          setTimeout(() => {
            router.push('/login/user');
          }, 4000);
        } else {
          setTimeout(() => {
            router.push('/login/tenant');
          }, 4000);
        }
      } else {
        toast({
          title: 'Failed',
          description: response.message || response,
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Failed to submit forgot password request', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        duration: 4000,
      });
    }
    setLoading(false);
    actions.resetForm();
  };

  return (
    <div>
      <FormComp
        title="Reset Password"
        subtitle="Please enter your new password"
        buttonLabel="Reset Password"
        linkHref="/"
        linkTitle="Don't want to reset your password?"
        linkDescription="Back to home page"
        fields={[
          {
            name: 'password',
            label: 'New Password',
            type: 'password',
            placeholder: 'Enter your password',
          },
          {
            name: 'confirmPassword',
            label: 'Confirm New Password',
            type: 'password',
            placeholder: 'Enter your password',
          },
        ]}
        onSubmit={handleSubmit}
        validationSchema={resetPasswordSchema}
        initialValues={initialValues}
      />
    </div>
  );
};
export default ResetPassword;
