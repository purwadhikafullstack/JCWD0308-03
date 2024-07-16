'use server';
import { NextResponse, NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { getUser } from './lib/account';


const protectPage = [
  '/profile',
  '/tenant/management',
  '/tenant/properties',
  '/tenant/properties/create/[id]',
  '/tenant/properties/editor/[id]',
  '/tenant/properties/create/room/[id]',
  '/tenant/properties/create/upload-images/[id]',
  '/tenant/properties/room/upload-images/[id]',
  '/user/reservations',
];

const protectUser = ['/user/reservations'];

const protectTenant = [
  '/tenant/properties',
  '/tenant/properties/create',
  '/tenant/properties/editor/[id]',
  '/tenant/properties/create/room/[id]',
  '/tenant/properties/create/upload-images/[id]',
  '/tenant/properties/room/upload-images/[id]',
  '/tenant/management',
];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const url = req.nextUrl.pathname;
  if (protectPage.includes(url)) {
    if (!token) {
      return NextResponse.redirect(new URL(`/?redirect=${url}`, req.url));
    }

    try {
      const user = await getUser(token);
      
      if (!user) {
        return NextResponse.redirect(new URL(`/?redirect=${url}`, req.url));
      }

      if (protectUser.includes(url) && user.role !== 'user') {
        return NextResponse.redirect(new URL(`/?redirect=${url}`, req.url));
      }

      if (protectTenant.includes(url) && user.role !== 'tenant') {
        return NextResponse.redirect(new URL(`/?redirect=${url}`, req.url));
      }
    } catch (error) {
      console.error('Error in middleware:', error);
      return NextResponse.redirect(new URL(`/?redirect=${url}`, req.url));
    }
  }
  return NextResponse.next();
}
