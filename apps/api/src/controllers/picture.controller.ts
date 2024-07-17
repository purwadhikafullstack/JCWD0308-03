import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import {Request, Response} from 'express'

export class PictureController {
    async uploadPicturesProperty(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const files = req.files as Express.Multer.File[]
            const fileUrls = files.map((file) => ({
                propertyId : +id,
                url : `${process.env.API_URL}/public/images/${file?.filename}`,
            }))
            const uploadPictures = await prisma.propertyPicture.createMany({
                data: fileUrls,
                skipDuplicates: true
            })
            res.status(201).json({status : 'ok', uploadPictures})
        } catch (error:any) {
            responseError(res, error.message);
        }
    }
    async uploadPicturesRoom(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const files = req.files as Express.Multer.File[]
            const fileUrls = files.map((file) => ({
                url : `${process.env.API_URL}/public/images/${file?.filename}`,
                roomId : +id
            }))
            const uploadPictures = await prisma.roomPicture.createMany({
                data: fileUrls.map(file => ({
                    url : file.url,
                    roomId : file.roomId
                })),
                skipDuplicates: true
            })
            res.status(201).json({status: 'ok',uploadPictures})
        } catch (error) {
            responseError(res, error);
        }
    }
}