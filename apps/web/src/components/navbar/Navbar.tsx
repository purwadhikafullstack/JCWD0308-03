'use client';
import { usePathname } from 'next/navigation';
import Wrapper from '../wrapper';
import Logo from './Logo';
import { UserMenu } from './UserMenu';

export const Navbar = () => {
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

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="border-b-[1px]">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
