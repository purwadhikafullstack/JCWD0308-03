import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPeakSeason } from '@/lib/room';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CalendarPeakSeaon } from './calendarSetDate';
import { Room } from '@/type/property.type';
import { toast } from '@/components/ui/use-toast';

interface SetRoomPeakSeasonProps {
  roomId: number;
  onUpdatePeakSeason: () => void;
  room: Room
}
const validationSchema = Yup.object().shape({
  newPrice: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .integer('Price must be an integer'),
  start_date: Yup.date().required('Start date is required'),
  end_date : Yup.date().required('End date is required'),
});
export function SetRoomPeakSeason({ roomId, onUpdatePeakSeason, room }: SetRoomPeakSeasonProps) {

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })


  const formik = useFormik({
    initialValues: {
      newPrice: room.price,
      start_date : date?.from || new Date(),
      end_date : date?.to || new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createPeakSeason(values, roomId);
        
        if (response.status === 'ok') {
          toast({
            title: 'Peak Season created successfully',
            duration: 3000
          })
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          toast({
            title: 'Failed to create peak season',
            description: response.message,
            duration: 3000
          })
        }
        
        onUpdatePeakSeason();
      } catch (error) {
        console.error('Failed to create peak season:', error);
      }
    },
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='link' className="underline" >Set Peak Season</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Set Room Peak Season</DialogTitle>
            <DialogDescription>
              Provide details for setting peak season and click save when done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateRange" className="text-right">
                  Date Range
                </Label>
                <CalendarPeakSeaon setDate={setDate} date={date}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPrice" className="text-right">
                  Price
                </Label>
                <Input
                  id="newPrice"
                  name="newPrice"
                  required
                  type="number"
                  value={formik.values.newPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="col-span-3"
                />
              </div>
              {formik.touched.newPrice && formik.errors.newPrice ? (
                <div className="text-red-600">{formik.errors.newPrice}</div>
              ) : null}
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-[#00a7c4] hover:bg-[#00a7c4] hover:opacity-70">Set</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
