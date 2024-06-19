'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../Button';
import { Label } from '../ui/label';
import { Heading } from '../Heading';
import { FcGoogle } from 'react-icons/fc';

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
                <Heading title={title} subtittle={subtitle} />
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
                  <Button
                    type="button"
                    outline
                    label="Continue with Google"
                    icon={FcGoogle}
                    onClick={() => console.log('Login with Google')}
                  />
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link href={linkHref} className="underline">
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
