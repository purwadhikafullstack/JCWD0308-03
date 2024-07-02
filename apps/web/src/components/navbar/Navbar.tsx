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
    <div className="fixed w-full bg-white z-20 shadow-sm">
      <div className="border-b-[1px]">
        <Wrapper>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <UserMenu />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};
