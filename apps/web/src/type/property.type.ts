export interface Property {
  id: number;
  name: string;
  description: string;
  category: string;
  locationCordinate?: string | null; 
  city: string;
  province: string;
  address: string;
  district: string;
  rooms: Room[];
  createdAt: Date;
  updatedAt: Date;
  PropertyPicture: PropertyPicture[];
  Tenant: {
    id: number; 
    name: string;
    email: string;
    profile: string | null;
    bio: string | null
  };
}

export interface Room {
  id: number;
  type: string;
  price: number;
  stock: number;
  description: string;
  capacity: number;
  bedDetails?: string | null; 
  propertyId: number;
  createdAt: Date;
  updatedAt: Date;
  RoomPicture: RoomPicture[];
  roomFacilities: Facility[];
  bathroomFacilities: Facility[]; 
  roomPeakSeason : roomPeakSeason[]
}

export interface PropertyPicture {
  id: number;
  url: string;
  propertyId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomPicture {
  id: number;
  url: string;
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Facility {
  id: number;
  name: string;
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface roomPeakSeason {
  id : number;
  newPrice : number
  startDate : Date
  endDate : Date
  roomId : number
}