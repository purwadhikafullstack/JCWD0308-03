'use client';
import React from 'react';
import Wrapper from '../wrapper';
import { FaHotel, FaHouse } from 'react-icons/fa6';
import { MdVilla, MdApartment } from 'react-icons/md';
import CategoriesBox from './CategoriesBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: 'Hotel',
    icon: FaHotel,
    description: 'Find your hotel',
  },
  {
    label: 'Villa',
    icon: MdVilla,
    desription: 'Find your villa',
  },
  {
    label: 'Homestay',
    icon: FaHouse,
    desription: 'Find your homestay',
  },
  {
    label: 'kosan',
    icon: FaHouse,
    desription: 'Find your guest house',
  },
  {
    label: 'Apartment',
    icon: MdApartment,
    desription: 'Find your apartment',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  const filter =
    category &&
    categories.map((item) => item.label).indexOf(category as string);

  return (
    <Wrapper>
      <div
      className="
      flex 
      flex-row 
      items-center 
      justify-between 
      overflow-x-auto"
      >
        {categories.map((item) => (
          <CategoriesBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Categories;
