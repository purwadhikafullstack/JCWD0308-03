type User = {
  id: number;
  name?: string;
  email: string;
  password?: string;
  role: string;
  deletedAt: Date | null;
  isActive: boolean;
  phoneNumber?: string;
};

type Property = {
  id: number;
  name: string;
  location: string;
  description: string;
  category: string;
  pictures: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

type Room = {
  id: string;
  description: string;
};

declare namespace Express {
  export interface Request {
    user?: User;
    property?: Property;
  }
}
