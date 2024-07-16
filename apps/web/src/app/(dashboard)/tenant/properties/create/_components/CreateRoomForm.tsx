'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import FormField from './FormField';
import { initialValuesRoom, roomValidationSchema } from './validationSchema';
import { Button } from '@/components/Button';
import Wrapper from '@/components/wrapper';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { createRoom } from '@/lib/room';
import { useRouter } from 'next/navigation';
import { roomFacilities } from '@/components/Facilities';
import { bathroomFacilities } from '@/components/Facilities';

const CreateRoomForm = ({ id }: { id: number }) => {
  const [customRoomFacility, setCustomRoomFacility] = useState<string>(''); 
  const [customBathroomFacility, setCustomBathroomFacility] = useState<string>(''); 
  
  const [selectedRoomFacilities, setSelectedRoomFacilities] = useState(roomFacilities); 
  const [selectedBathroomFacilities, setSelectedBathroomFacilities] = useState(bathroomFacilities); 
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const roomFacilityNames = selectedRoomFacilities.map(facility => facility.label);
      const bathroomFacilityNames = selectedBathroomFacilities.map(facility => facility.label);

      const formData = {
        ...values,
        roomFacilities: roomFacilityNames,
        bathroomFacilities: bathroomFacilityNames,
      };

      const res = await createRoom(formData, id);
      if (res.status === 'ok') {
        toast.toast({
          title: 'Success create room',
          description: 'Room created successfully, now upload your images',
          duration: 3000
        });
        setTimeout(() => router.push(`/tenant/properties/room/upload-images/${res.createdRoom.id}`), 3500);
      } else {
        toast.toast({
          title: 'Failed to create room',
          description: res.message || 'Unknown error occurred',
          variant: 'destructive',
          duration: 3000
        });
      }
    } catch (error) {
      console.error(error);
    }

    actions.setSubmitting(false);
  };

  const handleAddCustomRoomFacility = () => {
    if (customRoomFacility.trim() !== '') {
      const newFacility = { label: customRoomFacility, description: customRoomFacility };
      setSelectedRoomFacilities([...selectedRoomFacilities, newFacility]); 
      setCustomRoomFacility('');
    }
  };

  const handleAddCustomBathroomFacility = () => {
    if (customBathroomFacility.trim() !== '') {
      const newFacility = { label: customBathroomFacility, description: customBathroomFacility };
      setSelectedBathroomFacilities([...selectedBathroomFacilities, newFacility]); 
      setCustomBathroomFacility('');
    }
  };

  return (
    <Wrapper>
      <Card className="w-full">
        <CardHeader className='text-center'>
          <CardTitle>Create Room</CardTitle>
          <CardDescription>Fill in the details to create a new room</CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValuesRoom}
          validationSchema={roomValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 sm:p-2 md:p-3 lg:p-4">
              <CardContent>
                <FormField name="type" label='Type' type="text" placeholder="Deluxe / Standard / Suite / etc" />
                <FormField name="price" label="Price" type="number" placeholder="6000000" />
                <FormField name="description" label='Description' type="textarea" placeholder="Elegant suite with stunning city views and cozy room with modern amenities and etc" />
                <FormField name="stock" label='Stock' type="number" placeholder="Stock" />
                <FormField name="capacity" label='Capacity' type="number" placeholder="Capacity" />
                <FormField name="bedDetails" label='Bed Details' type="text" placeholder="1 King Bed" />
                <div className='mt-4 mb-12 relative'>
                  <Label className="block mb-3 pt-2">Room Facilities</Label>
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 '>
                    {selectedRoomFacilities.map((facility, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Field
                          type="checkbox"
                          name={`roomFacilities[${index}]`}
                          value={facility.label}
                        />
                        <span className="ml-2">{facility.label}</span>
                      </div>
                    ))}
                    <div className="absolute -bottom-10 left-0 flex items-center mb-2">
                      <input
                        type="text"
                        value={customRoomFacility}
                        onChange={(e) => setCustomRoomFacility(e.target.value)}
                        placeholder="Add facility.."
                        className="border border-gray-300 rounded-md p-1"
                      />
                      <Button label='Add' type='button' outline small onClick={handleAddCustomRoomFacility} className='ml-2 p-2 font-semibold border-2 border-gray-300' />
                    </div>
                  </div>
                  <ErrorMessage name="roomFacilities" component="div" className="text-red-500 text-sm" />
                </div>

                <div className='mt-4 relative'>
                  <Label className="block mb-3 pt-2">Bathroom Facilities</Label>
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 '>
                    {selectedBathroomFacilities.map((facility, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Field
                          type="checkbox"
                          name={`bathroomFacilities[${index}]`}
                          value={facility.label}
                        />
                        <span className="ml-2">{facility.label}</span>
                      </div>
                    ))}
                    <div className="absolute -bottom-10 left-0 flex items-center mb-2">
                      <input
                        type="text"
                        value={customBathroomFacility}
                        onChange={(e) => setCustomBathroomFacility(e.target.value)}
                        placeholder="Add facility.."
                        className="border border-gray-300 rounded-md p-1"
                      />
                      <Button label='Add' type='button' outline small onClick={handleAddCustomBathroomFacility} className='ml-2 p-2 font-semibold border-2 border-gray-300' />
                    </div>
                  </div>
                  <ErrorMessage name="bathroomFacilities" component="div" className="text-red-500 text-sm" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" label="Create Room" disabled={isSubmitting} />
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </Wrapper>
  );
};

export default CreateRoomForm;
