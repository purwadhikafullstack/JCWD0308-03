'use client'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import Wrapper from "@/components/wrapper"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { formatDateTime, formatToIDR } from "@/lib/user.service"
import { getSales } from "@/lib/tanantSales"
import { SalesDatePickerWithRange } from "@/components/salesReport/calendar"
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

export default function Management() {
  const [orderList, setOrderList] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const token = Cookies.get('token')
  const total = orderList.filter((order : any) => order.status == 'Confirmed').reduce((a:number ,b:any) => a + b.price, 0)
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })
  
  useEffect(() => {
    const getOrderList = async (token: string | undefined) => {
    try {
      const sales = await getSales(token, date!)
      setOrderList(sales)
    } catch (error) {
      setError('Failed to fetch order list')
    } finally {
      setIsLoading(false)
    }
  }
  getOrderList(token)
}, [token, date])
if (isLoading) return <div>Loading...</div>
if (error) return <div>Error: {error}</div>
return (
<Wrapper>
<div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Details of the items purchased, including quantity, price per item, and total cost.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Total Sales</CardDescription>
                  <CardTitle className="text-4xl">{formatToIDR(total)}</CardTitle>
                </CardHeader>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <SalesDatePickerWithRange date={date} setDate={setDate}/>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your room.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">Property</TableHead>
                          <TableHead className="hidden sm:table-cell">Room</TableHead>
                          <TableHead className="hidden sm:table-cell">Status</TableHead>
                          <TableHead className="hidden md:table-cell">Check In</TableHead>
                          <TableHead className="hidden md:table-cell">Check Out</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderList?.map((orderList : any) =>{
                          const checkIn = new Date(orderList.startDate)
                          const checkOut = new Date(orderList.endDate)
                          return (
                            <TableRow key={orderList.id}>
                            <TableCell>
                              <div className="font-medium">{orderList.user.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">{orderList.user.email}</div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{orderList.Property.name}</TableCell>
                            <TableCell className="hidden sm:table-cell">{orderList.room.type}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant={orderList.status == 'Confirmed' ? 'default' : 'destructive' }>{orderList.status}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{formatDateTime(checkIn).dateOnly}</TableCell>
                            <TableCell className="hidden md:table-cell">{formatDateTime(checkOut).dateOnly}</TableCell>
                            <TableCell className="text-right">{formatToIDR(orderList.price)}</TableCell>
                          </TableRow>
                          )})}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
  </div>
  </Wrapper>
  )
}


