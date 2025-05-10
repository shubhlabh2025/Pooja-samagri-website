import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';


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
    <div className="w-full">
    
    </div>
  );
};

export default BannerCarousel;
