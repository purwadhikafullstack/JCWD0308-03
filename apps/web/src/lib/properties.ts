"use server";

import qs from "query-string";

export const getProperties = async (category: string = '', search: string = '') => {
  try {
    const query = qs.stringify({ category });
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}properties?${query}`,
      {
        next : { revalidate:10},
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(" failed to get properties : ", error);
    return [];
  }
};

export const createProperty = async (data:any, token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const res = await response.json();
    return res
  } catch (error:any) {
    console.log(" failed to create properties : ", error);
    return error.message
  }
}

export const getPropertyByTenantId = async (token:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}properties/by-tenant-id`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const res = await response.json();
    return res
  } catch (error) {
    console.log(" failed to get properties by tenant id: ", error);
  }
}

export const getPropertyById = async (id:number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}properties/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const res = await response.json();
    return res
  } catch (error) {
    console.log('failed to get property by id : ', error);
  }
}

export const uploadImages = async (id: number, data:any, segment: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${segment}/${id}/uploadPictures`, {
      method: 'POST',
      body: data,
    })

    if (response.ok) {
      const res = await response.json();
      return res
    } else {
      const errorText = await response.json();
      throw new Error(errorText);
    }

  } catch (error) {
    console.log(" failed to upload property images : ", );
  }
}

export const deleteProperty = async (id: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}properties/${id}`, {
      method: 'DELETE',
    })
    const res = await response.json();
    return res
  } catch (error) {
    console.log('failed to delete property : ', error);
  }
}

export const updateProperty = async (id: number, data:any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}properties/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await response.json();
    return res
  } catch (error) {
    console.log('failed to update property : ', error);
  }


  
}