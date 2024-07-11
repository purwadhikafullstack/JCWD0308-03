'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { loginAccount, registerUserGoogle } from '@/lib/account';
import { useToast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import { createToken } from '@/app/action';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setUser } from '@/hooks/features/profile/userSlice';
import Cookies from 'js-cookie';

const TenantLoginPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { signInGoogle , data} = useAuth();
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user);
  const handleSubmit = async (values: any, actions: any) => {
    setLoading(true);
    try {
      const res = await loginAccount(values, 'tenants');
      console.log("res login tenant :"  , res);
      
      if (res.status === 'ok') {
        dispatch(setUser(res.tenant))
        console.log("tenant login :", user );
        toast({
          title: 'You succesfully login as tenant',
          description: 'You will redirect to management page',
          duration: 3000,
        });
        setTimeout(() => {router.push('/tenant/management')}, 3500) 
      } else {
        toast({
          title: 'Login failed',
          description: res.message || res.message.name,
          duration: 5000,
        });
      }

      if (res.message =='Email not registered, please register an account first, you will redirect to register page') {
        setTimeout(() => {
          router.push('/signup/user');
        }, 5500);
      }
    } catch (error: any) {
      console.log('login tenant error : ', error);
    } finally {
      setLoading(false);
      actions.resetForm();
    }
  }

  useEffect(() =>{
    async function registerUserFromGoogle() {
      const { user } = data
      const userData = {name: user.displayName, email: user.email, profile: user.photoURL, phoneNumber: user.phoneNumber}

      try {
        const res = await registerUserGoogle(userData, 'tenants')
        if (res.status === 'ok') {
          dispatch(setUser(res.user))
          createToken(res.token)
          Cookies.set('token', res.token , {expires: 1})
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
    <LoginForm
      title="Login as Tenant"
      subtitle="Enter your email below to login to your account"
      onSubmit={handleSubmit}
      buttonLabel="Login"
      forgotPasswordHref="#"
      linkHref="/signup/tenant"
      onClickGoogle={signInGoogle}
      loading={loading}
    />
  );
};

export default TenantLoginPage;
