import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
import e, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';
import { compare } from 'bcrypt';

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

      let existsUserEmail = await prisma.user.findUnique({where: { email: email }})
      let existsTenantEmail = await prisma.tenant.findUnique({where: { email: email }})
      
      if(existsTenantEmail) return res.status(409).json({ status: 'error', message: 'Email already registered as tenant please login as tenant' })
      if (existsUserEmail?.isActive === false) return res.status(400).json({ status: 'error', message: 'Email already registered but not verified, please check your email for verification' })
      if (existsUserEmail) return res.status(400).json({ status: 'error', message: 'Email already registered' })

      const createUser = await prisma.user.create({ data: { name, email } });

      const payload = { id: createUser.id, role: createUser.role };
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' });
      const link = `http://localhost:3000/verify/user/${token}`;

      const templatePath = path.join(__dirname,'../../templates','registerUser.html');
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = Handlebars.compile(templateSource);
      const html = compiledTemplate({
        name: createUser.name,
        role: createUser.role,
        link,
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: createUser.email,
        subject: 'Verify your account',
        html: html,
      });
      console.log('token sign up user : ', token);
      return res.status(201).json({ status: 'ok', createUser, token });
    } catch (error) {
      console.log('failed to register user : ', error);
      responseError(res, error);
    }
  }

  async resendEmailVerification(req: Request, res: Response) {
    try {
      const {email} = req.body
      const user = await prisma.user.findUnique({ where: { email: email } });
      if(!user) return res.status(404).json({ status: 'error', message: 'Email not registered, please enter a email that has been registered' });

      const payload = { id: user.id, role: user.role };
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' });
      const link = `http://localhost:3000/verify/user/${token}`;

      const templatePath = path.join(__dirname,'../../templates','registerUser.html');
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = Handlebars.compile(templateSource);
      const html = compiledTemplate({
        name: user.name,
        role: user.role,
        link,
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: 'Verify your account',
        html: html,
      });
      
      return res.status(200).json({ status: 'ok', message: 'success resend email verification' , token, user});

    } catch (error) {
      console.log(error);
      responseError(res, error);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const user = await prisma.user.findUnique({ where: { email: email } });
      const emailTenant = await prisma.tenant.findUnique({ where: { email: email } });

      if(emailTenant) return res.status(409).send({ status: 'error', message: 'Email registered as Tenant, please login as Tenant' });
      if (!user) return res.status(404).send({ status: 'error', message: 'Email not registered, please register an account first, you will redirect to register page' });
      if (!user.isActive) return res.status(403).send({ status: 'error', message: 'Account not verified, please check email to verify your account' });

      const match = await compare(password, user.password!);
      if (!match) return res.status(401).json({ status: 'error', message: 'Wrong password, please try again!' });

      const payload = { id: user.id, role: user.role , name :user.name};
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1d' });
      console.log('user login : ', user);
      return res.status(200).send({ status: 'ok', user, token });
    } catch (error) {
      console.log('FAILED TO LOGIN USER : ', error);
      responseError(res, error);
    }
  }

  async singInGoogle(req: Request, res: Response) {
    try {
      const { name, email, profile, phoneNumber } = req.body

      let user = await prisma.user.findUnique({ where: { email: email } }) 
      const existsTenantEmail = await prisma.tenant.findUnique({ where: { email: email } });
      if (existsTenantEmail) return res.status(409).json({ status: 'error', message: 'Account already registered as tenant please login as tenant' });

      if (user) {
        const payload ={ id: user?.id, role: user?.role, name: user?.name };
        const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1d' });
        return res.status(200).json({ status: 'ok', user, token });
      }

      user = await prisma.user.create({
        data :{
          name, 
          email,
          profile,
          phoneNumber,
          isActive: true,
          isSocialLogin: true
        }
      })
      const payload = { id: user.id, role: user.role, name: user.name };
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1d' });
      res.status(201).json({ status: 'ok', user, token });
    } catch (error) {
      console.log("failed to singIn google back : ", error);
      responseError(res, error);
    }
  }

  // update email
  async updateEmail(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user?.id } });
      if (!user) return res.status(404).json({ status: 'error', message: 'user not found' });
      
      const { email } = req.body;
      const existsEmail = await prisma.user.findUnique({ where: { email: email } });
      if(existsEmail) return res.status(409).json({ status: 'error', message: 'Email already registered, please use different email' });

      const updateEmail = await prisma.user.update({ where: { id: user.id }, data: { email: email } });
      const payload = {id: updateEmail.id, role: updateEmail.role, name: updateEmail.name};
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1d' });
      const link = `http://localhost:3000/verify/user/update-email/${token}`;
      const templatePath = path.join(__dirname,'../../templates','updateEmail.html');
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = Handlebars.compile(templateSource);
      const html = compiledTemplate({
        name: updateEmail.name,
        link
      })

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: updateEmail.email,
        subject: "Update Email Confirmation",
        html
      })
      return res.status(200).json({ status: 'ok', message: 'success update email', email, token });
  
    } catch (error) {
      console.log("failed to update email user : ", error);
      responseError(res, error);
    }
  }
}
