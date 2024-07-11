"use client";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import roomFacilities from '@/components/RoomFacilities';
import { Checkbox } from '@/components/ui/checkbox';



const validationSchema = Yup.object().shape({
  items: Yup.array()
    .of(Yup.string())
    .min(1, 'You must select at least one item')
    .required('Please select at least one item'),
});

const RoomFaciitiesCheckBox = () => {
  const initialValues = {
    items: ['recents', 'home'],
  };

  const handleSubmit = (values:any, actions:any) => {
    console.log(values);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-8">
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Sidebar</FormLabel>
              <FormMessage>Select the items you want to display.</FormMessage>
            </div>
            {roomFacilities.map((item) => (
              <Field key={item.label} type="checkbox" name="items">
                {({ field : {  ...field} }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value.includes(item.label)}
                        onChange={() => {
                          const nextValue = field.value.includes(item.label)
                            ? field.value.filter((value:any) => value !== item.label)
                            : [...field.value, item.label];
                          field.onChange({
                            target: {
                              name: field.name,
                              value: nextValue,
                            },
                          });
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                  </FormItem>
                )}
              </Field>
            ))}
            <ErrorMessage name="items" component="div" className="text-red-500 text-sm" />
          </FormItem>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RoomFaciitiesCheckBox;
