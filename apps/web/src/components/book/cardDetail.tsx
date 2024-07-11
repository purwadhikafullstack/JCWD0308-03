'use client'
import {useState, useEffect} from "react";
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from 'next/image'
import { getRoomsbyId } from "@/lib/transaction";
import { useAppSelector } from "@/hooks/hooks";
import { BiLoaderCircle } from "react-icons/bi";

export default function CardDetail({id}:{id:number}) {
  const user = useAppSelector((state) => state.user.value)
  const [room, setRoom] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        const room = await getRoomsbyId(id);
        setRoom(room)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [id])

  if (loading) {
    return (
      <div className='flex justify-center items-center'>
      <BiLoaderCircle className='size-24 animate-spin h-screen text-[#00a7c4]' /> 
    </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
    <article className="overflow-hidden rounded-lg shadow-lg transition hover:shadow-lg">
      <Image
        alt="" src={room?.RoomPicture[0].url!}
        width={800} height={500}
        className="h-56 w-full object-cover"
      />
      <div className="bg-white p-4 sm:p-6">
        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900">
            How to position your furniture for positivity
          </h3>
          <h3 className="mt-0.5 text-lg text-gray-900">
            Room Price:{room?.price.toLocaleString("id-ID" , {style: "currency", currency: "IDR"} )}
          </h3>
        </a>
      </div>
    </article>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {room?.id}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>{room?.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {room?.type} x <span>2 </span>
                  </span>
                  <span>$250.00</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>$329.00</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Customer Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Customer</dt>
                  <dd>{user?.name}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">liam@acme.com</a>
                  </dd>
                </div>
              </dl>
            </div>
          </CardContent>
        </Card>
        </div>
  );
}
