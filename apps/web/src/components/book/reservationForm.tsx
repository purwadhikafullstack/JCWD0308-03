'use client'
import { useState } from 'react';
import { DatePickerWithRange } from './calendar';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function ReservationForm() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })
  const [propertyId, setPropertyId] = useState('1');
  const [userId, setUserId] = useState('1');
  const [roomId, setRoomId] = useState('1');
  // const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  // const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}transactions/reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          propertyId ,
          userId,
          roomId,
          date
        })
      });
      const result = await response.json();
      const paymentLink = result.redirect_url;
      router.push(paymentLink)
      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }
      const responseData = await response.json();
      console.log('Server response:', responseData);
      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }
      if (responseData.success) {
        alert('Reservation created successfully');
      } else {
        alert('Failed to create reservation');
      }
    } catch (error) {
      console.error('Failed to create reservation:', error);
    }
  }
  return (
      <div className='form'>
        <form onSubmit={handleSubmit}>
            <div className="card shadow-md text-black p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Your Trip</h2>
              <div className="flex flex-col justify-between mb-4 gap-5">
              <DatePickerWithRange date={date} setDate={setDate} />
              </div>
            </div>
            <div className="mt-6 text-black">
              <h2 className="text-xl font-semibold mb-4">Cancellation policy</h2>
              <div className="card p-6">
                <p>If canceled before five days before check in, you will get a partial refund. After that, the reservation fee is non-refundable.</p>
              </div>
            </div>
            <div className="mt-6 text-black">
              <h2 className="text-xl font-semibold mb-4">Basic rules</h2>
              <div className="card gap-5 p-6">
                <p>We ask each guest to remember a few simple things about what needs to be done to be a great guest.</p>
                <ul className='ul list-disc px-5'>
                  <li>Obey the house rules</li>
                  <li>Treat your Hosts home like your own</li>
                </ul>
              </div>
            </div>
            <Button type="submit" variant="outline" className='btn bg-[#00a7c4] text-white mt-6 w-full'>Confirm and Pay</Button>
        </form>
    </div>
  );
}