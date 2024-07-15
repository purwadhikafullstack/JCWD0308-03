'use client'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader,TableRow, } from "@/components/ui/table"
import Wrapper from "@/components/wrapper"
import { getUserReservationsById } from "@/lib/transaction"
import { formatDateTime, formatToIDR } from "@/lib/user.service"
import { Reservation } from "@/type/reservation.type"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function UserReservation() {
  const token = Cookies.get('token')
  const [reservation, setReservation] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReservations = async (token: any) => {
      try {
        const res = await getUserReservationsById(token)
        setReservation(res)
      } catch (error) {
        console.log(error);
        setError('Failed to fetch reservations')
      } finally {
        setIsLoading(false)
      }
    }
    fetchReservations(token)
    
  },[token])
if (isLoading) return <div>Loading...</div>
if (error) return <div>Error: {error}</div>
  
  return (
    <Wrapper>
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Your Trip</CardTitle>
        <CardDescription>Recent trip from your reservations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property </TableHead>
              <TableHead className="hidden sm:table-cell">Type Room</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Check In</TableHead>
              <TableHead className="hidden md:table-cell">Check Out</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservation?.map((reservation : Reservation)=> {
              const checkIn = new Date(reservation.startDate)
              const checkOut = new Date(reservation.endDate)
              return (
              <TableRow className="bg-accent" key={reservation.id}>
              <TableCell>{reservation.room.property.name}</TableCell>
              <TableCell className="hidden sm:table-cell">{reservation.room.type}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant={reservation.status == 'Confirmed' ? 'default' : 'destructive' }>{reservation.status}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{formatDateTime(checkIn).dateOnly}</TableCell>
              <TableCell className="hidden md:table-cell">{formatDateTime(checkOut).dateOnly}</TableCell>
              <TableCell className="text-right">{formatToIDR(reservation.price)}</TableCell>
            </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </Wrapper>
  )
}
