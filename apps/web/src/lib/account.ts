'use server';

import { createToken } from "@/app/action";

export const registerAccount = async (data: any, role: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/${role}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to register account:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      });
      throw new Error('Failed to register account');
    }

    const responseData = await response.json();
    console.log('registered account : ', responseData);

    return responseData;
  } catch (error:any) {
    console.error('Failed to register account:', error.message);
    return { error: error.message };
  }
};


export const VerifyEmail = async (data: any,token: string, role: string) => {
    try {
        const response = await fetch(`http://localhost:8000/api/${role}/verify`, {
            method: "PATCH",
            headers : {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
        
        const res = await response.json();
        console.log('data verify : ', res);
        return data
    } catch (error) {
        console.log('failed to verify email : ', error);
        
    }
}

export const loginAccount = async (data: any, role: string) => {
    try {
        const response = await fetch(`http://localhost:8000/api/${role}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers : {
                'Content-Type': 'application/json',
            },
        })

        const res = await response.json();
        createToken(res.token)
        console.log(res);
        return data
    } catch (error) {
        console.log('failed to login : ', error);
        
    }
}

export const getUser = async (token:any) =>{
    if (token) {
        const response = await fetch(`http://localhost:8000/api/users`, {
            method: "GET",
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        const res = await response.json();
        console.log('data get user : ', res);
        return res
    } else {
        return "Login first"
    }
}