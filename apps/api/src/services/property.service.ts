import prisma from "@/prisma";

export class PropertyService {
    async getProperties(): Promise<any> {
        return await prisma.property.findMany();
    }

    // async getPropertyById (): Promise<any> {
    //     return await prisma.property.findUnique({
    //         where: {
    //             // id: +req
    //         }
    //     })
    // }
}