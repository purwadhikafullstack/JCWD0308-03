import { Response } from 'express';

export const responseError = (res: Response, error: any) => {
  return res.status(400).send({
    status: 'error',
    message: error,
  });
};

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