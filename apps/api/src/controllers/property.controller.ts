import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { responseError } from '@/helpers/responseError';
import { deletePropertyService, getPropertiesByTenantId, getPropertiesService, getPropertyById } from '@/services/property.service';

export class PropertyController {
  async getProperties(req: Request, res: Response) {
    try {
      const { page, size, sortBy, order, category, province, name } = req.query;
      const properties = await getPropertiesService(
          category?.toString().toLowerCase(),
          province?.toString().toLowerCase(),
          name?.toString().toLowerCase(),
          parseInt(page as string) || 0,
          parseInt(size as string) || 10,
          sortBy as string,
          order as 'asc' | 'desc' || 'asc'
      );

      res.status(200).json(properties);
    } catch (error) {
      console.log('failed to get properties : ', error);
      responseError(res, error);
    }
  }

  async createProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, category, city, province, address, district } = req.body;
      const { user } = req;
      if (!user) return res.status(404).json({ status: 'error', message: 'Tenant not found' });

      const createdProperty = await prisma.property.create({
        data: {
          name,
          description,
          category,
          province,
          city,
          district,
          address,
          tenantId: Number(user?.id),
        }
      })
      res.status(201).json({ status: 'ok', createdProperty });
    } catch (error) {
      console.log('failed to create property', error);
      responseError(res, error);
    }
  }

  async getPropertyById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id)
      if (property) {
        res.status(200).json(property);
      } else {
        res.status(404).json({ error: 'Property not found' });
      }
    } catch (error) {
      console.log('failed to get property by id', error);
      responseError(res, error);
    }
  }

  async updateProperty(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, category, address , city, province, district} = req.body;
      const updatedProperty = await prisma.property.update({
        where: {
          id: +id,
        },
        data: {
          name,
          description,
          category,
          address,
          city,
          province,
          district
        },
      });

      if (updatedProperty) {
        res.status(200).json({ status: 'ok', updatedProperty});
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
      const { id } = req.params;

     const deletedProperty = await deletePropertyService(+id);
     res.status(200).json({ status: 'ok', deletedProperty });
    } catch (error) {
      console.log('failed to delete property', error);
      responseError(res, error);
    }
  }

  async getPropertyByTenantId(req: Request, res: Response) {
    try {
      const { user } = req;
      if (!user) return res.status(404).json({ status: 'error', message: 'Tenant not found' });
      if(!user.id) return res.status(404).json({ status: 'error', message: 'Tenant not found' });
      const properties = await getPropertiesByTenantId(user.id);
      res.status(200).json({ msg: 'get property by tenant id', properties });
    } catch (error) {
      console.log('failed to get property by tenant id', error);
      responseError(res, error);
    }
  }
}
