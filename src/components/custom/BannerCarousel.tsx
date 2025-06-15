import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import type { AdBanner } from "@/interfaces/ad-banner";

interface AdBannerCarouselProps {
  adBanner: AdBanner[];
}

const BannerCarousel: React.FC<AdBannerCarouselProps> = ({
  adBanner,
}: AdBannerCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
        <CarouselContent className="rounded-none">
          {adBanner.map((banner, index) => (
            <CarouselItem key={index} className="rounded-none">
              <div className="">
                <img
                  src={banner.image}
                  className="flex max-h-[300px] w-full items-center justify-center"
                ></img>
                {/* <Card>
                  <CardContent className="flex aspect-square max-h-[300px] items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card> */}
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
                <span className="animate-indicator-progress absolute top-0 left-0 h-full w-full rounded-full bg-black" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
