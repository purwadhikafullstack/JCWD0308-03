import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { responseError } from '@/helpers/responseError';
import { compare, genSalt, hash } from 'bcrypt';

export class AccountController {
  async setupAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;

      const salt = await genSalt(10);
      const hashPW = await hash(password, salt);

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
      const imgUrl = `${process.env.API_URL}/public/images/${file?.filename}`
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
  async changePassword(req: Request, res: Response) {
    try {
      const { password, newPassword } = req.body
      if (!password)  throw "password is required"
      if (!newPassword)  throw "new password is required"
      if( req.user?.role === 'user') {
        const checkPassword = await prisma.user.findFirst({
          where: {
            id: req.user?.id,
          }})
        if(checkPassword == null) throw "account not found"
        const isVallPass = await compare(password, checkPassword.password!)
        const isSamePass = await compare(newPassword, checkPassword.password!)
        console.log(isVallPass, isSamePass);
        
        if(isVallPass == false) throw "password wrong"
        if(isSamePass == true) throw "new password same with old password"
        if(isVallPass){
          const salt = await genSalt(10)
          const hashPassword = await hash(newPassword, salt)
          await prisma.user.update({
            data : {password: hashPassword},
            where : {id: req.user?.id},
          })
          return res.status(200).send({
            status: 'ok',
            message: 'success change password'
          })
        }
      }
      if( req.user?.role === 'tenant') {
        const checkPassword = await prisma.tenant.findFirst({
          where: {
            id: req.user?.id,
          }
        })
        if (checkPassword == null) throw "account not found"
        const isVallPass = await compare(password, checkPassword.password!) 
        const isSamePass = await compare(newPassword, checkPassword.password!)
        if(isVallPass == false) throw "password wrong"
        if(isSamePass == true) throw "new password same with old password"
        if(isVallPass){
          await prisma.tenant.update({
            data : {password: newPassword},
            where : {id: req.user?.id},
          })
        }
        return res.status(200).send({
          status: 'ok',
        })
    }
   } catch (error) {
      res.status(400).send({
        status: 'error',
        error,
      })
    }
  }

  async updateProfile (req: Request, res: Response) {
    try {
      const { name, dob, phoneNumber, gender } = req.body;
      const { user } = req;
  
      if (!user) return res.status(400).json({ status: 'error', message: 'User information is missing.' });
  
      const isUser = user.role === 'user';
      const isTenant = user.role === 'tenant';
  
      const findAccount = isUser ? await prisma.user.findUnique({ where: { id: user.id } })
        : isTenant ? await prisma.tenant.findUnique({ where: { id: user.id } }) : null;
  
      if (!findAccount) return res.status(404).json({ status: 'error', message: 'User not found.' });
  
      const updatedAccount = isUser 
        ? await prisma.user.update({ where: { id: user.id }, data: { name, dob, phoneNumber, gender } })
        : await prisma.tenant.update({ where: { id: user.id }, data: { ...req.body, name, dob, phoneNumber, gender  } });
  
      return res.status(200).json({ status: 'ok', message: 'User updated successfully.', data: updatedAccount });
    } catch (error) {
      console.error("Failed to update user: ", error);
      responseError(res, error);
    }
  }
}
