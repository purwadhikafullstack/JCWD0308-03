'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../hooks/store';
import { Button } from '../Button';
import { SimpleModal } from './SimpleModal';
import { Heading } from '../Heading';
import { closeModal } from '@/hooks/signup/signupModalSlice';

export const RegisterModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.signupModal.isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmitTenant = useCallback(() => {
    router.push('/signup/tenant');
    dispatch(closeModal());
  }, [dispatch, router]);

  const handleSubmitUser = useCallback(() => {
    router.push('/signup/user');
    dispatch(closeModal());
  }, [dispatch, router]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        center
        title="Welcome to Stay Easy!"
        subtittle="Create an account!"
      />
      <Button
        disabled={isLoading}
        onClick={handleSubmitTenant}
        label="For Tenant"
      />
      <Button
        disabled={isLoading}
        onClick={handleSubmitUser}
        label="For Traveller"
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
