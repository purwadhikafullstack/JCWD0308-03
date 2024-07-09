'use client';
import { useAppSelector } from '@/hooks/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { HeartButton } from './HeartButton';
import { getProperties, getPropertyById } from '@/lib/properties';
import { Button } from '../Button';
import PropertyImages from '@/app/properties/[id]/_components/PropertyImageCarousel';
import { Property, Room } from '@/type/property.type';
import PropertyImgCarousel from './PropertyImgCarousel';

interface PropertieCardProps {
  property: Property;
  disabled?: boolean;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  room: Room;
}

const PropertyCard: React.FC<PropertieCardProps> = ({
  disabled,
  onAction,
  actionLabel,
  actionId = ' ',
  property,
  room,
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

  console.log('GG', property);

  return (
    <div>
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            className="object-cover w-full h-full transition group-hover:scale-110"
            src={property.PropertyPicture[0].url}
            alt="Property Img"
            fill
          />
          <div className="absolute top-3 right-3">
            <HeartButton propertyId={1} currentUser={currentUser} />
          </div>
        </div>
      <div onClick={() => router.push(`/properties/${property.id}`)}
      className="col-span-1 cursor-pointer group" >
        <div className="font-semibold text-lg">{property.name}</div>
        <div className="font-light text-neutral-500">
          {/* {city},{country} */}
          {property.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          {/* <div className="font-semibold">Rp. {room.price}</div>{' '} */}
          <div className="font-light text-neutral-500">night</div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PropertyCard;
