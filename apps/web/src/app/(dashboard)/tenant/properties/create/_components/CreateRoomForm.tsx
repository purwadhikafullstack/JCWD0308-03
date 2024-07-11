"use client";

import { Formik, Form, Field, ErrorMessage, } from 'formik';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import FormField from './FormField';
import { initialValuesRoom, roomValidationSchema } from './validationSchema';
import Wrapper from '@/components/wrapper';
import { Button } from '@/components/Button';
import roomFacilities from '@/components/RoomFacilities';
import RoomFaciitiesCheckBox from '../../room/_components/RoomFacilitiesCheckBox';


const CreateRoomForm: React.FC = () => {
  const handleSubmit = (values: typeof initialValuesRoom, actions: any) => {
    console.log(values);
    actions.setSubmitting(false);
    // Replace with your actual form submission logic
  };

  return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create Room</CardTitle>
          <CardDescription>Fill in the details to create a new room</CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValuesRoom}
          validationSchema={roomValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4 p-4">
              <CardContent>
                <FormField name="type" label='Type' type="text" placeholder="Deluxe / Standard / Suite / etc" />
                <FormField name="price"  label="Price" type="number" placeholder="6000000"/>
                <FormField name="description" label='Description' type="textarea" placeholder="Elegant suite with stunning city views and cozy room with modern amenities and etc" />
                <FormField name="stock" label='Stock' type="number" placeholder="Stock" />
                <FormField name="capacity" label='Capacity' type="number" placeholder="Capacity" />
                <FormField name="bedDetails" label='Bed Details' type="text" placeholder="1 King Bed" />
                <RoomFaciitiesCheckBox />
              </CardContent>
              <CardFooter>
                <Button type="submit" label="Create Room" disabled={isSubmitting} />
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
  );
};

export default CreateRoomForm;
