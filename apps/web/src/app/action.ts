'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createToken(token: string) {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set('token', token, { expires: new Date(Date.now() + oneDay) });
}

export async function deleteToken(key: string) {
  cookies().delete(key);
}