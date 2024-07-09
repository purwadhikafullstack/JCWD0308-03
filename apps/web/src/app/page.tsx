import PropertyCard from '@/components/home/PropertyCard';
import EmptyState from '@/components/EmptyState';
import Wrapper from '@/components/wrapper';
import HeroSection from '@/components/home/HeroSection';
import Categories from '@/components/home/Categories';
import { getProperties } from '@/lib/properties';
import { useAppSelector } from '@/hooks/hooks';
import { getUser } from '@/lib/account';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

export default async function Home() {
  const properties = await getProperties();
  const token = Cookies.get('token')
  
  console.log('properties: ', properties);
  

  const isEmpty = false;
  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <div className=''>
      {/* <HeroSection /> */}
      <Wrapper>
      <Categories />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          {properties.map((property: any) => {
            return (
              <PropertyCard
                key={property.id}
                property={property}
                room={property.rooms[0]}
                />
                
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
}
