"use server"

export const createRoom = async (data:any, id : number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}rooms/${id}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const res = await response.json()
        return res
        
    } catch (error:any) {
        console.log(" failed to create room : ", error);
        return error.message || error || error.message.name
    }
}


export const editRoom = async (data:any, id : number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}rooms/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const res = await response.json()
        return res
    } catch (error:any) {
        console.log(" failed to edit room : ", error);
    }

}


export const deleteRoom = async (id : number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}rooms/${id}`, {
            method : 'DELETE',
        })

        const res = await response.json()
    } catch (error) {
        console.log('failed to delete room : ', error);
        
    }
}

export const createPeakSeason = async (data:any, id : number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}rooms/${id}/peak-season`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const res = await response.json()
        return res 

    } catch (error:any) {
        console.log(" failed to create peak season : ", error)
    }
}