'use client';
import EmptyState from '@/components/EmptyState';
import Wrapper from '@/components/wrapper';
import { getPropertyById } from '@/lib/properties';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { Property } from '@/type/property.type';
import { PropertyClient } from './_components/PropertyClient';
import { IoIosArrowBack } from 'react-icons/io';
import { FiShare } from "react-icons/fi";
import { HeartButton } from '@/components/home/HeartButton';

interface Iparams {
  id:number
}

export default function PropertyDetail({params} : {params:Iparams}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [property, setProperty] = useState<Property | null>(null);


  useEffect(() => {
    async function fetchProperty() {
      try {
        const property = await getPropertyById(params.id);
        setProperty(property);
      } catch (error) {
        console.log('failed to get properties on properties[id] : ', error);
        setError('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <BiLoaderCircle className="size-24 animate-spin h-screen text-[#00a7c4]" />
      </div>
    );
  }

  if (error) {
    return <div className="h-screen w-screen flex justify-center items-center font-semibold text-red-500">{error}</div>;
  }

  if (!property) {
    return <EmptyState />;
  }

  return (
    <Wrapper>
      <div className='flex justify-between bg-white items-center my-3'>
        <div onClick={() => router.back()} className='flex gap-1 items-center justify-center cursor-pointer'>
          <IoIosArrowBack size={24} className=''/>
        </div>
        <div className=' gap-5 flex items-center justify-center'>
        <FiShare size={24} className='cursor-pointer'/>
        <HeartButton propertyId={property.id} currentUser={property.Tenant}/>
        </div>
      </div>
      <PropertyClient property={property}/>
      <hr />
    </Wrapper>
  );
}
