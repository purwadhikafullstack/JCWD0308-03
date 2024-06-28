'use server';

import { createToken } from '@/app/action';

export const registerAccount = async (data: any, role: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/${role}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log('registered account : ', responseData);

    return responseData;
  } catch (error: any) {
    console.error('Failed to register account:', error.message);
    return { error: error.message };
  }
};

export const VerifyEmail = async (data: any, token: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/users/verify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    // console.log('data verify : ', res);
    return res;
  } catch (error) {
    console.log('failed to verify email : ', error);
    return error;
  }
};

export const loginAccount = async (data: any, role: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/${role}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }
    const res = await response.json();
    createToken(res.token);
    return res;
  } catch (error) {
    console.log('failed to login : ', error);
    // return error
  }
};

export const getUser = async (token: any) => {
  try {
    const response = await fetch(`http://localhost:8000/api/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
