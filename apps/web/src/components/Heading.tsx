import React from 'react';
import { text } from 'stream/consumers';

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
    <div className={
      `${center ? 'text-center' : 'text-start'}`}>
      <div className="text-2xl text-[#000] font-bold">{title}</div>
      <div className="font-sm text-neutral-700 mt-2">
        {subtittle}
      </div>
    </div>
  );
};
