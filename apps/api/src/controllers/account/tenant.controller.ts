import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";
import { responseError } from "@/helpers/responseError";
import { sign } from "jsonwebtoken";
import path from "path";
import fs from "fs"
import Handlebars from "handlebars";
import { transporter } from "@/helpers/nodemailer";
import { compare } from "bcrypt";

export class TenantController {
    async getTenants(req: Request, res: Response) {
        try {
            const allTenants = await prisma.tenant.findMany();
            res.json(allTenants)
        } catch (error) {
            console.log("failed to get tenants : ", error);
            responseError(res, error);
        }
    }
    async registerTenant(req: Request, res: Response) {
        try {
         const {email, name} = req.body

         let existsUserEmail = await prisma.user.findUnique({where: {email: email}})
         let existsTenantEmail = await prisma.tenant.findUnique({where: {email: email}})
          
         if (existsUserEmail?.isActive === false || existsTenantEmail?.isActive === false) {
             return res.status(409).json({status: "error", message: "email already registered but not verifed"})}
         if (existsUserEmail?.isActive === true || existsTenantEmail?.isActive === true) {
             return res.status(409).json({status: "error", message: "email already registered"})}

         const createTenant = await prisma.tenant.create({data: {name, email}})

         const payload = { id : createTenant.id, role : createTenant.role }
         const token = sign(payload, process.env.KEY_JWT!, {expiresIn: "1h"})
         const link = `http://localhost:3000/verify/${token}`

         const templatePath = path.join(__dirname, "../../templates" ,"registerUser.html" )
         const templateSource = fs.readFileSync(templatePath, "utf-8")
         const compiledTemplate = Handlebars.compile(templateSource)
         const html = compiledTemplate({name : createTenant.name, role : createTenant.role, link})

         await transporter.sendMail({
             from: process.env.MAIL_USER,
             to: createTenant.email,
             subject: "Verify your account",
             html: html
         })
         console.log("token sign up tenant : ", token);
         return res.status(201).json({status: "ok", createTenant, token})
         
        } catch (error) {
            console.log("failed to register tenant :", error);
            responseError(res, error)
        }
    }
        
    async loginTenant(req: Request, res: Response) {
        try {
            const {email, password} = req.body
        
            const tenant = await prisma.tenant.findUnique({where: {email: email}})
            if (!tenant) return res.status(404).json({status: "error", message: "tenant not found"})
            if (tenant?.isActive === false) return res.status(403).json({status: "error", message: "tenant not verified"})

            const match = await compare(password, tenant.password!)
            if (!match) return res.status(401).json({status: "error", message: "wrong password"})

            const payload = { id : tenant.id, role : tenant.role }
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: "1d"})
            console.log("tenant login : " , tenant);
            console.log("tenant token : " , token);
            return res.status(200).json({status: "ok", tenant, token})
            
        } catch (error) {
            console.log("failed to login tenant : ", error);
            responseError(res, error)
        }
    }

    async getProfileById(req: Request, res: Response) {
        try {
            const tenant = await prisma.tenant.findUnique({where: {id: req.user?.id}, select: { id: true, name: true,role: true, email: true , profile:true, properties: true}})
            if (!tenant) return res.status(404).json({status: "error", message: "tenant not found"})
            console.log("tenant profile : ", tenant);
                
            return res.status(200).send({status: "ok", tenant})
        } catch (error) {
            console.log("failed to get tenant profile : ", error);
            responseError(res, error)
        }
    }

    async uploadProfileImage(req: Request, res: Response) {
        try {
            const {file} = req
            if(!file) return res.status(404).json({status: "error", message: "file not found"})

            const imgUrl = `http://localhost:8000/public/images/${file.fieldname}`
            await prisma.tenant.update({
                where: {id: req.user?.id},
                data: {profile: imgUrl}
            })

            res.status(200).json({status: "ok", message: "success upload tenant profile image" , imgUrl})
        } catch (error) {
            console.log("failed to upload tenant profile image : ", error);
            responseError(res, error)
        }
    }
}