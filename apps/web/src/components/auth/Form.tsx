'use client';
import { ErrorMessage, Form, Formik } from 'formik';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../Button';
import { Label } from '../ui/label';
import { Heading } from '../Heading';
interface FormProps {
  title: string;
  subtitle: string;
  fields: { name: string; label: string; type: string; placeholder: string }[];
  onSubmit: (values: any, actions: any) => void;
  buttonLabel: string;
  linkHref: string;
  validationSchema: any;
  initialValues: any;
  linkTitle: string;
  linkDescription: string;
}

const FormComp: React.FC<FormProps> = ({
  title,
  subtitle,
  fields,
  onSubmit,
  buttonLabel,
  linkHref,
  validationSchema,
  initialValues,
  linkTitle,
  linkDescription
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
                <Heading center title={title} subtittle={subtitle} />
              </CardHeader>
              <CardContent>
                <div className="grid pt-4 gap-4">
                {fields.map((field, index) => (
                    <div key={index} className="grid gap-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
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
                  {linkTitle}
                  <Link
                    href={linkHref}
                    className="underline hover:text-blue-500"
                  >
                    {linkDescription}
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

export default FormComp;
