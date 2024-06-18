import CardDetail from "@/components/book/cardDetail";
import ReservationForm from "@/components/book/reservationForm";
import Wrapper from "@/components/wrapper";

export default function  Transaction() {
  return (
    <Wrapper>
    <div className="min-h-screen pt-20">
      <div className="container mx-auto">
        <div className="flex justify-between text-black items-center mb-6">
          <h1 className="text-2xl font-bold">Confirm and Pay</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <ReservationForm />
          </div>
          {/* Summary Section */}
          <div>
            <CardDetail /> 
          </div>
        </div>
        
      </div>
    </div>
    </Wrapper>
  )
}