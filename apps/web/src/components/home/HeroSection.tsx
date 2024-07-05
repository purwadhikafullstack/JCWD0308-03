'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Search from './Search';


const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const img = [
    'https://images.unsplash.com/photo-1605181063694-e64a8e7a267f?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ]

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section
      className="py-52 w-full h-[500px] bg-cover bg-center text-center text-white"
      style={{ backgroundImage: `url(${img[0]})` }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl text-[#4a4a4a] font-bold mb-4">
          Booking a room has never been easier!
        </h1>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />  
        
      </div>
    </section>
  );
};

export default HeroSection;
