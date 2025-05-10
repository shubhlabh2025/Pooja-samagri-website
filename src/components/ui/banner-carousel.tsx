import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
interface BannerItem {
  imageUrl: string;
  altText: string;
}

const bannerItems: BannerItem[] = [
  {
    imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/480/80/image/41f7d7fb8967dab4.jpg?q=20',
    altText: 'Beds From ₹8,999',
  },
  {
    imageUrl: 'https://rukminim2.flixcart.com/fk-p-flap/480/80/image/41f7d7fb8967dab4.jpg?q=20',
    altText: 'Sleepyhead Offer',
  },

];

const BannerCarousel: React.FC = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent >
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="w-full">
                  <img 
                  src='https://rukminim2.flixcart.com/fk-p-flap/480/80/image/41f7d7fb8967dab4.jpg?q=20'
                  className="w-full"></img>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='top-1/2 left-2'/>
      <CarouselNext className='top-1/2 right-2'/>
    </Carousel>
  );
};

export default BannerCarousel;
