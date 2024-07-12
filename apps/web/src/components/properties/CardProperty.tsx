'use client';
import { Property, PropertyPicture } from '@/type/property.type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export const revalidate = 3600;

interface CardPropertyProps {
 property : Property
 imgProperty : PropertyPicture
}

export const CardProperty: React.FC<CardPropertyProps> = ({
  property: { id, name, address, province, city, category, district},
  imgProperty
}) => {
  // imgProperty.url
  const url =  '/images/placeholder.png';
  const router = useRouter();
  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => {
          router.push(`/tenant/properties/editor/${id}`);
        }}
      >
        <div className='w-full relative overflow-hidden aspect-square'>
          <Image
            className="rounded-3xl object-cover w-[500px] h-[350px]"
            src={url}
            alt="Property Img"
            fill
          />
        </div>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold">{name}</h5>
          </a>
          <p className="mb-3 font-normal">
           {address}, {district}, {city}, {province}
          </p>
        </div>
      </div>
    </div>
  );
};
