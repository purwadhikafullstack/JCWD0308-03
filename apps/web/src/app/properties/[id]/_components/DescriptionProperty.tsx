import { categories } from '@/components/home/Categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Property, Room } from '@/type/property.type';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md'; // Contoh penambahan icon

interface DescriptionPropertyProps {
  property: Property;
}

export function DescriptionProperty({ property }: DescriptionPropertyProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-blue-500 bg-transparent hover:bg-transparent flex items-center mt-2">
          Show More <IoIosArrowForward className="ml-1 transform" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'bottom'} className="h-[80vh]">
        <SheetHeader>
          <SheetTitle className="font-bold text-center">
            Detail Description
          </SheetTitle>
          <SheetDescription className="text-center font-semibold">
            Detailed information about the accommodation.
          </SheetDescription>
        </SheetHeader>
        <div className="pt-5 text-lg font-bold">
          <p>{property.name}</p>
        </div>
        <div className="pb-3 pt-2 font-semibold">
          {/* {property.category} */}
          {categories.map(
            (category) =>
              property.category === category.label && (
                <div key={category.label} className="flex items-center">
                  {React.createElement(category.icon, {
                    className: 'text-lg text-gray-700',
                  })}
                  <p className="ml-2 text-gray-700">{category.label}</p>
                </div>
              ),
          )}
        </div>
        <div className="py-4">
          <p className="text-gray-700">{property.description}</p>
        </div>
        <div className="py-4">
          <h3 className="text-lg font-semibold">Location</h3>
          <div className="flex items-center text-gray-700">
            <MdLocationOn className="mr-2" />
            <p>
              {property.address}, {property.district}, {property.city},{' '}
              {property.province}
            </p>
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-lg font-semibold">Rooms Available</h3>
          <ul className="mt-2">
            {property.rooms.map((room: Room) => (
              <li key={room.id} className="flex justify-between py-2">
                <div className="flex flex-col">
                  <p className="text-gray-700">{room.type}</p>
                  <p className="text-gray-500">
                    {room.price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <SheetFooter>
          <SheetClose asChild className="ring-offset-0" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
