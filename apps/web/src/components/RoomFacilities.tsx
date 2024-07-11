import { FaWifi, FaSnowflake, FaTv, FaParking, FaSwimmingPool, FaDumbbell, FaSpa, FaUtensils, FaBed } from 'react-icons/fa';
import { FaUmbrellaBeach } from 'react-icons/fa6';
import { GiCookingPot } from 'react-icons/gi';
import { MdLocalLaundryService, MdRoomService } from 'react-icons/md';

export const roomFacilities = [
  {
    label: 'WiFi',
    icon: FaWifi,
    description: 'Find rooms with WiFi',
  },
  {
    label: 'Air Conditioning',
    icon: FaSnowflake,
    description: 'Find rooms with Air Conditioning',
  },
  {
    label: 'Television',
    icon: FaTv,
    description: 'Find rooms with Television',
  },
  {
    label: 'Parking',
    icon: FaParking,
    description: 'Find rooms with Parking facilities',
  },
  {
    label: 'Swimming Pool',
    icon: FaSwimmingPool,
    description: 'Find rooms with Swimming Pools',
  },
  {
    label: 'Gym',
    icon: FaDumbbell,
    description: 'Find rooms with Gym facilities',
  },
  {
    label: 'Spa',
    icon: FaSpa,
    description: 'Find rooms with Spa facilities',
  },
  {
    label: 'Room Service',
    icon: MdRoomService,
    description: 'Find rooms with Room Service',
  },
  {
    label: 'Beachfront',
    icon: FaUmbrellaBeach,
    description: 'Find rooms with Beachfront views',
  },
  {
    label: 'Kitchen',
    icon: GiCookingPot,
    description: 'Find rooms with Kitchen facilities',
  },
  {
    label: 'Laundry Service',
    icon: MdLocalLaundryService,
    description: 'Find rooms with Laundry Service',
  },
];

export default roomFacilities;
