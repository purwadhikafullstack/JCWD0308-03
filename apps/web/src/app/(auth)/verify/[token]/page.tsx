'use client';

import React, { useEffect, useState } from 'react';
import VerifyForm from '@/components/auth/verifyAccountForm';
import { VerifyEmail } from '@/lib/account';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const VerifyPage = () => {
  const params = useParams();
  const router = useRouter();
  const [verificationError, setVerificationError] = useState('');
  const { toast, dismiss } = useToast();
  const handleVerify = async (values: any, actions: any) => {
    try {
      const token = params.token.toString();
      const response = await VerifyEmail(values, token);
      if (response.status === 'ok') {
        toast({
          title: 'Account verified successfully',
          description: 'You will redirect to login page',
          duration: 2500,
        });
        setTimeout(() => {
          router.push('/login/user');
        }, 3000);
      } else if (response.message === 'Email already verified') {
        setVerificationError('Email already verified');
      }
    } catch (error: any) {
      console.error(' failed:', error);
      if (error) {
        setVerificationError('Email verification link expired.');
      } else {
        setVerificationError('Verification failed: ' + error.message);
      }
    }
    actions.resetForm();
  };

  return (
    <div>
      {verificationError && (
        <div className="p-52">
          <h2>Email verification link expired</h2>
          <p>Please request a new verification link.</p>
        </div>
      )}
      {!verificationError && (
        <VerifyForm
          title="Verify your Account"
          subtitle="Enter password and verify your account"
          fields={[
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              placeholder: 'Enter your password',
            },
          ]}
          onSubmit={handleVerify}
          buttonLabel="Verify"
          linkHref="/login/user"
        />
      )}
    </div>
  );
};

export default VerifyPage;
