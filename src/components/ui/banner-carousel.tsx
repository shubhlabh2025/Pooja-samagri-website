import React, { useEffect, useRef, useState } from "react";

const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = 3000; // 3 seconds

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const images = [
    "https://phool.co/cdn/shop/files/kedarnath_Home_page_banner_Mob.webp?v=1724320539&width=1000",
    "https://phool.co/cdn/shop/files/Banner_Mobile_edbb9fc3-266a-4a39-a9f3-d2a289917a12.jpg?v=1719235460&width=1000",
  ];
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => resetTimeout();
  }, [currentIndex]);

  return (
    <div className="relative w-full max-h-[400px] overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            className="min-w-full max-h-[400px]"
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
