export interface Property {
  id: number;
  name: string;
  description: string;
  category: string;
  locationCordinate?: string | null; // Assuming it can be null based on your response
  country: string;
  city: string;
  province: string;
  address: string;
  rooms: Room[];
  createdAt: Date;
  updatedAt: Date;
  PropertyPicture: PropertyPicture[];
  Tenant: {
    id: number; // You may need to add an ID here if available in your data
    name: string;
    email: string;
    profile: string | null; // Assuming it can be null based on your response
    bio: string | null; // Assuming it can be null based on your response
  };
}

export interface Room {
  id: number;
  type: string;
  price: number;
  stock: number;
  description: string;
  capacity: number;
  bedDetails?: string | null; // Assuming it can be null based on your response
  propertyId: number;
  createdAt: Date;
  updatedAt: Date;
  RoomPicture: RoomPicture[];
  roomFacilities: Facility[]; // Assuming you have a Facility type defined
  bathroomFacilities: Facility[]; // Assuming you have a Facility type defined
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
