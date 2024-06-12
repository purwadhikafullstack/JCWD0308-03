import { Request, Response } from 'express';
import prisma from '@/prisma';
import { responseError } from '@/helpers/responseError';

export class PropertyController {
  async getProperties(req: Request, res: Response) {
    try {
      const properties = await prisma.property.findMany();
      res.status(200).json({
        status: 'ok',
        properties,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createProperty(req: Request, res: Response) {}

  async getPropertyById(req: Request, res: Response) {}
}
