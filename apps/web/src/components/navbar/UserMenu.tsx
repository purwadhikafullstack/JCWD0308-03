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
import { clearUser, setUser } from '@/hooks/features/profile/userSlice';
import { getUser } from '@/lib/account';
import useAuth from '@/hooks/useAuth';
import { LogoutAlertDialog } from '../AlertDialog'; // Import the new component

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const token = Cookies.get('token');
  
  const [session, setSession] = useState(null);
  const { data } = useAuth();
  console.log('data socialLogin : ', data);

  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   if (token) setIsUserLogged(true);
  // }, [user, dispatch]);

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
    deleteToken('token');
    Cookies.remove('token');
    setSession(null);
    dispatch(clearUser());
  };

  const getSession = useCallback(async () => {
    if (token) {
      try {
        const fetchUser = await getUser(token);
        setSession(fetchUser);
        dispatch(setUser(fetchUser));
        console.log('fetchUser : ', fetchUser);
        
      } catch (error) {
        console.error('Error fetching user:', error);
        dispatch(clearUser());
      }
    }
  }, [token, dispatch]);
  
  useEffect(() => {
    getSession();
  }, [getSession]);
  
  console.log("session useState :" , session);
  console.log('store redux user : ', user.value);
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={toggleMenu}
          className="px-2 py-1 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu className="text-gray-500" />
          <div className="block">
            <Avatar src={user.value?.profile} />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[18vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col">
            {token ? (
              <>
                {user.value?.role === 'user' ? (
                  <>
                    <MenuItem label="My Trips" onClick={() => {}} />
                    <MenuItem label="My reservation" onClick={() => {}} />
                    <MenuItem label="My favorite" onClick={() => {}} />
                    <MenuItem label="Profile" onClick={() => {}} />
                    <hr className="bg-gray-300" />
                    <LogoutAlertDialog label='Logout' onClick={onLogout} />
                  </>
                ) : (
                  <>
                    <MenuItem label="Management" onClick={() => {}} />
                    <MenuItem label="Properties" onClick={() => {}} />
                    <MenuItem label="Sales Report" onClick={() => {}} />
                    <MenuItem label="Profile" onClick={() => {}} />
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
