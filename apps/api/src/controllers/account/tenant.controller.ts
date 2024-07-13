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
         const {email, name, phoneNumber} = req.body

         let existsUserEmail = await prisma.user.findUnique({where: {email: email}})
         let existsTenantEmail = await prisma.tenant.findUnique({where: {email: email}})
          
         if (existsUserEmail) return res.status(409).json({status: "error", message: "Email registered as Traveler please login as Traveler"})
         if (existsTenantEmail?.isActive === false) return res.status(409).json({status: "error", message: "Email already registered but not verifed, please check your email for verification"})
         if (existsTenantEmail?.isActive === true) return res.status(409).json({status: "error", message: "Email already registered, please login"})

         const createTenant = await prisma.tenant.create({data: {phoneNumber, name, email}})
         const payload = { id : createTenant.id, role : createTenant.role }
         const token = sign(payload, process.env.KEY_JWT!, {expiresIn: "1h"})
         const link = `http://localhost:3000/verify/tenant/${token}`
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
    async resendEmailVerification(req: Request, res: Response) {
        try {
            const {email} = req.body
            const tenant = await prisma.tenant.findUnique({where: {email: email}})
            if(!tenant) return res.status(404).json({status: "error", message: "Email not registered"})
            
            const payload = { id : tenant.id, role : tenant.role }   
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: "1h"})
            const link = `http://localhost:3000/verify/tenant/${token}`

            const templatePath = path.join(__dirname,'../../templates','registerUser.html');
            const templateSource = fs.readFileSync(templatePath, 'utf-8');
            const compiledTemplate = Handlebars.compile(templateSource);
            const html = compiledTemplate({
                name: tenant.name,
                role: tenant.role,
                link,
            });

            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: tenant.email,
                subject: 'Verify your account',
                html: html,
            })

            return res.status(200).json({status: "ok", message: "suscess resend email verification", tenant, token})
        } catch (error) {
            console.log("failed to resend email verification :", error);
            responseError(res, error)
        }
    }     
    async loginTenant(req: Request, res: Response) {
        try {
            const {email, password} = req.body
            const tenant = await prisma.tenant.findUnique({where: {email: email}})
            const emailUser = await prisma.user.findUnique({where: {email: email}})

            if(emailUser) return res.status(409).json({status: "error", message: "email registered as Traveler, please login as Traveler"})
            if (!tenant) return res.status(404).json({status: "error", message: "Email not registered"})
            if (tenant?.isActive === false) return res.status(403).json({status: "error", message: "Email not verified, please check your email for verification"})
            
            const match = await compare(password, tenant.password!)
            if (!match) return res.status(401).json({status: "error", message: "Wrong password, please try again"})

            const payload = { id : tenant.id, role : tenant.role, name: tenant.name }
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: "1d"})
            console.log("tenant login : " , tenant);
            console.log("tenant token : " , token);
            return res.status(200).json({status: "ok", tenant, token})
            
        } catch (error) {
            console.log("failed to login tenant : ", error);
            responseError(res, error)
        }
    }
    async signInGoogle(req: Request, res: Response) {
        try {
            const {email, name, profile, phoneNumber } = req.body

            let tenant = await prisma.tenant.findUnique({where: {email: email}})            
            const existsUserEmail = await prisma.user.findUnique({where: {email: email}})
            if (existsUserEmail) return res.status(409).json({status: "error", message: "Account already registered as Traveler, please login as Traveler"})
            
            if (tenant) {
                const payload = {id: tenant?.id, role: tenant?.role, name: tenant?.name}
                const token = sign(payload, process.env.KEY_JWT!, {expiresIn: "1d"})
                return res.status(200).json({status: "ok", tenant, token})
            }

            tenant = await prisma.tenant.create({
                data: {
                    name,
                    email,
                    profile ,
                    phoneNumber,
                    isActive: true,
                    isSocialLogin: true
                }
            })
            const payload = {id: tenant.id, role: tenant.role, name: tenant.name}
            const token = sign(payload, process.env.KEY_JWT!, {expiresIn: "1d"})
            res.status(200).json({status: "ok", tenant, token})
        } catch (error) {
            console.log("failed to sign in google tenant back : ", error);
            responseError(res, error)
        }
    }
}