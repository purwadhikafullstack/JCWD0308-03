import prisma from '@/prisma';

export async function getPropertiesService(
  category: string | undefined,
  province: string | undefined,
  name: string | undefined,
  page: number,
  size: number,
  sortBy: string,
  order: 'asc' | 'desc',
): Promise<any[]> {
  const properties = await prisma.property.findMany({
    where: {
      category: category?.toLowerCase() || undefined,
      province: province?.toLowerCase() || undefined,
      name: name?.toLowerCase() || undefined,
    },
    take: size || 10,
    skip: (page || 0) * (size || 10),
    orderBy: {
      [sortBy || 'createdAt']: order || 'asc',
    },
    include: {
      rooms: {
        include: {
          RoomPeekSeason: true,
          RoomPicture: true,
          roomFacilities: true,
          bathroomFacilities: true,
        },
      },
      reviews: true,
      Tenant: true,
      Reservation: true,
      PropertyPicture: true,
    },
  });

  return properties;
}

export async function getPropertyById(id: string): Promise<any> {
  const property = await prisma.property.findUnique({
    where: {
      id: +id,
    },
    include: {
      reviews: true,
      Tenant: true,
      rooms: {
        include: {
          RoomPicture: true,
          roomFacilities: true,
          bathroomFacilities: true,
        },
      },
      Reservation: true,
      PropertyPicture: true,
    },
  });

  return property;
}

export async function deletePropertyService(propertyId: number) {
    return prisma.$transaction(async (prisma) => {
        await prisma.propertyPicture.deleteMany({ where: { propertyId } });
        await prisma.reservation.deleteMany({ where: { room: { propertyId } } });
        await prisma.roomPeakSeason.deleteMany({ where: { room: { propertyId } } });
        await prisma.review.deleteMany({ where: { propertyId } });
        await prisma.roomPicture.deleteMany({ where: { room: { propertyId } } });
        await prisma.roomFacilities.deleteMany({ where: { room: { propertyId } } });
        await prisma.bathroomFacilities.deleteMany({ where: { room: { propertyId } } });
        await prisma.roomAvailability.deleteMany({ where: { room: { propertyId } } });
        await prisma.room.deleteMany({ where: { propertyId } });

        const deletedProperty = await prisma.property.delete({
            where: { id: propertyId },
        });

        return deletedProperty;
    });
}


export async function getPropertiesByTenantId(tenantId: number) {
    return prisma.property.findMany({
        where: { tenantId },
        include: {
            rooms: true,
            reviews: true,
            Tenant: true,
            Reservation: true,
            PropertyPicture: true,
        },
    });
}

export async function updatePropertyById(id: number, data: {
    name: string;
    description: string;
    category: string;
    address: string;
    city: string;
    province: string;
    district: string;
}) {
    return prisma.property.update({
        where: { id },
        data,
    });
}