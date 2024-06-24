'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../Button';
import { Label } from '../ui/label';
import { Heading } from '../Heading';
import { FcGoogle } from 'react-icons/fc';

interface LoginFormProps {
  initialValues: any;
  title: string;
  subtitle: string;
  onSubmit: (values: any, actions: any) => void;
  buttonLabel: string;
  forgotPasswordHref: string;
  googleLogin: () => void;
  linkHref: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  initialValues,
  title,
  subtitle,
  onSubmit,
  buttonLabel,
  forgotPasswordHref,
  googleLogin,
  linkHref,
}) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email'),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(15, "Password can't be more than 15 characters"),
  });

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
                    </div>
                    <Field
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="p-2 border border-gray-300 rounded"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <Button type="submit" label={buttonLabel} />
                  <Button
                    type='button'
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={googleLogin}
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
