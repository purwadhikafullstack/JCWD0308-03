import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { responseError } from '@/helpers/responseError';
import { compare, genSalt, hash } from 'bcrypt';
import { changePasswordService, getTenantProfile, getUserProfile, updateProfileService, updateTenantPassword, updateUserPassword, uploadProfileImgService, verifyTenantAccount, verifyUserAccount } from '@/services/account.service';

export class AccountController {
  async setupAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;

      if (req.user?.role === 'user') {
        await updateUserPassword(req.user?.id, password);
        return next()
      } else if (req.user?.role === 'tenant') {
        await updateTenantPassword(req.user?.id, password);
        return next();
      } else {
        res.status(400).json({ error: 'Invalid user role' });
      }
    } catch (error) {
      responseError(res, error);
    }
  }
  async verifyAccount(req: Request, res: Response) {
    try {
      const { user } = req;
      if (!user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
      const checkActive = await prisma.user.findUnique({where: { id: user.id }}) || await prisma.tenant.findUnique({where: { id: user.id }})
      if (checkActive?.isActive) return res.status(400).json({ status: 'error', message: 'Account already verified' })

      if (user.role === 'user') {
        await verifyUserAccount(user.id, res);
      } else if (user.role === 'tenant') {
        await verifyTenantAccount(user.id, res);
      } else {
        return res.status(403).json({ status: 'error', message: 'Forbidden' });
      }
    } catch (error) {
      return responseError(res, error);
    }
  }
  async getProfileById(req: Request, res: Response) {
    try {
      const { user } = req;
      if (!user)  return res.status(401).json({ status: 'error', message: 'Unauthorized' });

      let profileData
      if (user?.role === 'user') {
        profileData = await getUserProfile(user.id);
      } else if (user?.role === 'tenant') {
        profileData = await getTenantProfile(user.id);
      } else {
        return res.status(403).json({ status: 'error', message: 'Forbidden' });
      }

      res.status(200).json(profileData);
    } catch (error) {
      responseError(res, error);
    }
  }
  async getAccountRole(req: Request, res: Response) {
    try {
      const role = req.user?.role
      res.status(200).send({
        status: 'ok',
        message: 'type found',
        role,
      });
    } catch (error) {
      res.status(400).send({
        status: 'error',
        error,
      });
    }
  }
  async uploadProfileImage(req: Request, res: Response) {
    try {
      await uploadProfileImgService
    } catch (error) {
      responseError(res, error);
    }
  }
  async changePassword(req: Request, res: Response) {
    try {
      await changePasswordService(req, res)
   } catch (error) {
      res.status(400).send({
        status: 'error',
        error,
      })
    }
  }

  async updateProfile (req: Request, res: Response) {
    try {
      await updateProfileService(req, res)
    } catch (error) {
      console.error("Failed to update user: ", error);
      responseError(res, error);
    }
  }
}
