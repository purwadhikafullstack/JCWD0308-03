'use client';

import React, { useEffect, useState } from 'react';
import VerifyForm from '@/components/auth/verifyAccountForm';
import { VerifyEmail, resendVerifyEmail } from '@/lib/account';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import ResendVerifyForm from '@/components/auth/ResendVerify';
import { Heading } from '@/components/Heading';

const VerifyPageTenant = () => {
  const params = useParams();
  const router = useRouter();
  const [verificationError, setVerificationError] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleVerify = async (values: any, actions: any) => {
    setLoading(true);
    try {
      const token = params.token.toString();
      const response = await VerifyEmail(values, token);
      if (response.status === 'ok') {
        toast({
          title: 'Account verified successfully',
          description: 'You will redirect to login page',
          duration: 3000,
        });
        setTimeout(() => {
          router.push(`/login/tenant`);
        }, 3500);
      }else if (response.message.name === 'JsonWebTokenError') {
        toast({
          title: 'Invalid link verify, please check your email and click the verify button',
          duration: 3000,
          variant: 'destructive',
        })
      } else if (response.message.name === 'TokenExpiredError') {
        setVerificationError(response.message.name)
      } else {
          toast({
            title: response.message,
            duration: 3000
          })
      }
    } catch (error: any) {
      console.error('failed to verify:', error);
    }
    setLoading(false);
    actions.resetForm();
  };


  const handleResendVerify = async (values: any, actions: any) => {
    setLoading(true);
    try {
      const response = await resendVerifyEmail(values.email, 'tenants');
      if (response.status === 'ok') {
        setSentSuccess(true);
      }
    } catch (error) {
      toast({
        title: 'Failed to resend verification link',
        description: 'Please try again later',
        duration: 3000,
        variant: 'destructive',
      })
    }
    setLoading(false);
    actions.resetForm();
  }

  return (
    <div>
      {verificationError && !sentSuccess && (
          <ResendVerifyForm 
          title='Verification link expired'
          subtitle='Please enter your email and click the button below to request a new verification link.'
          buttonLabel='Request new verification link'
          fields={[
            {
              name: 'email',
              label : 'Email',
              type : 'email',
              placeholder : 'Enter your email',
            }
          ]}
          onSubmit={handleResendVerify}
          loading={loading}
          />
        
      )}
      {!verificationError && !sentSuccess &&  (
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
          loading={loading}
        />
      )}
      {sentSuccess && (
        <div className='min-h-screen flex justify-center flex-col items-center gap-2 px-3'>
          <Heading 
          title="New email verification link sent successfully"/>

          <p className='text-pretty text-center'>Check your email inbox
            <br/>
            Tip: check your spam folder in case the email was incorrectly identified.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyPageTenant;
