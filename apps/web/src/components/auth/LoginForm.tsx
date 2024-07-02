'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../Button';
import { Label } from '../ui/label';
import { Heading } from '../Heading';
import { FcGoogle } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

const images = [
  'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1532517891316-72a08e5c03a7?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1599220144359-d4b723bd476d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

interface LoginFormProps {
  title: string;
  subtitle: string;
  onSubmit: (values: any, actions: any) => void;
  buttonLabel: string;
  forgotPasswordHref: string;
  linkHref: string;
  onClickGoogle: () => void;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  title,
  subtitle,
  onSubmit,
  buttonLabel,
  forgotPasswordHref,
  linkHref,
  onClickGoogle,
  loading
}) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setImgUrl(images[randomIndex]);
  }, []);

  const initialValues = { email: '', password: '' };
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(15, "Password can't be more than 15 characters")
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Heading center title={title} subtittle={subtitle} />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form className="px-4 sm:px-0 md:px-0">
                <div className="min-w-[370px] w-full">
                  
                  <CardContent>
                    <div className="grid pt-4 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="m@example.com"
                          className="p-2 border border-grey-300 rounded-lg"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link
                            href={forgotPasswordHref}
                            className="text-sm underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Field
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder={showPassword ? '' : "••••••••"}
                            className="p-2 border border-gray-300 rounded-lg w-full"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          > {showPassword ? (
                              <MdOutlineRemoveRedEye size={20} />
                            ) : (
                              <IoEyeOffOutline size={20} />
                            )}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      {loading ? (
                        <Skeleton className="bg-[#f1f1f1] w-full h-12 rounded-lg cursor-not-allowed flex justify-center items-center">
                          <span className="text-[#4a4a4a]">Loading...</span>
                        </Skeleton>
                      ) : (
                        <Button
                          type="submit"
                          label={buttonLabel}
                        />
                      )}
                      
                      <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                      </div>
                      <Button
                        type="button"
                        outline
                        label={loading ? 'Loading...' : 'Continue with Google'}
                        disabled={loading}
                        icon={FcGoogle}
                        onClick={onClickGoogle}
                      />
                    </div>
                    <div className="mt-4 text-center text-sm">
                      Don&apos;t have an account?{' '}
                      <Link href={linkHref} className="underline">
                        Sign up
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={imgUrl}
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginForm;
