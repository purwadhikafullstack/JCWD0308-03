import Image from 'next/image';
import styles from './page.module.css';
import Wrapper from '@/components/wrapper';
import Search from '@/components/home/Search';
import { getProperties } from '@/lib/property';
import PropertyCard from '@/components/home/PropertyCard';
import { property } from 'cypress/types/lodash';
import EmptyState from '@/components/EmptyState';

export default async function Home() {
  const properties = await getProperties();

  const isEmpty = false;
  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <div className="pt-24 sm:pt-32 md:pt-40 xl:pt-44">
      <Wrapper>
        <Search />
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {properties.properties.map((property: any) => {
            return (
              <PropertyCard
                key={property.id}
                name={property.name}
                description={property.description}
                category={property.category}
                pictures={property.pictures}
              />
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
}
