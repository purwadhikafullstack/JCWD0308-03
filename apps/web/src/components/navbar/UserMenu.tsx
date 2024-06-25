'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '../Avatar';
import { useCallback, useEffect, useState } from 'react';
import { MenuItem } from './MenuItem';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'; // Assuming this provides typed useSelector and useDispatch
import { openModal as openLoginModal } from '../../hooks/login/loginModalSlice';
import { openModal as openRegisterModal } from '../../hooks/signup/signupModalSlice';
import Cookies from 'js-cookie';
import { deleteToken } from '@/app/action';

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) setIsUserLogged(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLoginModalOpen = useCallback(() => {
    dispatch(openLoginModal());
    setIsMenuOpen(false); // Close menu after action
  }, [dispatch]);

  const handleRegisterModalOpen = useCallback(() => {
    dispatch(openRegisterModal());
    setIsMenuOpen(false); // Close menu after action
  }, [dispatch]);

  const handleLogOut = () => {
    deleteToken('token');
    setIsUserLogged(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={toggleMenu}
          className="px-2 py-1 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu className="text-gray-500" />
          <div className="block">
            <Avatar />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[18vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col">
            {isUserLogged ? (
              <>
                <MenuItem label="My trips" onClick={() => {}} />
                <MenuItem label="My reservation" onClick={() => {}} />
                <MenuItem label="My favorite" onClick={() => {}} />
                <MenuItem label="Profile" onClick={() => {}} />
                <hr className='bg-gray-500'/>
                <MenuItem label="Logout" onClick={handleLogOut} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={handleLoginModalOpen} />
                <MenuItem label="Sign up" onClick={handleRegisterModalOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
