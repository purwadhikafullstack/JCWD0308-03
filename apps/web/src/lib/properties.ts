"use server";
export const getProperties = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}properties`,
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
    return null;
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
    console.log('res create properti on front fetch: ', res);
    
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
    const response = await fetch(`http://localhost:8000/api/${segment}/${id}/uploadPictures`, {
      method: 'POST',
      body: data,
    })

    if (response.ok) {
      const res = await response.json();
      console.log('res upload property images on front fetch: ', res);
      return res
    } else {
      const errorText = await response.json();
      throw new Error(errorText);
    }

  } catch (error) {
    console.log(" failed to upload property images : ", );
  }
}