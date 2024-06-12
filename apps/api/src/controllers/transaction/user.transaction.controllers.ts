import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class UserTransaction {
  // Create a new reservation
  async createReservation(req: Request, res: Response) {
    try {
      const { propertyId, userId, roomId, startDate, endDate, price } =
        req.body;
      const reservation = await prisma.reservation.create({
        data: {
          propertyId,
          userId,
          roomId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          price,
          status: 'Pending', // Assuming default status
        },
      });
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // Upload payment proof
  async uploadPaymentProof(req: Request, res: Response) {
    const { reservationId, paymentProof } = req.body;
    try {
      // Retrieve the payment associated with the reservation
      const payment = await prisma.payment.findFirst({
        where: { reservationId },
      });
      if (!payment) {
        return res
          .status(404)
          .json({ message: 'Payment not found for this reservation.' });
      }
      // Update the payment proof
      const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          proof: paymentProof,
          status: 'Confirmed', // Update status after payment proof is uploaded
        },
      });
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  // Get order list for a user
  async getUserReservations(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const reservations = await prisma.reservation.findMany({
        where: { userId: parseInt(userId, 10) },
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
}
