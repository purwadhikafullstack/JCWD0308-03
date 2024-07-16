import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateNumberOfDays, calculateTotalPrice, createPaymentLink,} from '@/services/reservation.service';
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient();
export class UserTransaction {
  // Create a new reservation
  async createReservation(req: Request, res: Response) {
    try {
      const { propertyId, userId, roomId, date, } = req.body;
      const room = await prisma.room.findUnique({ where: { id: +roomId } });
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      const numberOfDays = calculateNumberOfDays(date.from, date.to);
      const totalPrice = calculateTotalPrice(numberOfDays, room.price);
      const reservation = await prisma.reservation.create({
        data: {
          id: uuidv4(),
          propertyId: +propertyId,
          userId: +userId,
          roomId: +roomId,
          startDate: new Date(date.from),
          endDate: new Date(date.to),
          price: totalPrice,
          status: 'Pending', // Assuming default status
        },
      });
      const paymentLink = await createPaymentLink(reservation.id, totalPrice)
      res.status(201).json(paymentLink)
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // Get order list for a user
  async getUserReservationsById(req: Request, res: Response) {
    const { user } = req
    try {
      const reservations = await prisma.reservation.findMany({
        where: { userId: user?.id },
        select: {
          id: true,
          startDate: true,
          endDate: true,
          status: true,
          price: true,
          room: {
            include: {
              property: true,
            }
          },
        }
      });
      res.status(200).json(reservations);
    } catch (error) {
      console.error('Failed to get reservations:', error);
      res.status(500).json({ error: 'Failed to get reservations' });
    }
  }
  // Cancel a reservation
  async cancelReservation(req: Request, res: Response) {
    try {
      const { reservationId } = req.body;
      const canceledReservation = await prisma.reservation.update({
        where: { id: reservationId },
        data: { status: 'Cancelled' },
      });
      res.status(200).json(canceledReservation);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // Get transaction status
  async getTransactionStatus(req: Request, res: Response) {
    try {
      if (req.body.transaction_status === 'settlement') {
        const updatedReservation = await prisma.reservation.update({
          where: { id: req.body.order_id },
          data: { status: 'Confirmed' },
        });
        res.status(200).json(updatedReservation);
      } else if (req.body.transaction_status === 'pending') {
        return;
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
