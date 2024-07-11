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
        console.log('res create room on front fetch: ', res);
        return res
        
    } catch (error:any) {
        console.log(" failed to create room : ", error);
        return error.message || error || error.message.name
    }
}
