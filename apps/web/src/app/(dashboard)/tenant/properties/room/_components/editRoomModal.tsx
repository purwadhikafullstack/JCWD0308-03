"use client"
import { useState } from 'react';
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
import { Room } from "@/type/property.type";
import { editRoom } from '@/lib/room';

interface EditRoomButtonProps {
  room: Room;
  onUpdateRoom: (roomId: number, updatedRoomData: Partial<Room>) => void;
}

export function EditRoomButton({ room, onUpdateRoom }: EditRoomButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedRoom, setUpdatedRoom] = useState<Partial<Room>>({
    type: room.type,
    price: room.price,
    capacity: room.capacity,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      console.log("response edit room: ", response);
      onUpdateRoom(room.id, updatedRoom);
      window.location.reload();
      
      console.log('Room updated successfully:', response);
    } catch (error) {
      console.error('Failed to update room:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link' className="underline" onClick={() => setIsOpen(true)}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
          <DialogDescription>
            Edit room details and click save when youre done.
          </DialogDescription>
        </DialogHeader>
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
                Capacity
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
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#00a7c4] hover:bg-[#00a7c4] hover:opacity-70">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
