import prisma from "@/prisma";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import path from "path";
import fs from "fs";
import Handlebars from 'handlebars';
import { transporter } from "@/helpers/nodemailer";
import { compare, genSalt, hash } from "bcrypt";
import { checkExistingUserTenant } from "./user.service";

export async function FindTenantByEmail(email:string, res:Response) {
    const tenant = await prisma.tenant.findUnique({ where: { email } });
    if (!tenant) return res.status(404).json({ status: 'error', message: 'Email not found' });
    return tenant;
}

export async function loginTenantService(email: string, password: string, res: Response,) {
    const tenant = await prisma.tenant.findUnique({where: {email: email}})
    const emailUser = await prisma.user.findUnique({where: {email: email}})

    if(emailUser) return res.status(409).json({status: "error", message: "email registered as Traveler, please login as Traveler"})
    if (!tenant) return res.status(404).json({status: "error", message: "Email not registered"})
    if (tenant?.isActive === false) return res.status(403).json({status: "error", message: "Email not verified, please check your email for verification"})
    
    const match = await compare(password, tenant.password!)
    if (!match) return res.status(401).json({status: "error", message: "Wrong password, please try again"})

    const payload = { id : tenant.id, role : tenant.role, name: tenant.name , email: tenant.email}
    const token = sign(payload, process.env.KEY_JWT!, {expiresIn: "1d"})
    return res.status(200).json({status: "ok", tenant, token})
}

export async function signInGoogleService(email: string, name: string, profile: string, phoneNumber: string, res: Response) {
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
}