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
import { DatePickerWithRange } from '@/components/book/calendar';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface SetRoomPeakSeasonProps {
  roomId: number;
  onUpdatePeakSeason: () => void;
}
const validationSchema = Yup.object().shape({
  newPrice: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .integer('Price must be an integer'),
  start_date: Yup.date().required('Start date is required'),
  end_date : Yup.date().required('End date is required'),
});
export function SetRoomPeakSeason({ roomId, onUpdatePeakSeason }: SetRoomPeakSeasonProps) {

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })
  const formik = useFormik({
    initialValues: {
      newPrice: '',
      start_date : date?.from || new Date(),
      end_date : date?.to || new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createPeakSeason(values, roomId);
        console.log('Peak season created:', response);
        window.location.reload();
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
              {/* Input fields for peak season details */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dateRange" className="text-right">
                  Date Range
                </Label>
                {/* <DatePickerWithRange date={date} setDate={setDate} /> */}
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
