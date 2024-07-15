import prisma from "@/prisma";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response } from "express";


export async function updateUserPassword(userID:number,password:string) {
    const salt = await genSalt(10)
    const hashPW = await hash(password, salt)
  
    return prisma.user.update({
      where :{id: userID},
      data: {password: hashPW}
    })
  }
  export async function updateTenantPassword(userID:number,password:string) {
    const salt = await genSalt(10)
    const hashPW = await hash(password, salt)
  
    return prisma.tenant.update({
      where :{id: userID},
      data: {password: hashPW}
    })
  }
  
  export async function verifyUserAccount(userId: number, res:Response) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    });
    return res.status(200).json({ status: 'ok', data: updatedUser });
  }
  
  export async function verifyTenantAccount(tenantId: number,res:Response) {
    const updatedTenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: { isActive: true },
    });
    return res.status(200).json({ status: 'ok', data: updatedTenant });
  }
  
  export async function getUserProfile(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: { reviews: true, Reservation: true },
    });
  }
  
  export async function getTenantProfile(tenantId: number) {
    return prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { properties: true },
    });
  }
  
  export async function changePasswordService(req:Request, res:Response) {
      const { password, newPassword} = req.body
      if (!password) throw "current password is required";
      if (!newPassword) throw "new password is required";
  
      const {id, role} = req.user!
      const salt = await genSalt(10)
      const hashPassword = await hash(newPassword, salt)
  
      if (role === "user"){
        const user = await prisma.user.findFirst({ where: {id: id}})
        if (!user) throw "user not found";
        const isValidPass = await compare(password, user.password!)
        const compareCurrentAndNew = await compare(newPassword, user.password!)
  
        if (!isValidPass) throw "Current password wrong";
        if(compareCurrentAndNew) throw "New password is same with current password"
  
        await prisma.user.update({
          where :{id: id},
          data: {password: hashPassword}
        })
        return res.status(200).send({
          status: 'ok',
          message: 'success change password'
        })
      } else if (role === "tenant") {
        const tenant = await prisma.tenant.findFirst({ where: {id: id}})
        if (!tenant) throw "tenant not found";
        const isValidPass = await compare(password, tenant.password!)
        const compareCurrentAndNew = await compare(newPassword, tenant.password!)
  
        if (!isValidPass) throw "Current password wrong";
        if(compareCurrentAndNew) throw "New password is same with current password"
  
        await prisma.tenant.update({
          where :{id: id},
          data: {password: hashPassword}
        })
        return res.status(200).send({
          status: 'ok',
          message: 'success change password'
        })
      } else {
        return res.status(400).send({
          status: 'error',
          message: 'role not found'
        })
      }
  }
  
  export async function updateProfileService(req:Request, res:Response) {
      const { name, dob, phoneNumber, gender } = req.body;
      const { id, role } = req.user!
    
        if (!id) return res.status(400).json({ status: 'error', message: 'User information is missing.' });
        const isUser = role === 'user';
    
        const findAccount = isUser ? await prisma.user.findUnique({ where: { id: id } })
          : await prisma.tenant.findUnique({ where: { id: id } });
    
        if (!findAccount) return res.status(404).json({ status: 'error', message: 'User not found.' });
    
        const updatedAccount = isUser 
          ? await prisma.user.update({ where: { id: id }, data: { name, dob, phoneNumber, gender } })
          : await prisma.tenant.update({ where: { id: id }, data: { ...req.body, name, dob, phoneNumber, gender  } });
    
        return res.status(200).json({ status: 'ok', message: 'User updated successfully.', data: updatedAccount })
  }

  export async function uploadProfileImgService(req:Request, res:Response) {
    const { file} = req
      const {role} = req.user!
      if (!file) return res.status(404).send({ status: 'error', message: 'file not found' });

      const imgUrl = `${process.env.API_URL}/public/images/${file?.filename}`

      if (role === 'user') {
        await prisma.user.update({where: { id: req.user?.id }, data: { profile: imgUrl }})
      } else if (role === 'tenant') {
        await prisma.tenant.update({ where: { id: req.user?.id }, data: { profile: imgUrl } })
      } else {
        return res.status(403).send({ status: 'error', message: 'Forbidden' });
      }
      res.status(200).send({ status: 'ok', message: 'success upload profile image' });
  }