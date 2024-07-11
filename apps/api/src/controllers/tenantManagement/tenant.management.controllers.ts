import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class TenantManagement {
    async getOrderList(req: Request, res: Response) {
        try {
            const { user } = req
            const orders = await prisma.reservation.findMany({
                where: { userId: user?.id},
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
    // async submitReview(req: Request, res: Response) {
    //     const { userId, propertyId, checkOutDate, content } = req.body;
    //     const currentDate = new Date();
    //     const checkOut = new Date(checkOutDate);
    //     if (currentDate < checkOut) {
    //         return res.status(400).json({ error: 'You can only review after check out' });
    //     }
    //     try {
    //         const existingReview = await prisma.review.findFirst({
    //             where: {
    //                 userId,
    //                 propertyId,
    //                 checkOutDate,
    //             }
    //         })
    //         if (existingReview) {
    //             return res.status(400).json({ error: 'You have already reviewed this property' });
    //         }
    //         const rewiew = await prisma.review.create({
    //             data: {
    //                 userId,
    //                 propertyId,
    //                 content,
    //                 checkOutDate,
    //             }
    //         })
    //         res.status(200).json(rewiew);
    //     } catch (error) {
    //         res.status(500).json({ error });
    //     }
    // }
    // async replyReview(req: Request, res: Response) {
    //     const { reviewId, tenantId, replyContent } = req.body;
    //     try {
    //         // const review = await prisma.review.
    //     } catch (error) {
            
    //     }
    // }
}