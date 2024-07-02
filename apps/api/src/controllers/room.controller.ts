import prisma from '@/prisma';
import { Request, Response } from 'express';
import { responseError } from '@/helpers/responseError';

export class RoomController {
  async getRooms(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rooms = await prisma.room.findMany({
        where: { propertyId: +id },
        include: {
          property: true,
          
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
      const {type, price,description, propertyId, capacity } = req.body;

      const createdRoom = await prisma.room.create({
        data: {
          type,
          price,
          description,
          propertyId,
          capacity
        },
      });
      res.status(201).json(createdRoom);
    } catch (error) {
      console.log('failed to create room', error);
      responseError(res, error);
    }
  }
}
