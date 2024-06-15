'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { Button } from '../Button';

interface PropertieCardProps {
  name: string;
  description: string;
  category: string;
  pictures: string;
  disabled?: boolean;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
}

const PropertyCard: React.FC<PropertieCardProps> = ({
  name,
  description,
  category,
  pictures,
  disabled,
  onAction,
  actionLabel,
  actionId,
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

  return (
    <div
      // onClick={() => router.push(`/properties/${slugnyo}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <Image
          fill
          alt="Property"
          className="object-cover w-full h-full group-hover:scale-110 transition"
          src={pictures}
        />
      </div>
        <div className="text-lg mt-2 font-semibold">{name}</div>
        <div className="font-semibold text-sm ">Jakarta, Indonesia</div>
        <div className='text-neutral-500 text-sm font-light'>
        reservation date if ada
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>Rp. 1.000.000 <span className='font-light'>night</span></div>
          {/* reservation */}
        </div>
        {onAction && actionLabel && (
          <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel} 
          />
        )}
    </div>
  );
};

export default PropertyCard;
