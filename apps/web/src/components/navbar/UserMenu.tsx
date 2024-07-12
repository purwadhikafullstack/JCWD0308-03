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
import {  setUser } from '@/hooks/features/profile/userSlice';
import { LogoutAlertDialog } from '../AlertDialog'; // Import the new component
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/account';

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = Cookies.get('token');
  const router = useRouter();
  const userProfile = useAppSelector((state) => state.user.value)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleLoginModalOpen = useCallback(() => {
    dispatch(openLoginModal());
    setIsMenuOpen(false);
  }, [dispatch]);

  const handleRegisterModalOpen = useCallback(() => {
    dispatch(openRegisterModal());
    setIsMenuOpen(false);
  }, [dispatch]);

 const onLogout = () => {
  dispatch(setUser(null));
  deleteToken('token');
  Cookies.remove('token');
  router.push('/');
 }

  const profile = async (token:any) => {
    try {
      const res = await getUser(token)
      dispatch(setUser(res))
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    profile(token)
  },[])

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={toggleMenu}
          className="px-2 py-1 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu className="text-gray-500" />
          <div className="block">
            <Avatar src={userProfile?.profile} />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[18vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col">
            {token ? (
              <>
                {userProfile?.role === 'user' ? (
                  <>
                    <MenuItem label="My reservation" onClick={() => {router.push('/user/reservations')}} />
                    <MenuItem label="My favorite" onClick={() => {}} />
                    <MenuItem label="Profile" onClick={() => {router.push('/profile')}} />
                    <hr className="bg-gray-300" />
                    <LogoutAlertDialog label='Logout' onClick={onLogout} />
                  </>
                ) : (
                  <>
                    <MenuItem label="Management" onClick={() => {router.push('/tenant/management')}} />
                    <MenuItem label="Property List" onClick={() => {router.push('/tenant/properties')}} />
                    <MenuItem label="Add Property" onClick={() => {router.push('/tenant/properties/create')}} />
                    <MenuItem label="Profile" onClick={()=> router.push('/profile')} />
                    <hr className="bg-gray-300" />
                    <LogoutAlertDialog label='Logout' onClick={onLogout} />
                  </>
                )}
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
