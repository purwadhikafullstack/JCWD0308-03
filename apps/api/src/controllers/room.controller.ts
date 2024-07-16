import prisma from '@/prisma';
import { Request, Response } from 'express';
import { responseError } from '@/helpers/responseError';
import { createRoom, deleteRoomService, getRoomById, updateRoom } from '@/services/room.service';

export class RoomController {
  async getRoomById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rooms = await getRoomById(+id);
      if (!rooms) res.status(404).json({ error: 'Room not found' });
      res.status(200).json(rooms);
    } catch (error) {
      responseError(res, error);
    }
  }
  async createRoom(req: Request, res: Response) {
    try {
      const { type, price, description, capacity, bedDetails, facilities, bathroomFacilities } = req.body;
      const { id } = req.params;
  
      const createdRoom = await createRoom({
        type,
        price: parseFloat(price),
        description,
        capacity: parseInt(capacity),
        bedDetails,
        propertyId: +id,
        facilities,
        bathroomFacilities,
      });
  
      res.status(201).json({ status: 'ok', createdRoom});
    } catch (error) {
      responseError(res, error);
    }
  }
  async updateRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { type, price, description, capacity, bedDetails, roomFacilities, bathroomFacilities,stock } = req.body;

    const updatedRoom =  await updateRoom({
      id: +id,
      type,
      price: parseFloat(price),
      description,
      capacity: parseInt(capacity),
      bedDetails,
      roomFacilities,
      bathroomFacilities,
      stock: +stock,
    })

    res.status(200).json({ status: 'ok', updatedRoom });
    } catch (error) {
      responseError(res, error);
    }
  }
  async deleteRoom(req: Request, res: Response) {
    try {
      const { id } = req.params;  

      const deletedRoom = await deleteRoomService(+id);
      res.status(200).json({ status: 'ok', deletedRoom });
    } catch (error) {
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
      responseError(res, error);
    }
  }
}
