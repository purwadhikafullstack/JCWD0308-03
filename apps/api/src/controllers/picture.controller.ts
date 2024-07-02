import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import {Request, Response, NextFunction} from 'express'

export class PictureController {
    async uploadPicturesProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const files = req.files as Express.Multer.File[]

            const fileUrls = files.map((file) => ({
                propertyId : +id,
                url : `http://localhost:8000/public/images/${file?.filename}`,
            }))

            const uploadPictures = await prisma.propertyPicture.createMany({
                data: fileUrls
            })
            res.status(201).json({status : 'ok', uploadPictures})
            // next()
        } catch (error) {
            console.log('failed to upload pictures property', error);
            responseError(res, error);
        }
    }

    async uploadPicturesRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const files = req.files as Express.Multer.File[]

            const fileUrls = files.map((file) => ({
                url : `http://localhost:8000/public/images/${file?.filename}`,
                roomId : +id
            }))

            const uploadPictures = await prisma.roomPicture.createMany({
                data: fileUrls.map(file => ({
                    url : file.url,
                    roomId : file.roomId
                }))
            })
            res.status(201).json({status: 'ok',uploadPictures})
            // next()
        } catch (error) {
            console.log('failed to upload pictures room', error);
            responseError(res, error);
        }
    }


}