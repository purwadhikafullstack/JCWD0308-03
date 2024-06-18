import { Navbar } from '@/components/navbar/Navbar';
import React from 'react';

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
