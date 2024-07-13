import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageSection from './ImageSection';
import { Property, Room, roomPeakSeason } from '@/type/property.type';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import PropertyDetailsForm from './PropertyDetailsForm'; // Import the refactored component
import { updateProperty } from '@/lib/properties';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { IoIosAddCircle } from 'react-icons/io';
import RoomDetailsEdit from './RoomEditDetail';
import { SetRoomPeakSeason } from '@/app/(dashboard)/tenant/properties/room/_components/SetRoomPeakSeasons';
import { Label } from '../ui/label';

export function EditProperty({ property }: { property: Property }) {
  const {toast} = useToast()
  const router = useRouter()

  const [rooms, setRooms] = useState<Room[]>(property.rooms);
  const [editedProperty, setEditedProperty] = useState<Property>({ ...property });

  const updateRoom = (roomId: number, updatedRoomData: Partial<Room>) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        const updatedRoom = { ...room, ...updatedRoomData };
        if (updatedRoomData.roomPeakSeason !== undefined) {
          updatedRoom.roomPeakSeason = updatedRoomData.roomPeakSeason as roomPeakSeason[];
        }
        return updatedRoom;
      }
      return room;
    });
    setRooms(updatedRooms);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditedProperty((prevProperty) => ({
      ...prevProperty,
      [id]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const res = await updateProperty(property.id, editedProperty);
      if (res.status = 'ok') {
        toast({title: 'Property updated successfully', duration: 3000})
        window.location.reload()
      } else {
        toast({title: 'Failed to update property',description: res.message, duration: 3000})
      }
    } catch (error) {
      console.error('Failed to update property:', error);
    }
  };


  return (
    <div className="flex flex-col space-y-4 pb-5">
      <div className="w-full ">
        <Tabs defaultValue="details" className="sticky top-32">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Information</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>Edit the property details below.</CardDescription>
              </CardHeader>
              <PropertyDetailsForm
                editedProperty={editedProperty}
                handleChange={handleChange}
              />
              <CardFooter>
                <Button className='bg-[#00a7c4] hover:bg-[#00a7c4] hover:opacity-70' onClick={handleSaveChanges}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Photo Tour</CardTitle>
                <CardDescription>Manage and add photos for your property.</CardDescription>
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
      <div className='text-xl font-bold text-center py-5 border-[#4a4a4a]'>Property Room List</div>
      <div className="w-full space-y-4">
        {property.rooms.map((room) => (
          <Card key={room.id} className="shadow-lg ">
            <CardHeader>
              <CardTitle className='text-lg'>{room.type} Room</CardTitle>
            </CardHeader>
            <CardContent className="relative">
                <div className="absolute flex -top-14 right-3">
                  <SetRoomPeakSeason roomId={room.id}
                  onUpdatePeakSeason={() => {updateRoom}}
                  />
                </div>
              <RoomDetailsEdit 
               room={room}
               onUpdateRoom={updateRoom}
               roomFacilities={room.roomFacilities}
               bathroomFacilities={room.bathroomFacilities}/>
            </CardContent>
          </Card>
        ))}

        <Button
          onClick={() => router.push(`/tenant/properties/create/room/${property.id}`) }
          variant="default"
          className='bg-[#00a7c4] hover:bg-[#00a7c4] hover:opacity-70 w-full flex gap-1 items-center justify-center'
        >
         <IoIosAddCircle size={20} />
         <span>Add New Room</span>
        </Button>
      </div>
    </div>
  );
}

export default EditProperty;
