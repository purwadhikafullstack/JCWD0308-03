import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../Button';
import { Label } from '../ui/label';
import { Heading } from '../Heading';
import { FcGoogle } from 'react-icons/fc';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1532517891316-72a08e5c03a7?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1599220144359-d4b723bd476d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

interface SignUpFormProps {
  title: string;
  subtitle: string;
  fields: { name: string; label: string; type: string; placeholder: string }[];
  onSubmit: (values: any, actions: any) => void;
  buttonLabel: string;
  linkHref: string;
  initialValues: any;
  onClickGoogle: () => void;
  loading: boolean;
}

const SingUpForm: React.FC<SignUpFormProps> = ({
  title,
  subtitle,
  fields,
  onSubmit,
  buttonLabel,
  linkHref,
  initialValues,
  onClickGoogle,
  loading,
}) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    const randomIndex = images[Math.floor(Math.random() * images.length)];
    setImgUrl(randomIndex);
  }, []);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: yup.string().email('Invalid email'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10,15}$/, 'Invalid phone number')
      .min(10, 'Invalid phone number'),
  });

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
              <Form className="">
                <div className="min-w-[350px] w-full">
                  <CardContent>
                    <div className="grid pt-4 gap-4">
                      {fields.map((field, index) => (
                        <div key={index} className="grid gap-2">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          <Field
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            className="p-2 border border-gray-300 rounded-lg"
                          />
                          <ErrorMessage
                            name={field.name}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      ))}
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
                      <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">
                          or
                        </span>
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
                      Already have an account?{' '}
                      <Link
                        href={linkHref}
                        className="underline hover:text-blue-500"
                      >
                        Log in
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

export default SingUpForm;
