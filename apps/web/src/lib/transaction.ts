
export const getTransactionById = async (token: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}tenantManagements/orderList`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data 
    } catch (error) {
        console.log(error);   
    }
}
export const getRoomsbyId = async (id:number) => {
    try {
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
export const getUserReservationsById = async (token : any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}transactions/user/reservation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
    }
}


