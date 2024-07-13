'use client';
import { Button } from '@/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Wrapper from '@/components/wrapper';
import { uploadImages } from '@/lib/properties';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

const UploadImage = ({ params }: { params: { id: number } }) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState<string[]>([]);
  const router = useRouter();

  

  const toast = useToast();

  const handleChange = () => {
    if (imageRef.current && imageRef.current.files) {
      const filesArray = Array.from(imageRef.current.files);
      setImage((previewImg) => [...previewImg, ...filesArray]);


      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setPreviewImg((prevPreviews) => [...prevPreviews, reader.result as string]);
          }
        }
        reader.readAsDataURL(file);
      })
    }
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      image.forEach((file) => {
        formData.append('files', file);
      });

      const res = await uploadImages(params.id, formData, 'rooms');
      console.log('res upload: ', res);
      if (res.status === 'ok') {
        toast.toast({
          title: 'Image successfully uploaded, now you can manage your property!',
          duration: 3000,
        });
        setTimeout(() => router.push(`/tenant/properties`), 3500)
      } else {
        toast.toast({
          title: 'Failed to upload image',
          description:
            res.message || res.message.name || 'Unknown error occurred',
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.log('Failed to upload image:', error);
      toast.toast({
        title: 'Failed to upload image',
        description: error.message || 'Unknown error occurred',
        duration: 3000,
      });
    }
  };

  return (
    <Wrapper>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle>Upload Room Image</CardTitle>
          <CardDescription >
            Show how your room looks like to guest
          </CardDescription>
        </CardHeader>
        <CardContent>
          {previewImg.length > 0 ? (
            <div className="grid grid-cols-2 pb-6 gap-2">
                {previewImg.map((img, index) => (
                <div key={index} className="relative w-full h-[28vh]">
                  <Image
                    src={img}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              onClick={() => imageRef.current?.click()}
              className={`
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-2
                border-dashed
                border-neutral-300
                flex
                flex-col
                items-center
                justify-center
                p-20
                gap-4
                text-neutral-600
                mb-3
              `}
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Click to upload at least 2 images</div>
              <input
                type="file"
                multiple
                ref={imageRef}
                onChange={handleChange}
                className="hidden"
              />
            </div>
          )}

          <Button
            label="Upload"
            onClick={handleUpload}
            disabled={loading || image.length ==0}
          />
          {previewImg.length > 0 && (
            
            <div
              onClick={() => imageRef.current?.click()}
              className="mt-4 border-2 border-neutral-300 cursor-pointer text-neutral-600 hover:opacity-70 transition flex items-center justify-center p-4 gap-2"
            >
              <TbPhotoPlus size={24} className='mr-2'/>
              Add more images
              <input
                type="file"
                multiple
                ref={imageRef}
                onChange={handleChange}
                className="hidden"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default UploadImage;
