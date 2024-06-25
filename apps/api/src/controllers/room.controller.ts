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
}
