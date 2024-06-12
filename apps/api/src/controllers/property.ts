import { Request, Response } from 'express';
import prisma from '@/prisma';
import { responseError } from '@/helpers/responseError';

export class PropertyController {
  async getProperties(req: Request, res: Response) {
    try {
      const { name = '', category = '', sortBy, sortOrder } = req.query;
  
      const filterOptions: any = name || category ? { } : undefined;
      if (name) filterOptions.name = { contains: name.toString().toLocaleLowerCase()};
      if (category) filterOptions.category = category.toString();
  
      const orderBy = sortBy && sortOrder ? { [sortBy.toString()]: sortOrder.toString().toUpperCase() === 'DESC' ? 'desc' : 'asc' } : undefined;
  
      const properties = await prisma.property.findMany({
        where: filterOptions,
        orderBy,
      });
  
      res.status(200).json({ status: 'ok', properties });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createProperty(req: Request, res: Response) {
    try {
      const createdProperty = await prisma.property.create({
        data: {
          ...req.body,
        },
      });

      res.status(201).json(createdProperty);
    } catch (error) {
      responseError(res, error);
    }
  }

  async getPropertyById(req: Request, res: Response) {}
}
