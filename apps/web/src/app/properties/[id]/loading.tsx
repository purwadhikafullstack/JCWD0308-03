import React from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

export default function loading() {
  return (
    <div className='flex justify-center items-center'>
      <BiLoaderCircle className='size-24 animate-spin h-screen text-[#00a7c4]' /> 
    </div>
  );
}
