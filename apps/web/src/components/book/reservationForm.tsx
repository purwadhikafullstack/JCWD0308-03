import { useState } from 'react';
import axios from 'axios';

export default function ReservationForm() {
  const [propertyId, setPropertyId] = useState('');
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event : any) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/reservations', {
        propertyId,
        userId,
        roomId,
        startDate,
        endDate,
        price,
      });

      console.log(response.data);
    } catch (error) {
      console.error('Failed to create reservation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Property ID:
        <input type="text" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
      </label>
      <label>
        User ID:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <label>
        Room ID:
        <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      </label>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button type="submit">Create Reservation</button>
    </form>
  );
}