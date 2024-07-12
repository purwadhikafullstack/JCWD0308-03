'use client'
import { ListFilter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import Wrapper from "@/components/wrapper"
import { useState, useEffect } from "react"
import { getTransactionById } from "@/lib/transaction"
import Cookies from "js-cookie"
import { formatDateTime, formatToIDR } from "@/lib/user.service"

export default function Management() {
  const [orderList, setOrderList] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const token = Cookies.get('token')
  useEffect(() => {
    const getOrderList = async (token: string | undefined) => {
    try {
      const res = await getTransactionById(token)
      setOrderList(res)
    } catch (error) {
      console.log(error);
      setError('Failed to fetch order list')
    } finally {
      setIsLoading(false)
    }
  }
  getOrderList(token)
}, [token])
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
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week 
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                              <Badge className="text-xs" variant="secondary">{orderList.status}</Badge>
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


