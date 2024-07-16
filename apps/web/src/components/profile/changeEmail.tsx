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
import { changePassword, sendUpdateEmail } from "@/lib/account"
import { ErrorMessage, Field, Form, Formik } from "formik"
import Cookies from "js-cookie"
import * as yup from 'yup'
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"


export function ChangeEmail() {
    const token = Cookies.get('token');
    const {toast} = useToast()
    const router = useRouter()

    const handleSubmit = async () => {
      if (!token){
        toast({
          title: 'Your session has expired, please login again',
        })
        setTimeout(() => {
          router.push('/login')
        }, 3000)
        return
      }
      if (token){
        const res = await sendUpdateEmail(token)
        if (res.status === 'ok'){
          toast({
            title: 'Email has been sent, please check your email',
            duration: 3000
          })
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        }
      }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Change Email</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
          <DialogDescription>
            Are you sure want to change your email? We will send you an email to confirm.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
          onClick={handleSubmit} 
          type="submit" 
          className="bg-[#00a7c4] hover:bg-[#00a7c4] hover:opacity-70">Send Email Confirmation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
