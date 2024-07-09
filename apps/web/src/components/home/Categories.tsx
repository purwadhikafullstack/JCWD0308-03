'use client';
import React from 'react';
import { FaBed, FaCouch, FaHotel, FaHouse, FaShip, FaTree, FaUmbrellaBeach } from 'react-icons/fa6';
import { GiCampingTent } from "react-icons/gi";
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
    label: 'Cruise',
    icon: FaShip,
    description: 'Find your cruise',
  },
  {
    label: 'Cabin',
    icon: FaTree,
    description: 'Find your cabin',
  },
  {
    label: 'Camping',
    icon: GiCampingTent,
    description: 'Find your camping site',
  },
  {
    label: 'Resort',
    icon: FaUmbrellaBeach,
    desription: 'Find your guest resort',
  },
  {
    label: 'Apartment',
    icon: MdApartment,
    desription: 'Find your apartment',
  },
  {
    label: 'Cottage',
    icon: FaCouch,
    description: 'Find your cottage',
  },
  {
    label: 'Hostel',
    icon: FaBed,
    description: 'Find your hostel',
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
      <div
      className="
      flex 
      flex-row 
      items-center 
      justify-between 
      overflow-x-auto
      "

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
  );
};

export default Categories;
