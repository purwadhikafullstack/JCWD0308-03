import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { responseError } from '@/helpers/responseError';

export class RoomController {
  async getRooms(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rooms = await prisma.room.findMany({
        where: { id: +id },
        include: {
          property: true,
          roomFacilities: true,
          bathroomFacilities: true,
          RoomPicture: true,
        },
      });
      res.status(200).json(rooms);
    } catch (error) {
      console.log('failed to get rooms', error);
      responseError(res, error);
    }
  }

  async createRoom(req: Request, res: Response) {
    try {
      const { type, price, description, capacity, bedDetails, facilities, bathroomFacilities } = req.body;
      const { id } = req.params;
  
      // Create the room
      const createdRoom = await prisma.room.create({
        data: {
          type,
          price : parseFloat(price),
          description,
          capacity : parseInt(capacity),
          bedDetails,
          propertyId: +id,
        },
        include: {
          roomFacilities: true,
          bathroomFacilities: true,
          RoomPicture: true,
        }
      });
  
      // If facilities are provided, create them
      if (facilities && facilities.length > 0) {
        const roomFacilities = facilities.map((facility: string) => ({
          name: facility,
          roomId : createdRoom.id
        }))

        await prisma.roomFacilities.createMany({
          data: roomFacilities
        })
      }

      if (bathroomFacilities && bathroomFacilities.length > 0) {
        await prisma.bathroomFacilities.createMany({
          data: bathroomFacilities.map((facility: string) => ({
            name: facility,
            roomId: createdRoom.id,
          }))
        })
      }

      const files = req.files as Express.Multer.File[];
      const fileUrls = files.map((file) => ({
        url: `http://localhost:8000/public/images/${file?.filename}`,
        roomId: createdRoom.id 
      }));
  
      const uploadPictures = await prisma.roomPicture.createMany({
        data: fileUrls,
        skipDuplicates: true
      });
  
      res.status(201).json({ status: 'ok', createdRoom});
    } catch (error) {
      console.log('failed to create room', error);
      responseError(res, error);
    }
  }

  async setRooomAvailability(req: Request, res: Response) {
    try {
      const {id} = req.params
      const {start_data, end_date , isAvailable} = req.body

      const availability = await prisma.roomAvailability.create({
        data: {
          ...req.body,
          start_data,
          end_date,
          isAvailable:true,
          roomId: +id
        }
      })

    } catch (error) {
      console.log('failed to set room availability', error);
      responseError(res, error);
    }
  }
}
