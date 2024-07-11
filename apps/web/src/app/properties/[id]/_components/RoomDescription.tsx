"use client";
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
import {  Room, Facility } from '@/type/property.type';
import Image from 'next/image';
import { useState } from 'react';
import { IoBedOutline } from 'react-icons/io5';
import { MdNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

interface DescriptionRoomProps {
  room: Room;
}

const RoomDescription: React.FC<DescriptionRoomProps> = ({ room }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === room.RoomPicture.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? room.RoomPicture.length - 1 : prevIndex - 1
        );
      };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="text-blue-500 cursor-pointer hover:text-blue-600 font-semibold">
          See Details
        </div>
      </SheetTrigger>
      <SheetContent side={'bottom'} className="h-[90vh] overflow-y-scroll">
        <SheetHeader className='pb-4'>
          <SheetTitle>Detail Room</SheetTitle>
          <SheetDescription>
            Detailed information about the Room.
          </SheetDescription>
        </SheetHeader>

        <div className="relative w-full md:w-1/2 h-[25vh]">
          {room.RoomPicture.length > 0 && (
            <Image
              src={room.RoomPicture[currentImageIndex].url}
              alt={room.type}
              layout="fill"
              objectFit="cover"
              className="duration-600 aspect-square"
            />
          )}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center px-4">
            <div
              className="block text-white rounded-full p-2 hover:bg-white hover:text-[#00a7c4] transition duration-300"
              onClick={prevImage}
            >
              <MdNavigateBefore size={30}/>
            </div>
            <div
              className="block text-white rounded-full p-2 hover:bg-white hover:text-[#00a7c4] transition duration-300"
              onClick={nextImage}
            >
              <MdOutlineNavigateNext size={30} />
            </div>
          </div>
        </div>

        <div className="py-4 border-b-2">
          <h1 className="font-bold text-lg">{room.type}</h1>
        </div>
        <div className='py-4 border-b-2'>
          <p className="text-gray-700 text-sm">Room Per Night</p>
          <p className='font-bold text-[#00a7c4]'>Rp {room.price.toLocaleString()}</p>
        </div>
        <div className="py-4 border-b-2">
          <p className="text-gray-700">{room.description}</p>
        </div>
        <div className="py-4 border-b-2 flex items-center gap-3">
          <IoBedOutline className="inline-block text-xl mr-2" />
          <div className="flex flex-col">
            <p className="text-gray-700 font-bold">Bed Detail</p>
            <p className="text-gray-500 text-sm">{room.bedDetails}</p>
          </div>
        </div>
        <div className="py-4 border-b-2">
          <p className="text-gray-700 font-bold">Room Facilities</p>
          <ul>
            {room.roomFacilities.map((facility: Facility, index: number) => (
              <li key={index} className="list-disc list-outside ml-4">
                {facility.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-4 border-b-2">
          <p className="text-gray-700 font-bold">Bathroom Facilities</p>
          <ul>
            {room.bathroomFacilities.map(
              (facility: Facility, index: number) => (
                <li key={index} className="list-disc list-outside ml-4">
                  {facility.name}
                </li>
              ),
            )}
          </ul>
        </div>
        <SheetFooter>
          <SheetClose asChild className="ring-offset-0" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RoomDescription;
