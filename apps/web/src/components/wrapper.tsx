import { ReactNode } from 'react';

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-xl pt-28 px-4 sm:px-6 sm:py-6 lg:px-8 sm:pt-28">
      {children}
    </div>
  );
}
