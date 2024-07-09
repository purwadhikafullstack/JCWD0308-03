'use client'
import { PropertyPicture } from '@/type/property.type'
import React, { useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

interface PropertyImgCarouselProps {
    propertyPict: PropertyPicture[]
}
const PropertyImgCarousel: React.FC<PropertyImgCarouselProps> = ({ propertyPict }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
      const isFirstSlide = currentSlide === 0;
      const newIndex = isFirstSlide ? propertyPict.length - 1 : currentSlide - 1;
      setCurrentSlide(newIndex);
    };
  
    const nextSlide = () => {
      const isLastSlide = currentSlide === propertyPict.length - 1;
      const newIndex = isLastSlide ? 0 : currentSlide + 1;
      setCurrentSlide(newIndex);
    };
  
    const goToSlide = (slideIndex: number) => {
      setCurrentSlide(slideIndex);
    };
  return (
    <div>
        <div
        style={{ backgroundImage: `url(${propertyPict[currentSlide].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-700"
      ></div>
      <div className="hidden transition duration-700 group-hover:block hover:scale-105 hover:bg-[#00a7c4] hover:text-white absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-white text-[#00a7c4] cursor-pointer">
        <MdNavigateBefore onClick={prevSlide} size={24} />
      </div>
      <div className="hidden transition duration-700 group-hover:block hover:scale-105 hover:bg-[#00a7c4] hover:text-white absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-3xl rounded-full p-2 bg-white text-[#00a7c4] cursor-pointer">
        <MdNavigateNext onClick={nextSlide} size={24} />
      </div>
      <div className="hidden absolute group-hover:flex bottom-10 left-1/2 -translate-x-1/2 justify-center py-2">
        {propertyPict.map((pict, pictIndex) => (
          <div
            key={pictIndex}
            className={`mx-1 cursor-pointer ${currentSlide === pictIndex ? 'text-[#00a7c4]' : 'text-white'}`}
            onClick={() => goToSlide(pictIndex)}
          >
            <GoDotFill size={12} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyImgCarousel