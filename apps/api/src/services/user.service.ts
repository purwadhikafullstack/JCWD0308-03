import prisma from "@/prisma";
import { Response } from "express";
import { sign } from "jsonwebtoken";
import path from "path";
import fs from "fs";
import Handlebars from 'handlebars';
import { transporter } from "@/helpers/nodemailer";

export async function checkExistingUserTenant(email:string , res:Response)  {
    const existUser = await prisma.user.findUnique({ where: { email } });
    const existTenant = await prisma.tenant.findUnique({ where: { email } });
    if (existTenant)  return res.status(409).json({ status: 'error', message: 'Email already registered as tenant please login as tenant' })
    if (existUser?.isActive == false) return res.status(400).json({ status: 'error', message: 'Email already registered but not verified, please check your email for verification' })
    if (existUser) return res.status(400).json({ status: 'error', message: 'Email already registered' })
} 
export async function sendVerificationEmail(createUser :any){
  const payload = { id: createUser.id, role: createUser.role };
  const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' });
  const link = `http://localhost:3000/verify/${createUser.role}/${token}`;
  console.log("link : ", link);
  const templatePath = path.join(__dirname, '../templates', 'registerUser.html');
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const compiledTemplate = Handlebars.compile(templateSource);
  const html = compiledTemplate({ name: createUser.name, role: createUser.role, link });

  await transporter.sendMail({ from: process.env.MAIL_USER, to: createUser.email, subject: 'Verify your account', html });
  return token
}