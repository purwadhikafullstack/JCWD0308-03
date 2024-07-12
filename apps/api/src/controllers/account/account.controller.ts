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

      console.log('setting up account for : ' + req.user?.name);

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
      if (!user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });
      const checkActive = await prisma.user.findUnique({where: { id: user.id }}) || await prisma.tenant.findUnique({where: { id: user.id }})
      if (checkActive?.isActive) return res.status(400).json({ status: 'error', message: 'Account already verified' })

      if (user.role === 'user') {
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: { isActive: true },
        });
        return res.status(200).json({ status: 'ok', data: updatedUser });
      } else if (user.role === 'tenant') {
        const updatedTenant = await prisma.tenant.update({
          where: { id: user.id },
          data: { isActive: true },
        });
        return res.status(200).json({ status: 'ok', data: updatedTenant });
      } else {
        return res.status(403).json({ status: 'error', message: 'Forbidden' });
      }
    } catch (error) {
      console.log('Failed to verify account:', error);
      return responseError(res, error);
    }
  }
  async getProfileById(req: Request, res: Response) {
    try {
      const { user } = req;
      if (user?.role === 'user') {
        const dataUser = await prisma.user.findUnique({
          where: { id: user?.id },
          include: { reviews: true, Reservation: true },
        });
        if (!user)
          return res
            .status(404)
            .json({ status: 'error', message: 'Account not found' });
        res.status(200).json(dataUser);
      } else if (user?.role === 'tenant') {
        const dataTenant = await prisma.tenant.findUnique({
          where: { id: req.user?.id },
          include: { properties: true },
        });
        if (!user) return res.status(404).json({ status: 'error', message: 'Account not found' });
        res.status(200).json(dataTenant);
      } else {
        return res.status(403).json({ status: 'error', message: 'Forbidden' });
      }
    } catch (error) {
      console.log('failed to get user profile : ', error);
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
      const { file, user} = req
      if (!file) return res.status(404).send({ status: 'error', message: 'file not found' });
      const imgUrl = `http://localhost:8000/public/images/${file?.filename}`
      if (user?.role === 'user') {
        await prisma.user.update({
          where: { id: req.user?.id },
          data: { profile: imgUrl },
        })
        res.status(200).send({ status: 'ok', message: 'success upload profile image' });
      } else if (user?.role === 'tenant') {
        await prisma.tenant.update({
          where: { id: req.user?.id },
          data: { profile: imgUrl },
        })
        res.status(200).send({ status: 'ok', message: 'success upload profile image' });
      } else {
        return res.status(403).send({ status: 'error', message: 'Forbidden' });
      }
    } catch (error) {
      console.log('failed to upload profile image : ', error);
      responseError(res, error);
    }
  }
}
