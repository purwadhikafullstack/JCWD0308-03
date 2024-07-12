'use client'
import React, { useEffect, useState } from 'react';
import { GoPlus } from "react-icons/go";
import Link from 'next/link';
import { getPropertyByTenantId } from '@/lib/properties';
import Cookies from 'js-cookie';
import { useToast } from '@/components/ui/use-toast';
import Wrapper from '@/components/wrapper';
import { CardProperty } from '@/components/properties/CardProperty';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { property } from 'cypress/types/lodash';
import { Property } from '@/type/property.type';

export default function ManagementProperty() {
  const [propertyList, setPropertyList] = useState([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchProperties() {
      try {
        const token = Cookies.get('token');
        if (token) {
          const res = await getPropertyByTenantId(token);
          setPropertyList(res.properties);
          if (res.status === 'error') {
            toast({
              title: res.message.name || res.message,
              variant: 'destructive',
              duration: 5000
            });
          }
        }
      } catch (error: any) {
        console.log("failed to get properties : ", error);
        toast({
          title: 'Failed to get properties',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
    fetchProperties();
  }, [toast]);

  return (
    <Wrapper>
      <div className='flex justify-between items-center pe-5 py-8 '>
        <h1 className='text-2xl md:text-3xl font-semibold text-start'>Property List</h1>
        <Link href='/tenant/properties/create' className='bg-gray-100 hover:bg-gray-200 p-2 rounded-full'>
          <GoPlus size={32} fill='#4a4a4a' />
        </Link>
      </div>
      {propertyList.length === 0 ? (
        <div className='text-center py-20'>
          <p className='text-lg'>You haven&apos;t created a property yet, let&apos;s create your first property and room!</p>
          <div className='w-40 mx-auto mt-3'>
          <Button label='Create Property'  onClick={() => router.push('/tenant/properties/create')}/>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {propertyList.map((property: Property) => (
            <CardProperty key={property.id} property={property} imgProperty={property.PropertyPicture[0]} />
          ))}
        </div>
      )}
    </Wrapper>
  );
}
