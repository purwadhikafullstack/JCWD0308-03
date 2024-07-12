import { DateRange } from "react-day-picker";

export const getSales = async (token : any, date : DateRange) => {
    try {
        const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_API_URL}tenantManagements/sales`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body : JSON.stringify(date)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
    }
}