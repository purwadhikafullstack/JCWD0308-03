import PropertyCard from '@/components/home/PropertyCard';
import EmptyState from '@/components/EmptyState';
import Wrapper from '@/components/wrapper';
import HeroSection from '@/components/home/HeroSection';
import Categories from '@/components/home/Categories';
import { getProperties } from '@/lib/properties';

export default async function Home() {
  const properties = await getProperties();
  // console.log("get rooms : " , properties[0].rooms[0].type);
  // console.log("get reviews : " , properties[1].reviews);
  // console.log("get tenants : " , properties[1].Reservation);
  // console.log("get property pict : " , properties[0].PropertyPicture[0].url);
  // const pict = properties[0].PropertyPicture[1].url;

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
          {properties.map((property: any) => {
            return (
              <PropertyCard
                id={property.id}
                key={property.id}
                name={property.name}
                description={property.description}
                category={property.category}
                pictures={'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} country={''} city={''}              />
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
}
