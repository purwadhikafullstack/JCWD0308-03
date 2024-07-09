import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import { FieldProps } from 'formik';

interface ImageUploadProps extends FieldProps {
    value: string;
    onChange: (value: string) => void;
}

declare global {
  var cloudinary: any;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ field, form }) => {
  const handleUpload = useCallback((result: any) => {
    form.setFieldValue(field.name, result.info.secure_url);
  }, [form, field.name]);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='irmnkn6j'
      options={{ maxFiles: 10 }}
    >
      {({ open }) => (
        <div 
          onClick={() => open?.()}
          className='
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
          '
        >
          <TbPhotoPlus size={50} />
          <div className='font-semibold text-lg'>Click to upload</div>
          {field.value && (
            <div className='absolute inset-0 w-full h-full'>
              <Image fill src={field.value} alt='Uploaded image' style={{ objectFit: 'cover' }} />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};
