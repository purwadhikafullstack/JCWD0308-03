"use client"
import FormComp from "@/components/auth/Form"
import { toast, useToast } from "@/components/ui/use-toast";
import { updateEmail } from "@/lib/account";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from 'yup'

const UpdateEmail = ({ params }: { params: { token: string } }) => {
    const updateEmailSchema = yup.object().shape({
        email: yup.string().email().required('Email is required'),
    });

    const {toast} = useToast()
    const router = useRouter()

    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (values: any, actions: any) => {
        setLoading(true);
        try{
            const response = await updateEmail(values, params.token);
            
            if (response.status === 'ok') {
                toast({
                    title: 'Success',
                    duration: 4000,
                });
                setTimeout(() => router.push('/profile'), 4000)
            } else {
                toast({
                    title: 'Failed',
                    description: response.message || response,
                    duration: 4000,
                    variant: 'destructive',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An unexpected error occurred. Please try again.',
                variant: 'destructive',
            })
        }
    }
    return (
        <div>
            <FormComp
                title="Update Email"
                subtitle="Enter your new email"
                buttonLabel="Update Email"
                linkHref="/"
                linkTitle="Don't want to update your email?"
                linkDescription="Back to home page"
                fields={[
                    {
                        name: 'email',
                        label: 'Email',
                        type: 'email',
                        placeholder: 'Enter your email',
                    },
                ]}
                initialValues={{ email: '' }}
                onSubmit={handleSubmit}
                validationSchema={updateEmailSchema}

            />
        </div>
    )
}

export default UpdateEmail