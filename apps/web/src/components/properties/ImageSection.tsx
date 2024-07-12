import Image from 'next/image';
import { PropertyPicture, RoomPicture } from '@/type/property.type';
import { Button } from '../Button';
import { useRouter } from 'next/navigation';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageSectionProps {
  images: PropertyPicture[] | RoomPicture[];
  title: string;
  isRoom: boolean;
  id: number;
}

const ImageSection: React.FC<ImageSectionProps> = ({ images, title, isRoom, id }) => {
  const router = useRouter();

  const handleAddImage = () => {
    if (isRoom) {
      router.push(`/tenant/properties/room/upload-images/${id}`);
    } else {
      router.push(`/tenant/properties/create/upload-images/${id}`);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={img.url}
              alt={`Image ${idx}`}
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div onClick={handleAddImage}
      className='mt-4 rounded-lg border-2 border-neutral-700 cursor-pointer text-neutral-600 hover:opacity-70 transition flex items-center justify-center p-4 gap-2'
      >
        <TbPhotoPlus size={24} className='mr-2'/>
        Add more images
      </div>
    </div>
  );
};

export default ImageSection;
