import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/hooks/hooks';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useToast } from '../ui/use-toast';
import { editProfile } from '@/lib/account';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ChangePassword } from './changePassword';


const validationSchema = yup.object({
  name: yup.string(),
  password : yup.string(),
  dob: yup.date().nullable(),
  phoneNumber: yup.string().nullable(),
  gender: yup.string().nullable(),
});

export function EditButton() {
  const user = useAppSelector((state) => state.user.value);
  const {toast} = useToast()
  const token = Cookies.get('token');
  const router = useRouter()


  const handleSubmit = async (values: any) => {
    console.log('valuess :', values);
    try {
      if (!token){
        toast({
          title: 'Your session has expired, please login again',
        })
        return router.push('/login')
      }

      if (values.dob) {
        values.dob = new Date(values.dob).toISOString();
      }
      const res = await editProfile(values, token)
      
      if (res.status === 'ok') {
        toast({
          title: 'Profile updated successfully',
          duration: 3000,
        })
        setTimeout(() => {window.location.reload()}, 3000) 
      } else {
        toast({
          title : "Something went wrong please try again!",
          variant: 'destructive'
        })
      }
      
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        description: "Something went wrong. Please try again later.",
        variant: 'destructive',
        duration: 3000,
      })
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-xl underline">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription className='hidden md:block'>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            name: user?.name,
            phoneNumber: user?.phoneNumber,
            dob: user?.dob,
            gender: user?.gender,
            password : '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="grid gap-4 py-4">
              <Label htmlFor="name">Name</Label>
              <Field
                id="name"
                name="name"
                placeholder="Name"
                className="p-3 rounded-sm ring-1 ring-neutral-600"
              />
              <ErrorMessage name="name" />
            </div>
            {user?.isSocialLogin === false && (
            <div className="grid">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <ChangePassword />
              </div>
              <Field
                id="password"
                name="password"
                placeholder="****"
                className="p-3 rounded-sm ring-1 ring-neutral-600"
              />
              <ErrorMessage name="password" />
            </div>
            )}
            <div className="grid gap-4 py-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Field
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                className="p-3 rounded-sm ring-1 ring-neutral-600"
              />
              <ErrorMessage
                name="phoneNumber"
                component={'div'}
                className="text-red-500"
              />
            </div>
            <div className="grid gap-4 py-4">
              <Label htmlFor="dob">Date of Birth</Label>
              <Field
                id="dob"
                type="date"
                name="dob"
                placeholder="Date of Birth"
                className="p-3 rounded-sm ring-1 ring-neutral-600"
              />
              <ErrorMessage
                name="dob"
                component={'div'}
                className="text-red-500"
              />
            </div>
            <div className="grid gap-4 py-4">
              <Label htmlFor="gender">Gender</Label>
              <Field
                id="gender"
                name="gender"
                placeholder="Gender"
                className="p-3 rounded-sm ring-1 ring-neutral-600"
              />
              <ErrorMessage
                name="gender"
                component={'div'}
                className="text-red-500"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-[#00a7c4] hover:bg-[#00a7c4] hover:opacity-70">
                Save changes
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
