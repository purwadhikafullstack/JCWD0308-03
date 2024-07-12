import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer';
import { compare, genSalt, hash } from 'bcrypt';
import { checkExistingUserTenant, sendVerificationEmail } from '@/services/user.service';

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

  async updateEmail(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user?.id } });
      if (!user) return res.status(404).json({ status: 'error', message: 'user not found' });
      
      const { email } = req.body;
      const existsEmail = await prisma.user.findUnique({ where: { email: email } });
      if(existsEmail) return res.status(409).json({ status: 'error', message: 'Email already used, please use different email' });

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

  async sendForgotPassword (req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ status: 'error', message: 'Email is required!' });
      const user = await prisma.user.findUnique({ where: { email: email } }) || await prisma.tenant.findUnique({ where: { email: email } })

      if (!user) return res.status(404).json({ status: 'error', message: 'Account not found!' });
      if (user.isSocialLogin == true) return res.status(409).json({ status: 'error', message: 'Account registered with social media cannot reset password' });
      if (user.isActive == false) return res.status(400).json({ status: 'error', message: 'Email already registered but not verified, please check your email for verification' });

      const payload = {id: user.id, role: user.role, name: user.name};
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1d' });
      const link = `http://localhost:3000/reset-password/${token}`;
      const templatePath = path.join(__dirname,'../../templates','forgotPassword.html');
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = Handlebars.compile(templateSource);
      const html = compiledTemplate({ name: user.name, link });
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: "Forgot Password Confirmation",
        html
      })

      return res.status(200).json({ status: 'ok', message: 'success send email', email, token });

    } catch (error) {
      console.log("failed to forgot password user : ", error);
      responseError(res, error);
    }
  }

  async resetPassword (req: Request, res: Response) {
    try {
      const { password } = req.body;
      const { user } = req;

    if (!user)  return res.status(400).json({ status: 'error', message: 'User information is missing.' })
    const isUser = user.role === 'user';
    const isTenant = user.role === 'tenant';

    const findAccount = isUser ? await prisma.user.findUnique({ where: { id: user.id } }) 
    : isTenant ? await prisma.tenant.findUnique({ where: { id: user.id } }) : null;

    if (!findAccount) return res.status(404).json({ status: 'error', message: 'User not found.' });

    if (findAccount.isSocialLogin) return res.status(409).json({ status: 'error', message: 'Account registered with social login cannot reset password.' })

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    if (isUser) {
      await prisma.user.update({ where: { id: user.id }, data: { password: hashPassword } });
    } else if (isTenant) {
      await prisma.tenant.update({ where: { id: user.id }, data: { password: hashPassword } });
    }

    return res.status(200).json({ status: 'ok', message: 'Password successfully reset.' , isUser});
    } catch (error) {
      console.log("failed to reset password user : ", error);
      responseError(res, error);
    }
  }

  async updateUser (req: Request, res: Response) {
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
