import PropertyCard from '@/components/home/PropertyCard';
import EmptyState from '@/components/EmptyState';
import { getProperties } from '@/lib/properties';
import HeroSection from '@/components/home/HeroSection';
import Categories from '@/components/home/Categories';
import Footer from '@/components/home/Footer';
import { Property, Room } from '@/type/property.type';

export default async function Home({ searchParams }:any) {
  const initialCategory = searchParams.category || '';
  const properties = await getProperties(initialCategory);
  
  const isEmpty = properties.length === 0;

  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <div className='pt-28'>
      <HeroSection />
      <div className='mx-auto max-w-screen-xl py-8 px-4 sm:px-6 sm:py-6 lg:px-8 '>
        <Categories />
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {properties.map((property: any) => (
            <PropertyCard
              key={property.id}
              property={property}
              room={property.rooms[0]}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
