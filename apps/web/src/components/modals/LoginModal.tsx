'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../hooks/store';
import { openModal, closeModal } from '../../hooks/login/loginModalSlice';
import { Button } from '../Button';
import { SimpleModal } from './SimpleModal';
import { Heading } from '../Heading';

export const LoginModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.loginModal.isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmitTenant = useCallback(() => {
    router.push('/login/tenant');
    dispatch(closeModal());
  }, [dispatch, router]);

  const handleSubmitUser = useCallback(() => {
    router.push('/login/user');
    dispatch(closeModal());
  }, [dispatch, router]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Welcome back" subtittle="Login to your account!" />
      <Button
        disabled={isLoading}
        onClick={handleSubmitTenant}
        // outline
        label="For Tenant"
      />
      <Button
        disabled={isLoading}
        onClick={handleSubmitUser}
        // outline
        label="For Traveler"
      />
    </div>
  );

  return (
    <div>
      <SimpleModal
        body={bodyContent}
        isOpen={isOpen}
        onClose={() => dispatch(closeModal())}
      />
    </div>
  );
};
