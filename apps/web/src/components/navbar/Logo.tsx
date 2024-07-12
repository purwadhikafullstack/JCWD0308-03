import { useAppSelector } from '@/hooks/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo = () => {
  const user = useAppSelector((state) => state.user.value);

  return (
    <div>
      <Link href={user?.role === 'tenant' ? '/tenant/properties' : '/'}>
        <Image
          src="/images/logo SE.png"
          alt="logo"
          width={100}
          height={100}
          className="block cursor-pointer w-auto h-auto"
          priority
        /> 
      </Link>
    </div>
  );
};

export default Logo;
