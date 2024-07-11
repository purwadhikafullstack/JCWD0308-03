import { categories } from '@/components/home/Categories';
import React, { useMemo, useState } from 'react';
import { Property } from '@/type/property.type';
import RoomInfo from './RoomInfo';
import PropertyInfo from './PropertyInfo';
import PropertyImages from './PropertyImageCarousel';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { CalendarReservation } from './calendar';

interface PropertyClientProps {
  property: Property;
}

export const PropertyClient: React.FC<PropertyClientProps> = ({ property }) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === property.category);
  }, [property.category]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-3">
        <PropertyImages propertyPict={property.PropertyPicture} />
        <PropertyInfo property={property} />
        <CalendarReservation date={date} setDate={setDate} />
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mt-6">
          <div className="md:col-span-5">
            {property.rooms.map((room) => (
              <RoomInfo key={room.id} room={room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
