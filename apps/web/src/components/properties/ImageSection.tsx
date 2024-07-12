import Image from "next/image";
import { Button } from "../Button"; 
import { PropertyPicture, RoomPicture } from "@/type/property.type";

const ImageSection = ({ images, title }: { images: PropertyPicture[] | RoomPicture[], title: string }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-medium">{title}</h3>
    <div className="flex space-x-2">
      {images.map((img, idx) => (
        <div key={idx} className="w-32 h-32 bg-gray-200 flex items-center justify-center">
          <Image fill src={img.url} alt={`Image ${idx}`} className="object-cover" />
        </div>
      ))}
    </div>
    <Button label="Add Image" />
  </div>
)

export default ImageSection;
