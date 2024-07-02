import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
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

  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const {type, price,description, capacity } = req.body;
      const { id } = req.params;

      const createdRoom = await prisma.room.create({
        data: {
          ...req.body,
          type,
          price,
          description,
          propertyId: +id,
          capacity,

        },
      });
      res.status(201).json({status: 'ok',createdRoom});
      // next()
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
