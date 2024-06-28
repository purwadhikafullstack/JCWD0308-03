import { Request, Response } from 'express';
import prisma from '@/prisma';
import { responseError } from '@/helpers/responseError';

export class PropertyController {
  async getProperties(req: Request, res: Response) {
    try {
      const { page, size, sortBy, order, category } = req.query;
      const properties = await prisma.property.findMany({
        where: { category: category?.toString().toLowerCase() || undefined },
        take: parseInt(size as string) || 10,
        skip:
          (parseInt(page as string) || 0) * (parseInt(size as string) || 10),
        orderBy: {
          [(sortBy as string) || 'createdAt']: order || 'asc',
        },
        include: {
          rooms: true,
          reviews: true,
          Tenant: true,
          Reservation: true,
        },
      });
      res.status(200).json(properties);
    } catch (error) {
      console.log('failed to get properties : ', error);
      responseError(res, error);
    }
  }

  async createProperty(req: Request, res: Response) {
    try {
      const { name, location, description, category } = req.body;
      if (!name || !location || !description || !category ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const createdProperty = await prisma.property.create({
        data: {
          name,
          location,
          description,
          category,
          tenantId : 1
        },
      });
      res.status(201).json(createdProperty);
    } catch (error) {
      console.log('failed to create property', error);
      responseError(res, error);
    }
  }

  async getPropertyById(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const property = await prisma.property.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          reviews: true,
          Tenant: true,
          rooms: true,
          Reservation: true,
        },
      });
      if (property) {
        res.status(200).json(property);
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
      console.log('failed to get property by id', error);
      responseError(res, error);
    }
  }

  async updateProperty(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, category } = req.body;
      const updatedProperty = await prisma.property.update({
        where: {
          id: +id,
        },
        data: {
          name,
          description,
          category,
        },
      });

      if (updatedProperty) {
        res.status(200).json(updatedProperty);
      } else if (!updatedProperty) {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
      console.log('failed to update property', error);
      responseError(res, error);
    }
  }

  async deleteProperty(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const deletedProperty = await prisma.property.delete({
        where: {
          id: Number(id),
        },
      });
      if (deletedProperty) {
        res.status(200).json(deletedProperty);
      } else if (!deletedProperty) {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (error) {
      console.log('failed to delete property', error);
      responseError(res, error);
    }
  }
}
