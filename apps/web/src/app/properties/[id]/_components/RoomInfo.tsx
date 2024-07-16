import React, { useState } from 'react';
import { Room } from '@/type/property.type';
import Image from 'next/image';
import { MdBathroom, MdNavigateBefore, MdNavigateNext, MdRoomService } from 'react-icons/md';
import { IoBedOutline, IoPeople } from 'react-icons/io5';
import  RoomDescription from './RoomDescription';
import { useAppSelector } from '@/hooks/hooks';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import getCurrentRoomPrice from '@/lib/getCurrentPrice';

interface RoomInfoProps {
  room: Room;
}

const RoomInfo: React.FC<RoomInfoProps> = ({ room }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const user = useAppSelector((state) => state.user.value);
  const router = useRouter()

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

  const currentPrice = getCurrentRoomPrice(room.price, room.roomPeakSeason);
  const isRoomAvailable = room.stock > 0
    
  return (
    <div className="border border-gray-300 rounded-lg w-full mx-auto mb-4 overflow-hidden shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 md:h-[35vh] h-[25vh] group">
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
            <h2 className="text-xl font-bold mb-4">{room.type}</h2>
            <div className="flex items-center text-lg text-gray-600 mb-2">
              <IoPeople className="mr-2" size={24} />
              {room.capacity} Guests
            </div>
            <div className="flex items-center text-lg text-gray-600 mb-2">
              <IoBedOutline className="mr-2" size={24} />
              {room.bedDetails}
            </div>
            <div className="flex items-center text-lg text-gray-600 mb-2">
              <MdRoomService className="mr-2" size={24} />
              {room.roomFacilities.map((facility) => facility.name).join(', ')}
            </div>
            <div className="flex items-center text-lg text-gray-600 mb-2">
              <MdBathroom className="mr-2" size={24}/>
              {room.bathroomFacilities.map((facility) => facility.name).join(', ')}
            </div>
            <p className=" text-gray-600"> <RoomDescription room={room}/></p>
          </div>
          {isRoomAvailable ? (
            <>
              <p className="font-semibold text-[#00a7c4] pt-5 pb-2 md:-mb-3">
                {currentPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
              </p>
              <Button
                label="Choose"
                onClick={user?.id === undefined || null ? () => router.push('/login/user') : () => router.push(`/transactions/${room.id}`)}
                disabled={user?.role === 'tenant'}
              />
            </>
          ) : (
            <p className="font-semibold text-red-500 pt-5 pb-2 md:-mb-3">
              Room not available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
