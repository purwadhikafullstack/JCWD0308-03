'use client';
import { usePathname, useRouter } from 'next/navigation';
import Wrapper from '../wrapper';
import Logo from './Logo';
import { UserMenu } from './UserMenu';
import Search from '../home/Search';
import { useState } from 'react';

export const Navbar = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('');

  const pathname = usePathname();
  const hideNavbar = [
    '/login/tenant',
    '/signup/tenant',
    '/login/user',
    '/signup/user',
    '/verify',
  ];

  if (hideNavbar.includes(pathname)) {
    return null;
  }
  
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="fixed w-full bg-white z-20 shadow-sm">
      <div className="border-b-[1px]">
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Logo />
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
