'use server';

import { createToken } from '@/app/action';
import Cookies from 'js-cookie';

export const registerAccount = async (data: any, role: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${role}`, {
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
    console.error('Failed to register account account.ts:', error.message);
    return error.message
  }
};

export const resendVerifyEmail = async (email: string, role:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${role}/resend-verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const res = await response.json();
    return res;
  } catch (error :any) {
    console.log('failed to resend verify email : ', error);
    return error
  }
}

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

    const res = await response.json();
    createToken(res.token);
    Cookies.set('token', res.token);
    return res;

  } catch (error) {
    console.log('failed to login : ', error);
    // return error
  }
};


export const registerUserGoogle = async(user:any, role:string) => {
  // const {email, displayName:name, photoURL:profile , phoneNumber:phoneNumber} = user
  try {
    const response = await fetch(`http://localhost:8000/api/${role}/signIn-with-google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if(!response.ok){
      const errorBody = await response.json()
      console.log("failed to register user anjuy signInGoogle : ", errorBody);
      return errorBody
    }

    const data = await response.json()
    console.log("data signInGoogle : ", data);
    return data
  } catch (error) {
    console.log("failed to register user signInGoogle : ", error);
    throw error
  }
  }
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

export const uploadImage = async (data: any, token: any) => {
  try {
    const response = await fetch(`http://localhost:8000/api/users/upload-profile`, {
      method: 'PATCH',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();
    console.log('upload image : ', res);
    return res
  
  } catch (error) {
    console.log('failed to upload image : ', error);
  }
}