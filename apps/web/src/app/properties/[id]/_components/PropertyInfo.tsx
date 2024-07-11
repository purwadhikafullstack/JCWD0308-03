'use client';
import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { FiStar } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { Property } from '@/type/property.type';
import { DescriptionProperty } from './DescriptionProperty';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  const { name, description, address, city, province, Tenant, district } =
    property;

  return (
    <div className="p-4 bg-white rounded-lg shadow-xl">
      {/* Property Title and Rating */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="flex items-center gap-2">
          <FiStar className="text-yellow-500" size={20} />
          <span className="text-lg font-semibold">4.9</span>
        </div>
      </div>

      {/* Location */}
      <div className="border-t border-gray-200 pt-4 pb-6">
        <div className="flex items-center">
          <FiMapPin className="text-gray-500" size={20} />
          <p className="ml-2 text-gray-700">
            {address},{district}, {city}, {province}
          </p>
          <button className="ml-auto text-blue-500 flex items-center">
            See Map <IoIosArrowForward className="ml-1" />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-200 pt-4 pb-6">
        <h3 className="text-lg font-semibold mt-4">About the Accommodation</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <DescriptionProperty property={property} />
      </div>

      {/* Tenant Info */}
      <div className="border-2 rounded-lg shadow-lg border-gray-200 pt-4 pb-6">
        <div className="flex items-center p-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src={Tenant?.profile || '/images/placeholder.png'} />
            <AvatarFallback>{Tenant.name}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-bold text-lg">Hosted by {Tenant.name}</p>
            <p className="text-gray-600">{Tenant.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
