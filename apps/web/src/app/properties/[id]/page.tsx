'use client';
import EmptyState from '@/components/EmptyState';
import Wrapper from '@/components/wrapper';
import { getPropertyById } from '@/lib/properties';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { DatePickerWithRange } from '@/components/book/calendar';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { BiLoaderCircle } from 'react-icons/bi';

interface Property {
  id: number;
  name: string;
  city: string;
  country: string;
  guests: number;
  bedrooms: number;
  beds: number;
  tenant: string;
  description: string;
  category: string;
  rooms: Rooms[];
}

interface PropertyPicture {
  id: number;
  url: string;
}
interface Rooms {
  id: number;
  type: string;
  capacity: number;
  price: number;
  description: string;
  bedDetails: string;
  stock: number;
}

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const [property, setProperty] = useState<Property | null>(null);
  const [propertyPict, setPropertyPict] = useState<PropertyPicture[]>([]);
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [tenantName, setTenantName] = useState('');
  const [tenantAvatar, setTenantAvatar] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? propertyPict.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentSlide === propertyPict.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    async function fetchProperty() {
      try {
        const id = +params.id;
        const property = await getPropertyById(id);
        console.log('property on properties[id] : ', property);
        setProperty(property);
        setPropertyPict(property.PropertyPicture);
        setRooms(property.rooms);
        setTenantName(property.Tenant.name);
        setTenantAvatar(property.Tenant.profile);
      } catch (error) {
        console.log('failed to get properties on properties[id] : ', error);
        setError('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <BiLoaderCircle className="size-24 animate-spin h-screen text-[#00a7c4]" />
        div
      </div>
    );
  }

  if (error) {
    return <div className="p-40">{error}</div>;
  }

  if (!property) {
    return <EmptyState />;
  }

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold pt-4 md:text-3xl">{property.name}</h1>
      <p className="text-gray-600 text-sm font-semibold md:text-xl">
        {property.city}, {property.country}
      </p>
      <div className="flex text-sm space-x-2 mt-2 md:text-lg">
        <span>{rooms[0].capacity} guests</span>
        <span>{rooms.length} bedrooms</span>
        <span>{rooms.length} beds</span>
      </div>
      <div className=" h-[500px] w-full py-10 relative group">
        <div
          style={{backgroundImage: `url(${propertyPict[currentSlide].url})`}}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-700"
        ></div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <MdNavigateBefore onClick={prevSlide} size={24} />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-3xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <MdNavigateNext onClick={nextSlide} size={24} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {propertyPict.map((pict, pictIndex) => (
            <div
              key={pictIndex}
              className={`mx-1 cursor-pointer ${currentSlide === pictIndex ? 'text-[#00a7c4]' : 'text-gray-500'}`}
              onClick={() => goToSlide(pictIndex)}
            >
              <GoDotFill size={12} />
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="my-5 flex gap-3 items-center">
        <Avatar src={tenantAvatar} />
        <p className="font-bold">Hosted by: {tenantName}</p>
      </div>
      <hr />
      <div className="my-5 flex flex-col items-start">
        <p className="text-lg font-bold">Description</p>
        <p className="mt-4">{property.description}</p>
      </div>
      <hr />
      <div className="my-5">
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <hr />
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-bold">Rp.100.001 / night</p>
        <Button label="Book Now" onClick={() => {router.push('/transactions')}}/>
      </div>
    </Wrapper>
  );
}
