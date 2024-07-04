'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export const revalidate = 3600

interface CardPropertyProps {
  name: string;
  city?: string;
  country?: string;
  id :number
}

export const CardProperty: React.FC<CardPropertyProps> = ({name, city, country, id}) => {
  const router = useRouter()
  return (
    <div>
      <div className="" onClick={() => {router.push(`/properties/editor/${id}`)}}>
        <a href="#" className="">
          <Image
            className="rounded-3xl object-cover w-[500px] h-[350px]"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Property Img"
            width={500}
            height={500}
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold">{name}</h5>
          </a>
          <p className="mb-3 font-normal">{city}, {country}</p>
        </div>
      </div>
    </div>
  );
}
