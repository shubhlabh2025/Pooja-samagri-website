import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const BannerCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const images = [
    "https://phool.co/cdn/shop/files/kedarnath_Home_page_banner_Mob.webp?v=1724320539&width=1000",
    "https://phool.co/cdn/shop/files/Banner_Mobile_edbb9fc3-266a-4a39-a9f3-d2a289917a12.jpg?v=1719235460&width=1000",
  ];

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <div className="relative">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square max-h-[300px] items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {count > 0 && (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 transform justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "relative h-1 overflow-hidden rounded-full transition-all duration-300",
                index === current - 1
                  ? "w-12 bg-[#00000021]"
                  : "w-3 bg-[#00000021]",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === current - 1 && (
                <span className="animate-indicator-progress absolute top-0 w-full left-0 h-full rounded-full bg-black" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
