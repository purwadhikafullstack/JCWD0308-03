'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Search from './Search';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section
      className="bg-cover bg-center py-20 text-center text-white"
      style={{ backgroundImage: "url('/path-to-your-hero-background.jpg')" }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our Property Listings!
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
