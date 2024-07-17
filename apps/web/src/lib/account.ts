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

    return responseData;
  } catch (error: any) {
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
    return error
  }
}
export const VerifyEmail = async (data: any, token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}users/verify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
};
export const loginAccount = async (data: any, role: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${role}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    await createToken(res.token);
    Cookies.set('token', res.token, { expires: 1 });
    return res;
  } catch (error) {
    console.log('failed to login : ', error);
  }
};
export const registerUserGoogle = async(user:any, role:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${role}/signIn-with-google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if(!response.ok){
      const errorBody = await response.json()
      return errorBody
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
  }
export const getUser = async (token: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}users/profile`, {
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
    return null;
  }
};
export const uploadImage = async (data: any, token: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}users/upload-profile`, {
      method: 'PATCH',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();
    return res
  
  } catch (error) {
    console.log('failed to upload image : ', error);
  }
}

export const forgotPassword = async (data: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}users/send-forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log('failed to forgot password : ', error);
  }
}

export const resetPassword = async (data: any, token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}users/reset-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const res = await response.json();
    return res
  } catch (error) {
    console.log("failed to reset password : ", error);
    
  }
}

export const editProfile = async (data: any, token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}users/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const response = await res.json();
    return response
  } catch (error) {
    console.log(error);
    
  }
}

export const changePassword = async (data: any, token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}users/change-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const response = await res.json();

    return response
  } catch (error) {
    console.log(error);
    
  }
}

export const sendUpdateEmail = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}users/send-update-email`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const response = await res.json();
    return response
  } catch (error) {
    console.log(error);
    
  }
}

export const updateEmail = async (data: any, token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}users/update-email`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    const res = await response.json();
    return res
  } catch (error) {
    console.log(error);
  }
}