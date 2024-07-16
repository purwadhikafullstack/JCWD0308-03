import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useAppSelector } from "@/hooks/hooks"
import { changePassword } from "@/lib/account"
import { ErrorMessage, Field, Form, Formik } from "formik"
import Cookies from "js-cookie"
import * as yup from 'yup'
import { useToast } from "../ui/use-toast"

const validationSchema = yup.object({
    password : yup.string().min(6, 'Password must be at least 6 characters').max(15, 'Password must be less than 15 characters').required('Current Password is required'),
    newPassword : yup.string().min(6, 'Password must be at least 6 characters').max(15, 'Password must be less than 15 characters').required('New Password is required'),
})

export function ChangePassword() {
    const token = Cookies.get('token');
    const {toast} = useToast()

    const handleSubmit = async (values: any) => {
        try {
         const res = await changePassword(values, token!)   
         if (res.status === 'ok') {
             toast({
                 title: 'Password changed successfully',
                 duration: 3000,
             })
             setTimeout(() => {window.location.reload()}, 3000)
         } else if ( res.status == "error"){
            toast({title: res.error, duration: 3000 , variant: "destructive"})
         }

        } catch (error) {
        toast({title: 'Failed to change password please try agai!', duration: 3000 , variant: "destructive"})
        }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Formik
        initialValues={{password : '', newPassword : ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            <Form>
            <div className="grid gap-4 py-4">
                <Label htmlFor="password" >Current Password</Label>
                <Field
                id="password"
                name="password"
                placeholder="Current Password"
                className="p-3 rounded-sm ring-1 ring-neutral-600"
                />
                <ErrorMessage component={"div"} className="text-red-500" name="password"/>
            </div>
            <div className="grid gap-4 py-4">
                <Label htmlFor="newPassword" >New Password</Label>
                <Field
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                className="p-3 rounded-sm ring-1 ring-neutral-600"
                />
                <ErrorMessage component={"div"} className="text-red-500" name="newPassword"/>
            </div>
        <DialogFooter>
          <Button type="submit" className="bg-[#00a7c4] hover:bg-[#00a7c4] hover:opacity-70">Save changes</Button>
        </DialogFooter>
            </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
