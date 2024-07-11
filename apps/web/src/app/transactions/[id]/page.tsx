import Wrapper from "@/components/wrapper";
import ReservationForm from "@/components/book/reservationForm";
import CardDetail from "@/components/book/cardDetail";
import { param } from "cypress/types/jquery";

export default function  transactions({params} : {params:{id:number}}) {
  return (
    <Wrapper>
    <div className="min-h-screen pt-20">
      <div className="container mx-auto">
        <div className="flex justify-between text-black items-center mb-6">
          <h1 className="text-2xl font-bold">Confirm and Pay</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ReservationForm id={params.id}/>
          </div>
          <div>
          <div className="flex flex-col gap-5">
            <CardDetail id={params.id}/>
          </div> 
          </div>
        </div>
      </div>
    </div>
    </Wrapper>
  )
}