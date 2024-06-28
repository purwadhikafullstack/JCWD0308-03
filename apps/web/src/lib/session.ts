'use server';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getSession() {
  console.log('get token');

  const session = cookies().get('token')?.value;
  console.log(session);

  if (!session) {
    return null;
  } else {
    return await decrypt(session);
  }
}

export async function decrypt(input: string): Promise<any> {
  const payload = verify(input, process.env.KEY_JWT!);
  console.log(payload);
  return payload;
}

export async function onLogout() {
  cookies().delete('token');
}
