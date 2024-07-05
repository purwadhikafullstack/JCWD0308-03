'use server'
import { cookies } from 'next/headers';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';


const session = cookies().get('token')?.value;

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
                Authorization: `Bearer ${session}`,
            }
            })
        return res
    } catch (error) {
        console.log(error);   
    }
}
// export async function getUserServerSide(cookies:any) {
//     try {
//         const token = cookies().get('token')?.value
//         let decoded: { id: string, role: string, iat: number, exp: number } = { id: '', role: '', iat: 0, exp: 0 }
//         if (token) decoded = jwtDecode(token) 
//         // const res = await (await getRequest(/user/${decoded.id})).json()
//         const user = res.data;
//         return user;
//     } catch (error) {
//         return null
//     }
// }

