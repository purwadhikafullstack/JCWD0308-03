import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import path from "path";

export class ValidatorMiddleware {
     validateRegisterTenant = [
        body('email').isEmail().withMessage('Invalid Email, please enter a valid email'),
        body('name').notEmpty().withMessage('Name is required'),

        (req:Request, res:Response, next:NextFunction) => {
            const errors = validationResult(req)
            console.log("erorr validation register tenant : " ,errors.array()[0]);
            
            if(!errors.isEmpty()){
                return res.status(400).send({error: errors.array()[0].msg})
            }
            next()
        }
    ]

    validateRegisterUser = [
        body('email').isEmail().withMessage('Invalid Email, please enter a valid email'),
        body('name').notEmpty().withMessage('Name is required'),
        (req:Request, res:Response, next:NextFunction) => {
            const errors = validationResult(req)
            console.log("erorr validation register user : " ,errors.array()[0]);
            
            if(!errors.isEmpty()){
                return res.status(400).send({error: errors.array()[0].msg})
            }
            next()
        }
    ]

    validateLogin = [
        body('email').isEmail().withMessage('Invalid Email, please enter a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
        (req:Request, res:Response, next:NextFunction) => {
            const errors = validationResult(req)
            console.log("erorr validation login : " ,errors.array()[0]);
            
            if(!errors.isEmpty()){
                return res.status(400).send({error: errors.array()[0].msg})
            }
            next()
        }
    ]

    validateEmail = [
        body('email').isEmail().withMessage('Invalid Email, please enter a valid email'),
        (req:Request, res:Response, next:NextFunction) => {
            const errors = validationResult(req)
            console.log("erorr validation email : " ,errors.array()[0]);
            
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