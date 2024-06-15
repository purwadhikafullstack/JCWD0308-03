import Search from '@/components/home/Search';
import PropertyCard from '@/components/home/PropertyCard';
import EmptyState from '@/components/EmptyState';
import Wrapper from '@/components/wrapper';
import getProperties from '@/lib/properties';
import HeroSection from '@/components/home/HeroSection';
import { useEffect, useState } from 'react';
import Categories from '@/components/home/Categories';

export default async function Home() {
  // const properties = await getProperties();

  const isEmpty = false;
  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <div className="pt-24 sm:pt-32 md:pt-40 xl:pt-44">
      <Wrapper>
        <HeroSection />
        <Categories />
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {/* {properties.map((property: any) => {
            return (
              <PropertyCard
                key={property.id}
                name={property.name}
                description={property.description}
                category={property.category}
                pictures={property.pictures}
              />
            );
          })} */}
        </div>
      </Wrapper>
    </div>
  );
}
