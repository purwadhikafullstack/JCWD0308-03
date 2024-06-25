import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { responseError } from '@/helpers/responseError';
import { genSalt, hash } from 'bcrypt';
import { error } from 'console';

// controller for user & tenant
export class AccountController {
  // after register before vefication input password
  async setupAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;

      const salt = await genSalt(10);
      const hashPW = await hash(password, salt);

      console.log("setting up account for : " + req.user?.name);

      if (req.user?.role === 'user') {
        const user = await prisma.user.update({
          where: { id: req.user?.id },
          data: { password: hashPW },
        });
         return next();

         
      } else if (req.user?.role === 'tenant') {
        const tenant = await prisma.tenant.update({
          where: { id: req.user?.id },
          data: { password: hashPW },
        });
        return next();
      } else {
        res.status(400).json({ error: 'Invalid user role' });
      }
    } catch (error) {
      console.log('failed to setup user :', error);
      responseError(res, error);
    }
  }

  async verifyAccount(req: Request, res: Response) {
    try {
      const { user } = req;
      if (!user) return res.status(401).json({ status: "error", message: "Unauthorized" });
  
      if (user.role === 'user') {
        if (user.isActive){
          return res.status(400).json({ status: "error", message: "Account already verified" });
        }
          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { isActive: true },
          });
          console.log("User verified:", updatedUser);
          return res.status(200).json({ status: "ok", data: updatedUser });
        
      } else if (user.role === 'tenant') {
        if (user.isActive) return res.status(400).json({ status: "error", message: "Account already verified" });
          const updatedTenant = await prisma.tenant.update({
            where: { id: user.id },
            data: { isActive: true },
          });
          console.log("Tenant verified:", updatedTenant);
          return res.status(200).json({ status: "ok", data: updatedTenant });
        
      } else {
        return res.status(403).json({ status: "error", message: "Forbidden" });
      }
    } catch (error) {
      console.log('Failed to verify account:', error);
      return responseError(res, error);
    }
  }
  
}
