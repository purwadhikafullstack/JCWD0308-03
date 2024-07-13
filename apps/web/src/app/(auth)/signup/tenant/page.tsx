'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SingUpForm from '@/components/auth/SignUpForm';
import { registerAccount, registerUserGoogle } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import { Heading } from '@/components/Heading';
import { useAppDispatch } from '@/hooks/hooks';
import { setUser } from '@/hooks/features/profile/userSlice';
import { createToken } from '@/app/action';
import Cookies from 'js-cookie';

const TenantSignup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { signInGoogle, data } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false)
  const dispatch = useAppDispatch()
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
          duration: 5000,
        });
      }
    } catch (error: any) {
      console.error('Failed to register account front :', error);
      toast({
        variant : 'destructive',
        title: 'Failed to register account',
        description: error.message || error || error.msg,
        duration: 5000,
      })
    }
    setLoading(false);
    actions.resetForm();
  };


  useEffect(() =>{
    async function registerUserFromGoogle() {
      const { user } = data
      const userData = {name: user.displayName, email: user.email, profile: user.photoURL, phoneNumber: user.phoneNumber}

      try {
        const res = await registerUserGoogle(userData, 'tenants')
        if (res.status === 'ok') {
          dispatch(setUser(res.tenant))
          createToken(res.token)
          Cookies.set('token', res.token, {expires: 1})
          toast({
            title: 'You succesfully login as tenant',
            description: 'You will redirect to management page',
            duration: 3000,
          })
          setTimeout(() => {router.push('/tenant/management')}, 3500)
        } else if (res.message === 'Account already registered as Traveler, please login as Traveler') {
          toast({
            title: 'Account already registered as Traveler, please login as Traveler',
            description: 'You will redirect to login as traveler page',
            duration: 3000,
          })
          setTimeout(() => {router.push('/login/user')}, 3500)
        } else {
          console.log('something went wrong: ', res);
          toast({
            title: 'Something went wrong please try again!',
          })
        }
      } catch (error) {
        toast({
          title :"Something went wrong please try again!",
        })
      }
    }
    if (data) registerUserFromGoogle()
  } , [data, toast, router, dispatch])


  return (
    <div>
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
      {!sentSuccess && (
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
        linkHref="/login/tenant"
        onClickGoogle={signInGoogle}
        loading={loading}
      />
      )}
    </div>
  );
};

export default TenantSignup;
