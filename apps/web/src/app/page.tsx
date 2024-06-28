import PropertyCard from '@/components/home/PropertyCard';
import EmptyState from '@/components/EmptyState';
import Wrapper from '@/components/wrapper';
import getProperties from '@/lib/properties';
import HeroSection from '@/components/home/HeroSection';
import Categories from '@/components/home/Categories';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default async function Home() {
  const properties = await getProperties();
  console.log("get rooms : " , properties[0].rooms[0].type);
  // console.log("get reviews : " , properties[1].reviews);
  // console.log("get tenants : " , properties[1].Reservation);
  console.log("get property pict : " , properties[0].PropertyPicture[0].url);
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
                key={property.id}
                name={property.name}
                description={property.description}
                category={property.category}
                pictures={'/'}
              />
            );
          })}
        </div>

        {/* <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> */}
      </Wrapper>
    </div>
  );
}
