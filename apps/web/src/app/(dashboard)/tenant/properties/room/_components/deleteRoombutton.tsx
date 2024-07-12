"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
import { deleteRoom } from "@/lib/room";
import { useState } from "react";

export function DeleteRoomButton({ roomId }: { roomId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const {toast} = useToast()

  const handleDelete = async () => {
    try {
      await deleteRoom(roomId);
      toast({title: "Room deleted successfully",})
      window.location.reload();
    } catch (error) {
      console.error(`Failed to delete room with id ${roomId}:`, error);
    }
    setIsOpen(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete Room</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            room and remove all data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-[#00a7c4]">Delete Room</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
