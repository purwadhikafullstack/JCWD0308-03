import Cookies from 'js-cookie';

export const getToken = async () => {
    const token = Cookies.get('token')
    if(!token) return null
    return token
}

export const getTransaction = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/transaction`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            }
            })
        return res
    } catch (error) {
        console.log(error);   
    }
}
export const getRoomsbyId = async (id:number) => {
    try {
        console.log(id)
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/rooms/room/${id}`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
            }
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
        
    }
}


