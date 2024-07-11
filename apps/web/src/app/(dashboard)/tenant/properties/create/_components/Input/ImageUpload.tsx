import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';
import { FieldProps } from 'formik';

interface ImageUploadProps extends FieldProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ field, form }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)) {
        setError("File type must be .jpg, .jpeg, .png, or .gif");
        return;
      }

      setError(null);
      const formData = new FormData();
      formData.append("files", file);

      try {
        const response = await fetch('YOUR_IMAGE_UPLOAD_ENDPOINT', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (err) {
        console.error(err);
        setError("Failed to upload image");
        return;
      }
    }

    const updatedImages = [...(field.value || []), ...uploadedUrls];
    form.setFieldValue(field.name, updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = field.value.filter((_: string, i: number) => i !== index);
    form.setFieldValue(field.name, updatedImages);
  };

  return (
    <div>
      <div
        onClick={() => fileInputRef.current?.click()}
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
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          accept="image/jpeg,image/jpg,image/png,image/gif"
          onChange={handleUpload}
        />
        {error && <div className="text-red-500">{error}</div>}
      </div>
      {field.value && field.value.length > 0 && (
        <div className='grid grid-cols-2 gap-2'>
          {field.value.map((imageUrl: string, index: number) => (
            <div key={index} className='relative w-full h-32'>
              <Image src={imageUrl} alt={`Uploaded image ${index + 1}`} fill style={{ objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
