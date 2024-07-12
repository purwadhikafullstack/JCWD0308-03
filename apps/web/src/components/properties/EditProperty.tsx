import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageSection from './ImageSection';
import { Property, Room } from '@/type/property.type';
import { Button } from '../Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EditRoomButton } from '@/app/(dashboard)/tenant/properties/room/_components/editRoomModal';
import { DeleteRoomButton } from '@/app/(dashboard)/tenant/properties/room/_components/deleteRoombutton';
import { useState } from 'react';

export function EditProperty({ property }: { property: Property }) {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>(property.rooms);

  const updateRoom = (roomId: number, updatedRoomData: Partial<Room>) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          ...updatedRoomData,
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
      <div className="w-full sm:w-1/2">
        <Tabs defaultValue="details" className="sticky top-32">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Information</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>
                  Edit the property details below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={property.name} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" defaultValue={property.description} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" defaultValue={property.category} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={property.city} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="province">Province</Label>
                  <Input id="province" defaultValue={property.province} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="district">District</Label>
                  <Input id="district" defaultValue={property.district} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue={property.address} />
                </div>
              </CardContent>
              <CardFooter>
                <Button label="Save Changes" />
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Photo Tour</CardTitle>
                <CardDescription>
                  Manage and add photos for your property.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ImageSection
                  images={property.PropertyPicture}
                  id={property.id}
                  isRoom={false}
                  title="Property Photos"
                />
                {property.rooms.map((room: Room, idx: number) => (
                  <ImageSection
                    key={idx}
                    images={room.RoomPicture}
                    isRoom={true}
                    id={room.id}
                    title={`Room ${room.type} Photos`}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full md:w-2/3 space-y-4">
        {property.rooms.map((room) => (
          <Card key={room.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{room.type} Room</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="absolute -top-14 right-5">
                <DeleteRoomButton />
                <EditRoomButton room={room} onUpdateRoom={updateRoom} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`type-${room.id}`}>Type</Label>
                <Input id={`type-${room.id}`} defaultValue={room.type} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`price-${room.id}`}>Price</Label>
                <Input
                  id={`price-${room.id}`}
                  defaultValue={room.price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`size-${room.id}`}>Capacity</Label>
                <Input
                  id={`size-${room.id}`}
                  defaultValue={room.capacity.toString()}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={() =>
            router.push(`/tenant/properties/create/room/${property.id}`)
          }
          label="Add Room"
        />
      </div>
    </div>
  );
}

export default EditProperty;
