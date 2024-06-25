'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../Button';
import { Label } from '../ui/label';
import { Heading } from '../Heading';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';
import { useState } from 'react';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

interface LoginFormProps {
  title: string;
  subtitle: string;
  onSubmit: (values: any, actions: any) => void;
  buttonLabel: string;
  forgotPasswordHref: string;
  linkHref: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  title,
  subtitle,
  onSubmit,
  buttonLabel,
  forgotPasswordHref,
  linkHref,
}) => {

  const initialValues = {email: '', password: ''};
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(15, "Password can't be more than 15 characters"),
  });

  const { signInGoogle, data } = useAuth();
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      console.log('user data google signIn : ', data.user); 

      toast({
        title: 'Succes login',
        description : 'You will redirect to home page',
        duration: 3000,
      });
      setTimeout(() => {router.push('/')}, 3500)
    } catch (error) {
      console.log('erorr signIn with google : ', error);
      toast({
        title: 'Something went wrong please try again!'
      })
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="px-4 sm:px-0 md:px-0">
            <Card className="min-w-[370px] w-full">
              <CardHeader>
                <Heading center title={title} subtittle={subtitle} />
              </CardHeader>
              <CardContent>
                <div className="grid pt-4 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      className="p-2 border border-green-300 rounded"
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
                    </div><div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="p-2 border border-gray-300 rounded w-full"
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <MdOutlineRemoveRedEye size={20} /> : <IoEyeOffOutline size={20} /> }
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <Button type="submit" label={buttonLabel} />
                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400">or</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                  </div>
                  <Button
                    type="button"
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={handleGoogleSignIn}
                  />
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link href={linkHref} className="underline">
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
