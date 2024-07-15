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
// Helper functions paymentLink reservations
export const createPaymentLink = async (orderId: string, totalPrice: number) => {
  const data = {
    transaction_details: {
      order_id: orderId,
      gross_amount: totalPrice,
    },
    expiry: {
      unit: 'minutes',
      duration: 10,
    },
  };
  const secret = process.env.MIDTRANS_PUBLIC_SECRET as string;
  const encodedSecret = Buffer.from(secret).toString('base64');
  const basicAuth = `Basic ${encodedSecret}`;
  const response = await fetch(`${process.env.MIDTRANS_PUBLIC_API}`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': 'true',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: basicAuth,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
