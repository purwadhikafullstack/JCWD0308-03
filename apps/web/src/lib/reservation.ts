async function createReservation(propertyId: number, userId: number, roomId: number, startDate: string, endDate: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}transactions/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        propertyId,
        userId,
        roomId,
        startDate,
        endDate
      })
    });
    if (!response.ok) {
      throw new Error('Failed to create reservation');
    }
    const responseData = await response.json();
    console.log('Server response:', responseData);

    if (!responseData.success) {
      throw new Error('Failed to create reservation');
    }
    return responseData;
  } catch (error) {
    console.error('Failed to create reservation:', error);
    throw error;
  }
}