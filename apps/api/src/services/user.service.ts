import prisma from "@/prisma";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import path from "path";
import fs from "fs";
import Handlebars from 'handlebars';
import { transporter } from "@/helpers/nodemailer";
import { compare, genSalt, hash } from "bcrypt";

export async function checkExistingUserTenant(email:string , res:Response)  {
    const existUser = await prisma.user.findUnique({ where: { email } });
    const existTenant = await prisma.tenant.findUnique({ where: { email } });
    if (existTenant)  return res.status(409).json({ status: 'error', message: 'Email already registered as tenant please login as tenant' })
    if (existUser?.isActive == false) return res.status(400).json({ status: 'error', message: 'Email already registered but not verified, please check your email for verification' })
    if (existUser) return res.status(400).json({ status: 'error', message: 'Email already registered' })
} 

export async function findUserByEmail(email: string, res: Response) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ status: 'error', message: 'Email not found' });
  return user;
}
export async function sendVerificationEmail(createUser :any){
  const payload = { id: createUser.id, role: createUser.role };
  const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' });
  const link = `http://localhost:3000/verify/${createUser.role}/${token}`;
  const templatePath = path.join(__dirname, '../templates', 'registerUser.html');
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = Handlebars.compile(templateSource);
  const html = compiledTemplate({ name: createUser.name, role: createUser.role, link });

  await transporter.sendMail({ from: process.env.MAIL_USER, to: createUser.email, subject: 'Verify your account', html });
  return token
}

export async function loginUserService(email: string, password: string, res: Response,) {
      const user = await prisma.user.findUnique({ where: { email: email } });
      const emailTenant = await prisma.tenant.findUnique({ where: { email: email } });

      if(emailTenant) return res.status(409).send({ status: 'error', message: 'Email registered as Tenant, please login as Tenant' });
      if (!user) return res.status(404).send({ status: 'error', message: 'Email not registered, please register an account first, you will redirect to register page' });
      if (!user.isActive) return res.status(403).send({ status: 'error', message: 'Account not verified, please check email to verify your account' });

      const match = await compare(password, user.password!);
      if (!match) return res.status(401).json({ status: 'error', message: 'Wrong password, please try again!' });

      const payload = { id: user.id, role: user.role , name :user.name};
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1d' });
      return res.status(200).send({ status: 'ok', user, token });
}

export async function singInGoogleService (name: string, email: string, profile: string, phoneNumber: string, res: Response) {
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
}

export async function updateEmailService(userId: number, newEmail: string, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
  const existsEmail = await prisma.user.findUnique({ where: { email: newEmail } });
  if(existsEmail) return res.status(409).json({ status: 'error', message: 'Email already used, please use different email' });
  const updateEmail = await prisma.user.update({ where: { id: user.id }, data: { email: newEmail } });
  const payload = {id: updateEmail.id, role: updateEmail.role, name: updateEmail.name};
  const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1d' });
  const link = `http://localhost:3000/update-email/${token}`;
  const templatePath = path.join(__dirname,'../templates','updateEmail.html');
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
  return res.status(200).json({ status: 'ok', message: 'success update email', newEmail, token });  
}

export async function sendForgotPasswordService(email: string, res: Response) {
  if (!email) return res.status(400).json({ status: 'error', message: 'Email is required!' });
      const user = await prisma.user.findUnique({ where: { email: email } }) || await prisma.tenant.findUnique({ where: { email: email } })

      if (!user) return res.status(404).json({ status: 'error', message: 'Account not found!' });
      if (user.isSocialLogin == true) return res.status(409).json({ status: 'error', message: 'Account registered with social media cannot reset password' });
      if (user.isActive == false) return res.status(400).json({ status: 'error', message: 'Email already registered but not verified, please check your email for verification' });

      const payload = {id: user.id, role: user.role, name: user.name};
      const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1d' });
      const link = `http://localhost:3000/reset-password/${token}`;
      const templatePath = path.join(__dirname,'../templates','forgotPassword.html');
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
}

export async function resetPasswordService(password: string,req: Request, res: Response) {
  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);

  const {user} = req
  if (!user)  return res.status(400).json({ status: 'error', message: 'User information is missing.' })
  const isUser = user.role === 'user';
  const isTenant = user.role === 'tenant';

  const findAccount = isUser ? await prisma.user.findUnique({ where: { id: user.id } }) 
  : isTenant ? await prisma.tenant.findUnique({ where: { id: user.id } }) : null;

  if (!findAccount) return res.status(404).json({ status: 'error', message: 'User not found.' });
  if (findAccount.isSocialLogin) return res.status(409).json({ status: 'error', message: 'Account registered with social login cannot reset password.' })

  if (isUser) {
    await prisma.user.update({ where: { id: user.id }, data: { password: hashPassword } });
  } else if (isTenant) {
    await prisma.tenant.update({ where: { id: user.id }, data: { password: hashPassword } });
  }

  return res.status(200).json({ status: 'ok', message: 'Password successfully reset.' , isUser});
}
