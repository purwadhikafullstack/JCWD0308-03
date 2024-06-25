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

      let existsUserEmail = await prisma.user.findUnique({where: { email: email }});
      let existsTenantEmail = await prisma.tenant.findUnique({where: { email: email }});
      
      if (existsUserEmail) return res.status(400).json({ message: 'Email already registered as Traveller please login as Traveller' })
      if ( existsTenantEmail?.isActive === false) return res.status(422).json({message: 'Email already registered but not verifed, please check your email for verification'})
      if ( existsTenantEmail?.isActive === true ) return res.status(409).json({ message: 'Email already registered, please login' })

      const createUser = await prisma.user.create({ data: { name, email } });

      const payload = { id: createUser.id, role: createUser.role };
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' });
      const link = `http://localhost:3000/verify/${token}`;

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

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      if(email && password == null|| password == undefined || password == "" ) return res.status(400).json({status: "error", message: "Please enter your password"})
      if (password && email === null || email === undefined || email === "") return res.status(400).json({status: "error", message: "Please enter your email"})

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

  async getProfileById(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user?.id },
        include: { reviews: true, Reservation: true },
      });
      if (!user)
      return res.status(404).json({ status: 'error', message: 'user not found' });

      console.log('user : ', user);
      res.status(200).json(user);
    } catch (error) {
      console.log('failed to get user profile : ', error);
      responseError(res, error);
    }
  }

  async uploadProfileImage(req: Request, res: Response) {
    try {
      const { file } = req;
      if (!file) return res.status(404).send({ status: 'error', message: 'file not found' });

      const imgUrl = `http:localhost:8000/public/images/${file.fieldname}`;
      await prisma.user.update({
        where: { id: req.user?.id },
        data: { profile: imgUrl },
      });
      res.status(200).send({ status: 'ok', message: 'success upload profile image' });
    } catch (error) {
      console.log('failed to upload profile image : ', error);
      responseError(res, error);
    }
  }
}
