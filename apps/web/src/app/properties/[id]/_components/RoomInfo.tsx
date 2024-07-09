import React, { useState } from 'react';
import { Room } from '@/type/property.type';
import Image from 'next/image';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { IoBedOutline, IoPeople, IoCheckmarkCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import  RoomDescription from './RoomDescription';

interface RoomInfoProps {
  room: Room;
}

const RoomInfo: React.FC<RoomInfoProps> = ({ room }) => {
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
    <div className="border border-gray-300 rounded-lg w-full mx-auto mb-4 overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-[25vh] group">
          {room.RoomPicture.length > 0 && (
            <Image
              src={room.RoomPicture[currentImageIndex].url}
              alt={room.type}
              layout="fill"
              objectFit="cover"
              className="duration-500 aspect-square"
            />
          )}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center px-4">
            <div
              className="hidden group-hover:block bg-white text-[#00a7c4] rounded-full p-2 hover:bg-[#00a7c4] hover:text-white transition duration-300"
              onClick={prevImage}
            >
              <MdNavigateBefore className="text-xl" />
            </div>
            <div
              className="hidden group-hover:block bg-white text-[#00a7c4] rounded-full p-2 hover:bg-[#00a7c4] hover:text-white transition duration-300"
              onClick={nextImage}
            >
              <MdNavigateNext className="text-xl" />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-4">{room.type}</h2>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <IoPeople className="mr-2" />
              {room.capacity} Guests
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <IoBedOutline className="mr-2" />
              {room.bedDetails}
            </div>
            <p className="md:hidden font-semibold text-[#00a7c4] mb-4">
              Rp {room.price.toLocaleString()}
            </p>
          </div>
            <p className="md:hidden text-gray-600 mb-4"> <RoomDescription room={room}/></p>
          <Link passHref href={`/transactions`} className="md:hidden bg-[#00a7c4] w-fit text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition duration-300">
            Choose
          </Link>
        </div>
      </div>

      {/* Additional Information for large screens */}
      <div className="hidden md:flex p-6 border-t border-gray-200">
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2">Room Option(s)</h3>
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span className="font-medium">{room.type} - Without Breakfast</span>
              <span className="text-sm text-gray-500">Free Cancellation before 12 Jul 2024, 16:59</span>
              <div className="flex items-center text-gray-600">
                <IoBedOutline className="mr-2" />
                1 King Bed
              </div>
            </div>
            <div className="text-lg font-semibold text-[#00a7c4]">
              Rp {room.price.toLocaleString()}
            </div>
            <Link href={`/transactions`} className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
              Choose
            </Link>
          </div>

          {/* Repeat above block for other room options if available */}
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
