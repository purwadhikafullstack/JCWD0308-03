import React from 'react';

interface HeadingProps {
  title?: string;
  subtittle?: string;
  center?: boolean;
}
export const Heading: React.FC<HeadingProps> = ({
  title,
  subtittle,
  center,
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl text-[#000] font-bold">{title}</div>
      <div className="font-light text-neutral-700 mt-2">{subtittle}</div>
    </div>
  );
};
