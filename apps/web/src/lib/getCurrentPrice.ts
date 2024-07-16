import { roomPeakSeason } from '@/type/property.type';
import { isWithinInterval } from 'date-fns';

const getCurrentRoomPrice = (price: number, peakSeasons: roomPeakSeason[]): number => {
  const currentDate = new Date();

  if (!Array.isArray(peakSeasons)) {
    return price;
  }

  for (const season of peakSeasons) {
    if (isWithinInterval(currentDate, { start: season.startDate, end: season.endDate })) {
      return season.newPrice;
    }
  }

  return price;
};

export default getCurrentRoomPrice;
