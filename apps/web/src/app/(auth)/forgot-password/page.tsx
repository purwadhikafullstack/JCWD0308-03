"use client";
import ResendVerifyForm from '@/components/auth/ResendVerify';
import { useToast } from '@/components/ui/use-toast';
import { forgotPassword } from '@/lib/account';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ForgotPassword = () => {
  const {toast} = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);

  const handleSubmit = async (values: any ,actions: any )=> {
    setLoading(true);
    try {
      const response = await forgotPassword(values);
      if (response.status === 'ok') {
        toast({
          title: 'Success',
          description: 'Check your email for reset password link.',
          duration: 4000,
        })
        setSucces(true);
        setTimeout(() => {
          router.push('/')
        }, 4000)
      } else {
        toast({
          title: 'Failed',
          description: response.message || response,
          duration: 4000,
        })
      }
    } catch (error) {
      console.error('Failed to submit forgot password request', error);
    }
    setLoading(false);
    actions.resetForm();
  };

  return (
    <div>
        <ResendVerifyForm 
        title='Forgot Password Request'
        subtitle='Please enter your email and click the button below to request a reset password link'
        buttonLabel='Request reset password'
        fields={[
          {name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email'},
        ]}
        onSubmit={handleSubmit}
        loading={loading || succes}
        />
    </div>
  );
};

export default ForgotPassword;
