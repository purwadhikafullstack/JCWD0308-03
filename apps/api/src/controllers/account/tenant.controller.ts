import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";
import { responseError } from "@/helpers/responseError";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { checkExistingUserTenant, sendVerificationEmail } from "@/services/user.service";
import { FindTenantByEmail, loginTenantService, signInGoogleService } from "@/services/tenant.service";

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
        await checkExistingUserTenant(email, res)
        const createTenant = await prisma.tenant.create({data: {name, email, phoneNumber}})
        await sendVerificationEmail(createTenant)
        return res.status(201).json({status: "ok", createTenant})
        } catch (error) {
            console.log("failed to register tenant :", error);
            responseError(res, error)
        }
    }
    async resendEmailVerification(req: Request, res: Response) {
        try {
            const {email} = req.body
            const tenant = await FindTenantByEmail(email, res)
            const token = await sendVerificationEmail(tenant)
            return res.status(200).json({status: "ok", message: "suscess resend email verification", tenant, token})
        } catch (error) {
            console.log("failed to resend email verification :", error);
            responseError(res, error)
        }
    }     
    async loginTenant(req: Request, res: Response) {
        try {
            const {email, password} = req.body
           await loginTenantService(email, password, res)
        } catch (error) {
            console.log("failed to login tenant : ", error);
            responseError(res, error)
        }
    }
    async signInGoogle(req: Request, res: Response) {
        try {
            const {email, name, profile, phoneNumber } = req.body
            await signInGoogleService(email, name, profile, phoneNumber, res)            
        } catch (error) {
            console.log("failed to sign in google tenant back : ", error);
            responseError(res, error)
        }
    }
}