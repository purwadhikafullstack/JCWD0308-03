import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import path from "path";

export class ValidatorMiddleware {
     validateRegister = [
        body('name').notEmpty().withMessage("name is required"),
        body('email').notEmpty().withMessage('email is required')
        .isEmail().withMessage('Invalid Email'),

        (req:Request, res:Response, next:NextFunction) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).send({error: errors.array()})
            }
            next()
        }
    ]

     validateSetupAccount = [
        body('password').notEmpty().withMessage('Password is required'),

        (req:Request, res:Response, next:NextFunction) => {
           const errors = validationResult(req) 
           if(!errors.isEmpty()){
            return res.status(400).send({error : errors.array()})
           }
           next()
        }
    ]

    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']

    uploadProfileImage = [
        body('file').custom((value, {req}) => {
            if(!req.file){
                throw new Error('File not found')
            }
            const fileExtension = path.extname(req.file.originalname).toLowerCase()
            if (!this.allowedExtensions.includes(fileExtension)){
                throw new Error('Invalid file extension. Only JPG, JPEG, PNG and GIF are allowed')
            }
            if (req.file.size > 1024 * 1024){
                throw new Error('File size exceeds the maximum limit of 1MB')
            }
            return true
        }),
        (req:Request, res:Response, next:NextFunction) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).send({error : errors.array()})
            }
            next()
        }
    ]

    
}