'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../Button';
import { Label } from '../ui/label';
import { Heading } from '../Heading';
import { useState } from 'react';
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
interface VerifyFormProps {
  title: string;
  subtitle: string;
  fields: { name: string; label: string; type: string; placeholder: string }[];
  onSubmit: (values: any, actions: any) => void;
  buttonLabel: string;
  linkHref: string;
}

const VerifyForm: React.FC<VerifyFormProps> = ({
  title,
  subtitle,
  fields,
  onSubmit,
  buttonLabel,
  linkHref,
}) => {

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(15, 'Password must be less than 15 characters'),
  });
  const initialValues = { password: '' };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
                      <div className="relative">
                        <Field
                          name={field.name}
                          type={field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                          placeholder={field.placeholder}
                          className="p-2 w-full"
                        />
                        {field.type === 'password' && (
                          <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          >
                            {/* <div icon={showPassword ? IoEyeOffOutline : IoEyeOffOutline} /> */}
                            {showPassword ? <MdOutlineRemoveRedEye size={20}/> : <IoEyeOffOutline size={20}/> }
                          </button>
                        )}
                      </div>
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}
                  <Button type="submit" label={buttonLabel} />
                </div>
                <div className="mt-4 text-center text-sm">
                  Expired token?{' '}
                  <Link
                    href={linkHref}
                    className="underline hover:text-blue-500"
                  >
                    Resend email verification
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

export default VerifyForm;
