import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class TenantManagement {
    async getOrderList(req: Request, res: Response) {
        const tenantId  = parseInt(req.params.tenantId);
        try {
            const orders = await prisma.reservation.findMany({
                where: {Property: { tenantId }},
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
    async confirmPayment(req: Request, res: Response) {
        const { reservationId, status } = req.body;
        try {
            const updatedReservation = await prisma.reservation.update({
                where: { id: reservationId },
                data: { status },
            });
        } catch (error) {
            
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