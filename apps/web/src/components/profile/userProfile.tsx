'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Wrapper from '../wrapper';
import { MdVerified } from 'react-icons/md';
import { EditButton } from './editButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { IoCamera } from 'react-icons/io5';
import { useRef, useState, useEffect } from 'react';
import { uploadImage } from '@/lib/account';
import Cookies from 'js-cookie';
import { useToast } from '../ui/use-toast';
import { useAppSelector } from '@/hooks/hooks';
import { BiLoaderCircle } from 'react-icons/bi';

export function UserProfile() {
    const {toast} = useToast();
    const token = Cookies.get("token");

    const imageRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const userProfile = useAppSelector((state) => state.user.value);

    const handleChange = async (e: any) => {
        if (imageRef.current && imageRef.current.files) {
            const file = imageRef.current.files[0];

            // Validation: Check file size and type
            if (file.size > 1048576) {
                setError("Each file must be less than 1MB");
                return;
            }
            if (!["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)) {
                setError("File type must be .jpg, .jpeg, .png, or .gif");
                return;
            }

            setError(null);
            const previewUrl = URL.createObjectURL(file);
            setImage(previewUrl);

            try {
                const formData = new FormData();
                formData.append("file", file);

                console.log('formData : ', formData);

                const response = await uploadImage(formData, token);
                if (response.status === 'ok') {
                    toast({
                        title: 'Image successfully updated',
                        duration: 3000, 
                    })
                    window.location.reload();
                } else {
                    throw new Error(response.message || "Unknown error occurred");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to upload image");
            } finally {
                // Clean up the preview URL after upload
                URL.revokeObjectURL(previewUrl);
            }
        }
    }

    useEffect(() => {
        if (userProfile) {
            setLoading(false);
        }
    }, [userProfile]);

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
               <BiLoaderCircle className='size-24 animate-spin h-screen text-[#00a7c4]' />
            </div>
        )
    }

    return (
        <Wrapper>
            <div className="grid md:grid-cols-1">
                <Card className="shadow-2xl rounded-xl">
                    {/* <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
                    </CardHeader> */}
                    <CardContent className="flex flex-col items-center pt-6">
                        <Avatar className="w-48 h-48 z-0">
                            <AvatarImage src={userProfile?.profile || '/images/placeholder.png'} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {/* INPUT PHOTO */}
                        <div className='w-20 h-8 rounded-full bg-white shadow-2xl z-10 border-2 -mt-5 '>
                            <label htmlFor="file-input" className='flex items-center justify-center gap-1 px-1'>
                                <IoCamera />Edit
                            </label>
                            <input
                                id='file-input'
                                ref={imageRef}
                                type='file'
                                accept='image/png, image/gif, image/jpeg, image/jpg, image/gif'
                                className='hidden'
                                onChange={handleChange}
                            />
                        </div>
                        {error && <p className='text-red-500'>{error}</p>}
                        <div className='flex items-center gap-1'>
                            <div className="text-2xl font-bold">{userProfile?.name}</div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <MdVerified fill='blue' size={24} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Account Verified</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <p>{userProfile?.role === 'user' ? 'Traveler' : "Tenant"}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid md:grid-cols-1 gap-8 pt-12">
                <Card className="shadow-2xl rounded-xl">
                    <CardHeader className="flex flex-col items-center">
                        <div className="text-3xl font-bold">Personal Information</div>
                    </CardHeader>
                    <CardContent className='flex flex-col items-start'>
                        <div className="w-full mb-4 pt-2 flex items-center justify-between">
                            <div>
                                <div className="text-lg font-medium">Name</div>
                                <div className="text-base text-muted-foreground">{userProfile?.name}</div>
                            </div>
                            <EditButton />
                        </div>
                        <hr className="my-2 border-muted-foreground" />
                        <div className="w-full mb-4 flex items-center justify-between">
                            <div>
                                <div className="text-lg font-medium">Email</div>
                                <div className="text-base text-muted-foreground">{userProfile?.email}</div>
                            </div>
                            <EditButton />
                        </div>
                        <hr className="my-2 border-muted-foreground" />
                        <div className="w-full mb-4 flex items-center justify-between">
                            <div>
                                <div className="text-lg font-medium">Phone Number</div>
                                <div className="text-base text-muted-foreground">123-456-7890</div>
                            </div>
                            <EditButton />
                        </div>
                        <hr className="my-2 border-muted-foreground" />
                    </CardContent>
                </Card>
            </div>
        </Wrapper>
    );
}
