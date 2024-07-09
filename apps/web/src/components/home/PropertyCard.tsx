'use client';
import { useAppSelector } from '@/hooks/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { HeartButton } from './HeartButton';
import { getProperties, getPropertyById } from '@/lib/properties';
import { Button } from '../Button';

interface PropertieCardProps {
  name: string;
  description: string;
  country: string;
  city: string;
  category: string;
  price: number;
  pictures: string;
  disabled?: boolean;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  id: number;
  
}

const PropertyCard: React.FC<PropertieCardProps> = ({
  name,
  description,
  category,
  price,
  pictures,
  disabled,
  onAction,
  actionLabel,
  actionId = " ",
  country,
  city,
  id,
}) => {
  const router = useRouter();


  const handleCancel = useCallback(() => {
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId!);
    };
  }, [onAction, actionId, disabled]);

  const currentUser = useAppSelector((state) => state.user.value);

  return (
    <div
      onClick={() => router.push(`/properties/${id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            className="object-cover w-full h-full transition group-hover:scale-110"
            src={pictures}
            alt="Property Img"
            fill
          />
          <div className="absolute top-3 right-3">
            <HeartButton propertyId={1} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">{name}</div>
        <div className="font-light text-neutral-500">
          {/* {city},{country} */}
          {category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">Rp. {price}</div>{' '}
          <div className="font-light text-neutral-500">night</div>
          {onAction && actionLabel && (
            <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
          )}
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;
