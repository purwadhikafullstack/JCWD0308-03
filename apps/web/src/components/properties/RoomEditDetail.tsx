import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facility, Room } from "@/type/property.type";
import { Textarea } from '@/components/ui/textarea';
import { editRoom } from '@/lib/room';
import { DeleteRoomButton } from '@/app/(dashboard)/tenant/properties/room/_components/deleteRoombutton';

interface RoomDetailsEditProps {
  room: Room;
  onUpdateRoom: (roomId: number, updatedRoomData: Partial<Room>) => void;
  roomFacilities: Facility[];
  bathroomFacilities: Facility[];
}

const RoomDetailsEdit: React.FC<RoomDetailsEditProps> = ({ room, onUpdateRoom, roomFacilities, bathroomFacilities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState<Partial<Room>>({
    type: room.type,
    price: room.price,
    capacity: room.capacity,
    description: room.description,
    stock: room.stock,
    bedDetails: room.bedDetails || '',
    roomFacilities: room.roomFacilities,
    bathroomFacilities: room.bathroomFacilities,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedRoom(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await editRoom(updatedRoom, room.id);
      onUpdateRoom(room.id, updatedRoom);
      window.location.reload(); // This could be improved for better UX
    } catch (error) {
      console.error('Failed to update room:', error);
    }
  };

  return (
    <div className="space-y-2">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  name="type"
                  value={updatedRoom.type}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={updatedRoom.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity Guests
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={updatedRoom.capacity}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={updatedRoom.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                Available room
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={updatedRoom.stock}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <Button type='submit' className='bg-[#00a7c4] hover:bg-[#00a7c4] hover:opacity-70 my-3'>Save Changes</Button>
              <DeleteRoomButton roomId={room.id} />
            </div>
          </form>
    </div>
  );
}

export default RoomDetailsEdit;
