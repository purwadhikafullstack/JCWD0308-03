'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

interface PropertieCardProps {
  name: string;
  description: string;
  country: string;
  city: string;
  category: string;
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
  pictures,
  disabled,
  onAction,
  actionLabel,
  actionId,
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

  return (
    <div
      onClick={() => router.push(`/properties/${id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="max-w-sm">
        <a href="#" className="">
          <Image
            className="rounded-xl object-cover w-[500px] h-[300px]"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Property Img"
            width={500}
            height={500}
            
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold">{name}</h5>
          </a>
          <p className="mb-3 font-normal">
            {city},{country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
