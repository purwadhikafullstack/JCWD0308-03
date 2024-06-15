import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

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


    
}