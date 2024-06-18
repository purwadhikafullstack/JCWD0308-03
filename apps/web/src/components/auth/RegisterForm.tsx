'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { Heading } from '../Heading';

const RegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required('Fullname is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
});
export default function RegisterForm() {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values, action) => {
        console.log('values register form : ', values);
        action.resetForm;
      }}
    >
      {() => {
        return (
            <div className="pt-52 flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 z-50 bg-yellow-400">
              <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto bg-blue-900">
                <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center p-6 rounded-t justify-center relative">
                    <Heading title="Register" />
                  </div>
                  {/* body */}
                  <div className="relative p-6 flex-auto">
                    <Form>

                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      <Field
                        name="name"
                        type="text"
                        placeholder="Fullname"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </label>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      <Field
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </label>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                    </Form>

                    <button type="submit">Register</button>
                  </div>
                </div>
              </div>
            </div>
        );
      }}
    </Formik>
  );
}
