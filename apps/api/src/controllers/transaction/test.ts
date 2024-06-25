// async createReservation(req: Request, res: Response) {
//     try {
//       const { propertyId, userId, roomId, date } = req.body;
//       const room = await prisma.room.findUnique({ where: { id: +roomId } });
//       if (!room) {
//         return res.status(404).json({ message: 'Room not found' })}
//       const numberOfDays = calculateNumberOfDays(date.from, date.to);
//       const totalPrice = calculateTotalPrice(numberOfDays, room.price);
//       const reservation = await prisma.reservation.create({
//         data: {
//           propertyId: +propertyId,
//           userId: +userId,
//           roomId: +roomId,
//           startDate: new Date(date.from),
//           endDate: new Date(date.to),
//           price: totalPrice,
//           status: 'Pending', // Assuming default status
//         },
//       });
//       let data = {
//         transaction_details: {
//           order_id: reservation.id.toString(),
//           gross_amount: totalPrice,
//         },
//         expiry: {
//           unit: 'minutes',
//           duration: 10,
//         },
//       };
//       const secret = process.env.MIDTRANS_PUBLIC_SECRET as string;
//       const encededSecret = Buffer.from(secret).toString('base64');
//       const basicAuth = `Basic ${encededSecret}`;
//       const response = await fetch(`${process.env.MIDTRANS_PUBLIC_API}`, {
//         method: 'POST',
//         headers: {
//           'Access-Control-Allow-Origin': 'true',
//           "Accept": 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': basicAuth,
//         },
//         body: JSON.stringify(data),
//       });
//       const paymentLink = await response.json();
//       res.status(201).json(paymentLink);
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   }