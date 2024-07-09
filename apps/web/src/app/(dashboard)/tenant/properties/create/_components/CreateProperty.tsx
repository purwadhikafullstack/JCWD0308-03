"use client"
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';

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
import { ImageUpload } from './Input/ImageUpload';
import DescriptionInput from './Input/DescriptionInput';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}

const validationSchemas = [
  Yup.object().shape({
    category: Yup.string().required('Category is required'),
  }),
  Yup.object().shape({
    country: Yup.string().required('Country is required'),
    city: Yup.object().shape({
      value: Yup.string().required('City is required'),
      label: Yup.string().required('City label is required'),
    }),
    province: Yup.object().shape({
      value: Yup.string().required('Province is required'),
      label: Yup.string().required('Province label is required'),
    }),
    district: Yup.object().shape({
      value: Yup.string().required('District is required'),
      label: Yup.string().required('District label is required'),
    }),
    address: Yup.string().required('Address is required'),
  }),
  Yup.object().shape({
    name: Yup.string().required('Name is required'),
    images: Yup.string().required('Image is required').min(1, 'Please upload at least one image').max(10, 'Please upload no more than 10 images'),
  }),
  Yup.object().shape({
    description: Yup.string().required('Description is required'),
  }),
  Yup.object().shape({
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive'),
  }),
];

const initialValues = {
  category: '',
  country: '',
  city: '',
  province: '',
  district: '',
  address: '',
  name: '',
  description: '',
  price: null,
  images: '',
}

export default function CreateProperty() {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const nextStep = () => {setStep((value) => value + 1)}
  const onBack = () => {setStep((value) => value - 1)}

  const onSubmit = async (value: any, { setSubmitting }: any) => {
    setSubmitting(true);
    const transformedValues = {
      ...value,
      province: value.province.label,
      city: value.city.label,
      district: value.district.label,
    };
    // Handle form submission logic, e.g., make an API call
    console.log(transformedValues);
    setSubmitting(false);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Create Property</CardTitle>
        <CardDescription>
          Fill in the details to create a new property.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[step]}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }: FormikProps<any>) => (
            <Form>
              {step === STEPS.CATEGORY && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-scroll">
                  {categories.map((category) => (
                    <Field name="category" key={category.label} className="col-span-1">
                      {({ field, form }: { field: any; form: any }) => (
                        <CategoryInput
                          field={field}
                          form={form}
                          label={category.label}
                          icon={category.icon}
                        />
                      )}
                    </Field>
                  ))}
                  <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                </div>
              )}
              {step === STEPS.LOCATION && (
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
              )}
              {step === STEPS.INFO && (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Property Name</Label>
                    <Field name="name" as={Input} id="name" placeholder="Your property name" />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                  </div>
                
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="images">Show guests what your place looks like!</Label>
                    <Field name="images" as={Input} component={ImageUpload} id="images" />
                    <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              )}
              {step === STEPS.DESCRIPTION && (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Field
                      name="description"
                      component={DescriptionInput}
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              )}
              {step === STEPS.PRICE && (
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Field name="price" as={Input} id="price" placeholder="Price" type="number" />
                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              )}
              <CardFooter className="flex justify-between mt-4">
                {step > STEPS.CATEGORY && (
                  <Button variant="outline" type="button" onClick={onBack}>
                    Back
                  </Button>
                )}
                {step < STEPS.PRICE && (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                )}
                {step === STEPS.PRICE && (
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                )}
              </CardFooter>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
