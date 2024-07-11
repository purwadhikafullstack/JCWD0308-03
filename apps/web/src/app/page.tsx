import PropertyCard from '@/components/home/PropertyCard';
import EmptyState from '@/components/EmptyState';
import Wrapper from '@/components/wrapper';
import Categories from '@/components/home/Categories';
import { getProperties } from '@/lib/properties';

export default async function Home() {
  const properties = await getProperties();
  const isEmpty = false;
  if (isEmpty) {
    return <EmptyState showReset />;
  }
  return (
    <div className=''>
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
