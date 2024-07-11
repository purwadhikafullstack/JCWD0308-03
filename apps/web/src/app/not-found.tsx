'use client';

import { useRouter } from 'next/navigation';
import { CiFileOn } from 'react-icons/ci';

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen mx-auto flex justify-center items-center bg-white">
      <div className="flex justify-center items-center gap-4 flex-col">
        <CiFileOn size={44} className="text-color-accent" />
        <h3 className="text-color-accent text-4xl font-bold">NOT FOUND</h3>
        <button
          onClick={() => router.back()}
          className="text-color-primary hover:text-color-accent transition-all underline"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Page;
