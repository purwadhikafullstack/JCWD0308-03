import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { responseError } from '@/helpers/responseError';
import { genSalt, hash } from 'bcrypt';

// controller for user & tenant
export class AccountController {
  // after register before vefication input password
  async setupAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;

      const salt = await genSalt(10);
      const hashPW = await hash(password, salt);

      //   console.log(req.user);
      console.log(req.user?.name);

      if (req.user?.role === 'user') {
        const user = await prisma.user.update({
          where: { id: req.user?.id },
          data: { password: hashPW },
        });
        next();
      } else if (req.user?.role === 'tenant') {
        const tenant = await prisma.tenant.update({
          where: { id: req.user?.id },
          data: { password: hashPW },
        });
        next();
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
      if (req.user?.role === 'user') {
        const user = await prisma.user.update({
          where: { id: req.user?.id },
          data: { isActive: true },
        });
        console.log("user verifed :" , user);
        
        res.json(user);
      } else if (req.user?.role === 'tenant') {
        const tenant = await prisma.tenant.update({
          where: { id: req.user?.id },
          data: { isActive: true },
        });
        console.log("tenant verifed :" , tenant);
        
        res.json(tenant);
      }
    } catch (error) {
      console.log('failed to verify user :', error);
      responseError(res, error);
    }
  }
}
