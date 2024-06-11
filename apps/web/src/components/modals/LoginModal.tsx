'use client';

import { useLoginModal } from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Button } from '../Button';
import { SimpleModal } from './SimpleModal';
import { Heading } from '../Heading';

export const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();

  const handleSubmitTenant = useCallback(() => {
    router.push('/login/tenant');
    loginModal.onClose();
  }, [loginModal, router]);

  const handleSubmitUser = useCallback(() => {
    router.push('/login/user');
    loginModal.onClose();
  }, [loginModal, router]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Welcome back" subtittle="Login to your account!" />
      <Button
        disabled={isLoading}
        onClick={handleSubmitTenant}
        outline
        label="For Tenant"
      />
      <Button
        disabled={isLoading}
        onClick={handleSubmitUser}
        outline
        label="For Traveller"
      />
    </div>
  );

  return (
    <div>
      <SimpleModal
        body={bodyContent}
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
      />
    </div>
  );
};
