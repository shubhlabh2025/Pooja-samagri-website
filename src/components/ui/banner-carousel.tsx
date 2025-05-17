import React, { useEffect, useRef, useState } from "react";

const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = 3000; // 3 seconds

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const images = [
    "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/banner.jpg",
    "https://rukminim2.flixcart.com/fk-p-flap/480/80/image/41f7d7fb8967dab4.jpg?q=20",
  ];
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => resetTimeout();
  }, [currentIndex]);

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            className="w-full flex-shrink-0 h-[200px]"
          />
        ))}
      </div>

      {/* Optional: Dot indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
