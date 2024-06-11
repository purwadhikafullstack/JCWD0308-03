'use client';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { Button } from '../Button';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '../Heading';
import { SimpleModal } from './SimpleModal';

export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmitTenant = useCallback(() => {
    router.push('/signup/tenant');
    setTimeout(() => {
      registerModal.onClose();
    }, 300);
  }, [registerModal, router]);

  const handleSubmitUser = useCallback(() => {
    router.push('/signup/user');
    setTimeout(() => {
      registerModal.onClose();
    }, 300);
  }, [registerModal, router]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        center
        title="Welcome to Stay Easy"
        subtittle="Create an account!"
      />
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
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
      />
    </div>
  );
};
