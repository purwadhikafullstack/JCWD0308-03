import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
// Helper function to calculate the number of days
export function calculateNumberOfDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }
// Helper function to calculate the total price
export function calculateTotalPrice(numberOfDays: number, price: number): number {
    return numberOfDays * price;
  }
// Create a new reservation and process payment
export async function createReservationAndProcessPayment(data: { propertyId: number, userId: number, roomId: number,date: { from: string, to: string }}) {
    const { propertyId, userId, roomId, date } = data;
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) throw new Error('Room not found');
    const numberOfDays = calculateNumberOfDays(date.from, date.to);
    const totalPrice = calculateTotalPrice(numberOfDays, room.price);
    const reservation = await prisma.reservation.create({
      data: {
        propertyId,
        userId,
        roomId,
        startDate: new Date(date.from),
        endDate: new Date(date.to),
        price: totalPrice,
        status: 'Pending',
      },
    });
    const paymentDetails = {
      transaction_details: {
        order_id: reservation.id.toString(),
        gross_amount: totalPrice,
      },
      expiry: {
        unit: 'minutes',
        duration: 10,
      },
    }
    return { paymentDetails, reservation };
}
// Send payment request to Midtrans
export async function sendPaymentRequest(paymentDetails: any) {
    const secret = process.env.MIDTRANS_PUBLIC_SECRET as string;
    const encodedSecret = Buffer.from(secret).toString('base64');
    const response = await fetch(process.env.MIDTRANS_PUBLIC_API || '', {
      method: 'POST',
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedSecret}`,
      },
      body: JSON.stringify(paymentDetails),
    });
    if (!response.ok) throw new Error('Failed to create payment link');
    return await response.json();
  }