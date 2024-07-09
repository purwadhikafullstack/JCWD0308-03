'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SingUpForm from '@/components/auth/SignUpForm';
import { registerAccount } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import { Heading } from '@/components/Heading';
import { useAppDispatch } from '@/hooks/hooks';
import { setUser } from '@/hooks/features/profile/userSlice';
import { createToken } from '@/app/action';
import Cookies from 'js-cookie';

const UserSignup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data, signInGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const dispatch = useAppDispatch()

  const handleSubmit = async (values: any, actions: any) => {
    setLoading(true);
    try {
      const response = await registerAccount(values, 'users');
      if (response.status === 'ok') {
        setSentSuccess(true);
      } else if (response.message === 'Email already registered') {
        toast({
          title: response.message,
          description: 'You will redirect to login page',
          duration: 3000,
        });
        setTimeout(() => {
          router.push('/login/user');
        }, 3500);
      } else {
        toast({
          title: 'Failed to register account',
          description: response || response.message,
          duration: 5000,
        });
      }
    } catch (error: any) {
      console.error('Failed to register account front :', error);
    }
    setLoading(false);
    actions.resetForm();
  };

  useEffect(() => {
    async function SignInGoogle() {
      const {user} = data
      const userData = {name:user.displayName, email:user.email, profile:user.photoURL, phoneNumber:user.phoneNumber}
      try {
        const res = await registerAccount(userData, 'users')
        if (res.status === 'ok') {
          dispatch(setUser(res.user))
          createToken(res.token)
          Cookies.set('token', res.token, { expires: 1 })
          toast({
            title: 'Successfully login',
            description : 'You will redirect to home page',
            duration: 3000,
          })
          setTimeout(() => {router.push('/')}, 3500)
        }else if (res.message === 'Account already registered as tenant please login as tenant'){
          toast({
            title: res.message,
            description: 'You will redirect to home page',
            duration: 3000,
          })
          setTimeout(() => {router.push('/')}, 3500)
        }else {
          console.log("register user from google : ", res);
          toast({
            title: 'Something went wrong, please try again!',
          })
        }
      } catch (error) {
        toast({
          title: 'Something went wrong, please try again!',
        })
      }
    }

    if (data) SignInGoogle()
    
  },[data, dispatch, router, toast])


  return (
    <div>
      {sentSuccess && (
        <div className="min-h-screen flex justify-center flex-col items-center gap-2 px-3">
          <Heading title="New email verification link sent successfully" />

          <p className="text-pretty text-center">
            Check your email inbox
            <br />
            Tip: check your spam folder in case the email was incorrectly identified.
          </p>
        </div>
      )}
      {!sentSuccess && (
        <SingUpForm
          initialValues={{ name: '', email: '' }}
          title="Register as Traveler"
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
          onClickGoogle={signInGoogle}
          loading={loading}
        />
      )}
    </div>
  );
};

export default UserSignup;
