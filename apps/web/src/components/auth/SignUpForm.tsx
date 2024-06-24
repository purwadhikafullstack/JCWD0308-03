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
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

interface SignUpFormProps {
  initialValues: any;
  validationSchema: yup.ObjectSchema<any>;
  title: string;
  subtitle: string;
  fields: { name: string; label: string; type: string; placeholder: string }[];
  onSubmit: (values: any, actions: any) => void;
  buttonLabel: string;
  linkHref: string;
}

const SingUpForm: React.FC<SignUpFormProps> = ({
  initialValues,
  validationSchema,
  title,
  subtitle,
  fields,
  onSubmit,
  buttonLabel,
  linkHref,
}) => {
  const { signInGoogle, data } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      console.log( "user data google signIn : " ,data.user);
      
      toast({
        title: 'Succes login',
        description: 'You will redirect to home page',
        duration: 3000,
      });
      setTimeout(() => {
        router.push('/'), 4000;
      });
    } catch (error) {
      console.log('erorr signIn with google : ', error);
      toast({
        title:"Something went wrong please try again!"
      })
    }
  };

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
                  {fields.map((field, index) => (
                    <div key={index} className="grid gap-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <Field
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="p-2"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}
                  <Button type="submit" label={buttonLabel} />
                  {/* <hr>or</hr> */}
                  <Button
                    type="button"
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={handleGoogleSignIn}
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
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingUpForm;
