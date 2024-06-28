import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import path from "path";

export class ValidatorMiddleware {
     validateRegister = [
        body('email').isEmail().withMessage('Invalid Email, please enter a valid email'),
        body('name').notEmpty().withMessage('Name is required'),
        // body('phoneNumber')
        // .notEmpty().withMessage('Phone number is required')
        // .matches(/^(?:\+62|0)[0-9\s\-]+$/).withMessage('Phone number must start with +62 or 0 and contain only digits, spaces, or hyphens')
        // .custom(value => {
        //     const sanitizedValue = value.replace(/[\s\-]/g, '');
        //     return sanitizedValue.length >= 10 && sanitizedValue.length <= 15;
        // }).withMessage('Phone number must be between 10 and 15 digits (excluding spaces and hyphens)'),


        (req:Request, res:Response, next:NextFunction) => {
            const errors = validationResult(req)
            console.log("erorr validation register tenant : " ,errors.array()[0]);
            
            if(!errors.isEmpty()){
                return res.status(400).send({error: errors.array()[0].msg})
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

    uploadImage = [
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