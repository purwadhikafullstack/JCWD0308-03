import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class TenantManagement {
    async getOrderList(req: Request, res: Response) {
        const { id } = req.query;
        try {
            const orders = await prisma.reservation.findMany({
                where: {Property: { id: +id!}},
                include: {
                    user: true,
                    room: true,
                },
            });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async cancelReservation(req: Request, res: Response) {
        const { reservationId } = req.body;
        try {
            const canceledReservation = await prisma.reservation.update({
                where: { id: reservationId },
                data: { status: 'Cancelled' },
            });
            res.status(200).json(canceledReservation);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}