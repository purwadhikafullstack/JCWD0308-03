import Wrapper from "@/components/wrapper";
import ReservationForm from "@/components/book/reservationForm";
import CardDetail from "@/components/book/cardDetail";
// import { useState } from "react";

export default function  Transaction() {
  // const [propertyId, setPropertyId] = useState('');
  // const [userId, setUserId] = useState('');
  // const [roomId, setRoomId] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  return (
    <Wrapper>
    <div className="min-h-screen pt-20">
      <div className="container mx-auto">
        <div className="flex justify-between text-black items-center mb-6">
          <h1 className="text-2xl font-bold">Confirm and Pay</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ReservationForm />
          </div>
          <div>
          <div className="flex flex-col gap-5">
            <CardDetail/>
          </div> 
          </div>
        </div>
      </div>
    </div>
    </Wrapper>
  )
}