'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';

const HeroSection: React.FC = () => {
  const router = useRouter();

  const img = [
    '/images/1.png',
    '/images/7.png',
    '/images/9.png',
    '/images/10.png',
    '/images/12.png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? img.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentSlide === img.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <section className="relative h-[60vh] rounded-b-3xl bg-cover bg-center bg-no-repeat opacity-90" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1532204153975-d02c743d220b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}>

      <div className="relative rounded-2xl mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-full lg:items-center lg:px-8">
        <div className="w-full h-[40vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img[currentSlide]})`, backgroundSize: 'contain' }}>
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-full lg:items-center lg:px-8">
          </div>

          <div className="transition duration-700 absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-white text-[#00a7c4] cursor-pointer">
            <MdNavigateBefore onClick={prevSlide} size={32} />
          </div>
          <div className="transition duration-700 absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-3xl rounded-full p-2 bg-white text-[#00a7c4] cursor-pointer">
            <MdNavigateNext onClick={nextSlide} size={32} />
          </div>
          <div className="absolute flex bottom-10 left-1/2 -translate-x-1/2 justify-center py-2">
            {img.map((pict, pictIndex) => (
              <div
                key={pictIndex}
                className={`mx-1 cursor-pointer ${currentSlide === pictIndex ? 'text-[#00a7c4]' : 'text-white'}`}
                onClick={() => goToSlide(pictIndex)}
              >
                <GoDotFill size={24} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
