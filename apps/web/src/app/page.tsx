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
                id={property.id}
                key={property.id}
                name={property.name}
                description={property.description}
                category={property.category}
                city={property.city}
                country={property.country}
                price={3000000}
                pictures={'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                />
                
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
}
