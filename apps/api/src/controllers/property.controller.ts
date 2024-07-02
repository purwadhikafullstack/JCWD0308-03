import { NextFunction, Request, Response } from 'express';
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
          PropertyPicture: true,
        },
      });
      res.status(200).json(properties);
    } catch (error) {
      console.log('failed to get properties : ', error);
      responseError(res, error);
    }
  }

  async createProperty(req: Request, res: Response,next:NextFunction) {
    try {
      const { name, description, category,address } = req.body;
      const { user } = req;

      const createdProperty = await prisma.property.create({
        data: {
          ...req.body,
          name,
          description,
          category,
          address,
          tenantId: Number(user?.id),
        }
      });
      res.status(201).json({status: 'ok',createdProperty});
      // next()
    } catch (error) {
      console.log('failed to create property', error);
      responseError(res, error);
    }
  }

  async getPropertyById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const property = await prisma.property.findUnique({
        where: {
          id: +id,
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
      const { id } = req.params;
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

  // upload images at table propertyPicture
  // async uploadPropertyImages(req: Request, res: Response) {
  //   try {
  //     const files  = req.files as Express.Multer.File[] 
  //     const {id} = req.params
  //     const numId = +id
  //     if (!files || files.length === 0) return res.status(404).send({ status: 'error', message: 'file not found' });

  //     const images = files.map((file) => {
  //       url : `http:localhost:8000/public/images/${file.filename}`
  //       propertyId : numId
  //     })

  //     const uploadImgs = await prisma.propertyPicture.createMany({
  //       data: images   

  //     })
  //     console.log('uploadImgs : ', images);
      

  //     res.status(200).send({ status: 'ok', message: 'success upload property image', uploadImgs });
  //   } catch (error) {
  //     console.log('failed to upload property image : ', error);
  //     responseError(res, error);
  //   }
  // }

}
