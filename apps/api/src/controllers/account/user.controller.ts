import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';
import { compare, genSalt, hash } from 'bcrypt';
import { checkExistingUserTenant, findUserByEmail, loginUserService, resetPasswordService, sendForgotPasswordService, sendUpdateEmailService, sendVerificationEmail, singInGoogleService, updateEmailService } from '@/services/user.service';

export class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const allUsers = await prisma.user.findMany();
      res.json(allUsers);
    } catch (error) {
      console.log('failed to get users :', error);
      responseError(res, error);
    }
  }
  async registerUser(req: Request, res: Response) {
    try {
      const { email, name } = req.body;
      await checkExistingUserTenant(email, res);

      const createUser = await prisma.user.create({ data: { name, email } });
      const token = await sendVerificationEmail(createUser);

      return res.status(201).json({ status: 'ok', createUser, token });
    } catch (error) {
      console.log('failed to register user : ', error);
      responseError(res, error);
    }
  }
  async resendEmailVerification(req: Request, res: Response) {
    try {
      const {email} = req.body
      const user = await findUserByEmail(email, res)
      const token = await sendVerificationEmail(user);
      return res.status(200).json({ status: 'ok', user, token });
    } catch (error) {
      console.log(error);
      responseError(res, error);
    }
  }
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      await loginUserService(email, password, res);
    } catch (error) {
      console.log('FAILED TO LOGIN USER : ', error);
      responseError(res, error);
    }
  }
  async singInGoogle(req: Request, res: Response) {
    try {
      const { name, email, profile, phoneNumber } = req.body
      await singInGoogleService(name, email, profile, phoneNumber, res);
    } catch (error) {
      console.log("failed to singIn google backEnd : ", error);
      responseError(res, error);
    }
  }
  async sendUpdateEmail(req: Request, res: Response) {
    try {
      const {user} = req
      await sendUpdateEmailService(user, res);
    } catch (error) {
      console.log("failed to update email user : ", error);
      responseError(res, error);
    }
  }

  async updateEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const {user} = req
      await updateEmailService(email, user, res);
    } catch (error) {
      console.log("failed to update email user : ", error);
      responseError(res, error);
    }
  }
  async sendForgotPassword (req: Request, res: Response) {
    try {
      const { email } = req.body;
      await sendForgotPasswordService(email, res);
    } catch (error) {
      console.log("failed to forgot password user : ", error);
      responseError(res, error);
    }
  }
  async resetPassword (req: Request, res: Response) {
    try {
      const { password } = req.body;
      await resetPasswordService(password, req, res);
    } catch (error) {
      console.log("failed to reset password user : ", error);
      responseError(res, error);
    }
  }
}
