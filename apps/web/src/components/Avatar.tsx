import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src: string | null | undefined;
}

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full object-cover w-[30px] h-[30px]"
      height={30}
      width={30}
      alt="Avatar"
      src={src || `/images/placeholder.png`}
    />
  );
};
