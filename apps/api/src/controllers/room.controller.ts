import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { responseError } from '@/helpers/responseError';

export class RoomController {
  async getRoomById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rooms = await prisma.room.findUnique({
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
        }
      });
  
      if (facilities && facilities.length > 0) {
       await prisma.roomFacilities.createMany({
         data: facilities.map((facility: string) => ({
           name: facility,
           roomId: createdRoom.id,
         }))
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
  
      res.status(201).json({ status: 'ok', createdRoom});
    } catch (error) {
      console.log('failed to create room', error);
      responseError(res, error);
    }
  }

  async updateRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { type, price, description, capacity, bedDetails, roomFacilities, bathroomFacilities } = req.body;

    const updatedRoom = await prisma.room.update({
      where: { id: +id },
      data: {
        type,
        price: parseFloat(price),
        description,
        capacity: parseInt(capacity),
        bedDetails,
      },
    });

    if (roomFacilities && roomFacilities.length > 0) {
      await prisma.roomFacilities.deleteMany({ where: { roomId: +id } }); // Delete existing roomFacilities
      const createRoomFacilities = roomFacilities.map((name: string) => ({
        name,
        roomId: +id,
      }));
      await prisma.roomFacilities.createMany({ data: createRoomFacilities });
    }

    if (bathroomFacilities && bathroomFacilities.length > 0) {
      await prisma.bathroomFacilities.deleteMany({ where: { roomId: +id } }); // Delete existing bathroomFacilities
      const createBathroomFacilities = bathroomFacilities.map((name: string) => ({
        name,
        roomId: +id,
      }));
      await prisma.bathroomFacilities.createMany({ data: createBathroomFacilities });
    }

    res.status(200).json({ status: 'ok', updatedRoom });
    } catch (error) {
      console.log('failed to update room', error);
      responseError(res, error);
    }
  }

  async deleteRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;  

      await prisma.roomPicture.deleteMany({where: { roomId: +id }})
      await prisma.roomFacilities.deleteMany({where: { roomId: +id }})
      await prisma.bathroomFacilities.deleteMany({where: { roomId: +id }})
      await prisma.roomPeakSeason.deleteMany({where: { roomId: +id }})
      await prisma.roomAvailability.deleteMany({where: { roomId: +id }})

      const deletedRoom = await prisma.room.delete({
        where: { id: +id },
      })   
      res.status(200).json({ status: 'ok', deletedRoom });
    } catch (error) {
      console.log('failed to delete room', error);
      responseError(res, error);
    }
  }

  async roomPeakSeasom(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { start_date, end_date, newPrice } = req.body;
      const room = await prisma.room.findUnique({where: {id: +id}})

      if (!room) res.status(404).json({ error: 'Room not found' });
      

      const updatePeakSeason = await prisma.roomPeakSeason.create({
        data: {
          start_date, end_date, newPrice, roomId: +id
        }
      })
      res.status(200).json({ status: 'ok', updatePeakSeason })
      
    } catch (error) {
      console.log('failed to delete room', error);
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

      res.status(200).json({ status: 'ok', availability });
    } catch (error) {
      console.log('failed to set room availability', error);
      responseError(res, error);
    }
  }

  
}
