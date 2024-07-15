import prisma from "@/prisma";

export async function getRoomById(id: number) {
    return prisma.room.findUnique({
        where: { id },
        include: {
            property: true,
            roomFacilities: true,
            bathroomFacilities: true,
            RoomPicture: true,
        },
    });
}


export async function createRoom(data: {
    type: string;
    price: number;
    description: string;
    capacity: number;
    bedDetails: string;
    propertyId: number;
    facilities?: string[];
    bathroomFacilities?: string[];
}) {
    const createdRoom = await prisma.room.create({
        data: {
            type: data.type,
            price: data.price,
            description: data.description,
            capacity: data.capacity,
            bedDetails: data.bedDetails,
            propertyId: data.propertyId,
        },
        include: {
            roomFacilities: true,
            bathroomFacilities: true,
        }
    });

    if (data.facilities && data.facilities.length > 0) {
        await prisma.roomFacilities.createMany({
            data: data.facilities.map((facility: string) => ({
                name: facility,
                roomId: createdRoom.id,
            }))
        });
    }

    if (data.bathroomFacilities && data.bathroomFacilities.length > 0) {
        await prisma.bathroomFacilities.createMany({
            data: data.bathroomFacilities.map((facility: string) => ({
                name: facility,
                roomId: createdRoom.id,
            }))
        });
    }

    return createdRoom;
}


export async function updateRoom(data: {
    id: number;
    type: string;
    price: number;
    description: string;
    capacity: number;
    bedDetails: string;
    roomFacilities?: string[];
    bathroomFacilities?: string[];
}) {
    const updatedRoom = await prisma.room.update({
        where: { id: data.id },
        data: {
            type: data.type,
            price: data.price,
            description: data.description,
            capacity: data.capacity,
            bedDetails: data.bedDetails,
        },
    });

    if (data.roomFacilities && data.roomFacilities.length > 0) {
        await prisma.roomFacilities.deleteMany({ where: { roomId: data.id } }); // Delete existing roomFacilities
        const createRoomFacilities = data.roomFacilities.map((name: string) => ({
            name,
            roomId: data.id,
        }));
        await prisma.roomFacilities.createMany({ data: createRoomFacilities });
    }

    if (data.bathroomFacilities && data.bathroomFacilities.length > 0) {
        await prisma.bathroomFacilities.deleteMany({ where: { roomId: data.id } }); // Delete existing bathroomFacilities
        const createBathroomFacilities = data.bathroomFacilities.map((name: string) => ({
            name,
            roomId: data.id,
        }));
        await prisma.bathroomFacilities.createMany({ data: createBathroomFacilities });
    }

    return updatedRoom;
}


export async function deleteRoomService(id: number) {
    await prisma.$transaction(async (prisma) => {
        await prisma.roomPicture.deleteMany({ where: { roomId: id } });
        await prisma.roomFacilities.deleteMany({ where: { roomId: id } });
        await prisma.bathroomFacilities.deleteMany({ where: { roomId: id } });
        await prisma.roomPeakSeason.deleteMany({ where: { roomId: id } });
        await prisma.roomAvailability.deleteMany({ where: { roomId: id } });

        const deletedRoom = await prisma.room.delete({
            where: { id },
        });

        return deletedRoom;
    });
}