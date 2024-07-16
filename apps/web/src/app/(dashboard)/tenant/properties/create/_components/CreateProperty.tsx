'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { categories } from '@/components/home/Categories';
import CategoryInput from './Input/CategoryInput';
import LocationInput from './Input/LocationInput';
import DescriptionInput from './Input/DescriptionInput';

import { validationSchemas } from './validationSchema';
import { initialValues } from './validationSchema';
import { createProperty } from '@/lib/properties';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const CreateProperty = () => {
  const token = Cookies.get('token');
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast()

  const nextStep = () => {setStep((prevStep) => prevStep + 1)};
  const previousStep = () => {setStep((prevStep) => prevStep - 1)}

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    const transformedValues = {
      ...values,
      province: values.province.label,
      city: values.city.label,
      district: values.district.label,
    };

    try {
      if (token) {
        const res =  await createProperty(transformedValues, token);
        if (res.status === 'ok') {
          toast.toast({
            title: 'Success save property information, now you can upload your property images',
            duration: 3000,
          })
          setTimeout(() => router.push(`/tenant/properties/create/upload-images/${res.createdProperty.id}`), 3500)
      } else{
        toast.toast({
          title : "Your Session Has Expired",
          description : "Please Login Again",
          duration : 3000
        })
        setTimeout(() => router.push('/login/tenant'), 3500)
      }
    }
    
    } catch (error:any) {
      console.log("failed to create properties : ", error);
    }
    setIsSubmitting(false);
  };

  return (
    
    <Card className="w-full max-w-lg mx-auto mt-28">
      <CardHeader>
        <CardTitle className="text-center">
          {step === 0 ? 'Select Category' : 'Property Information'}
        </CardTitle>
        <CardDescription className='text-center'>
          {step === 0 ? 'Choose the category for your property.' : 'Fill in the details to create a new property.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[step]}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }: FormikProps<any>) => (
            <Form>
              {step === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-scroll">
                  {categories.map((category) => (
                    <Field name="category" key={category.label}>
                      {({ field, form }: { field: any; form: any }) => (
                        <div>
                          <CategoryInput
                            field={field}
                            form={form}
                            label={category.label}
                            icon={category.icon}
                          />
                          <ErrorMessage name="category" component="div" className="text-red-500 text-sm"
                          />
                        </div>
                      )}
                    </Field>
                  ))}
                </div>
              )}
              {step === 1 && (
                <div className="grid w-full gap-4">
                    <Label htmlFor="name">Property Name</Label>
                    <Field name="name" as={Input} id="name" placeholder="Your property name"/>
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
                  <div className="flex flex-col space-y-1.5">
                    <Field name="description" component={DescriptionInput} placeholder="Property Description"/>
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm"/>
                  </div>
                  <LocationInput
                    provinceValue={values.province}
                    regencyValue={values.city}
                    districtValue={values.district}
                    address={values.address}
                    onProvinceChange={(value: any) => setFieldValue('province', value)}
                    onRegencyChange={(value: any) => setFieldValue('city', value)}
                    onDistrictChange={(value: any) => setFieldValue('district', value)}
                    onAddressChange={(value: any) => setFieldValue('address', value)}
                  />
                </div>
              )}

              <CardFooter className="flex justify-between mt-4">
                {step > 0 && (
                  <Button variant="outline" type="button" onClick={previousStep}>
                    Back
                  </Button>
                )}
                {step < 1 && (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                )}
                {step === 1 && (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                )}
              </CardFooter>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default CreateProperty;
