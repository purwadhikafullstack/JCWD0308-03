import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image
          src="/images/logo SE.png"
          alt="logo"
          width={100}
          height={100}
          className="block cursor-pointer"
        /> 
      </Link>
    </div>
  );
};

export default Logo;
