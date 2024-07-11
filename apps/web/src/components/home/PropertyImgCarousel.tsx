'use client'
import { PropertyPicture } from '@/type/property.type'
import Image from 'next/image'
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
        <div className="relative w-full h-full group">
            {propertyPict.length > 0 && (
                <Image
                    src={propertyPict[currentSlide].url}
                    alt={`Property Image ${currentSlide + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="duration-500 aspect-square"
                />
            )}
            {propertyPict.length > 1 && (
                <>
                    <button onClick={prevSlide} className="absolute hidden group-hover:block hover:scale-110 text-[#00a7c4] left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full">
                        <MdNavigateBefore size={24} />
                    </button>
                    <button onClick={nextSlide} className="absolute hidden group-hover:block hover:scale-110 text-[#00a7c4] right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full">
                        <MdNavigateNext size={24} />
                    </button>
                </>
            )}
            <div className="absolute hidden group-hover:flex  bottom-2 left-1/2 transform -translate-x-1/2  space-x-1">
                {propertyPict.map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)}>
                        <GoDotFill size={20} className={index === currentSlide ? 'text-[#00a7c4]' : 'text-white'} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PropertyImgCarousel;
