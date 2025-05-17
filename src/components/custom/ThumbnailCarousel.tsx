import { ChevronLeft, ChevronRight } from "lucide-react";
import  { useState, useEffect } from "react";

const thumbnails = [
  "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/banner.jpg",
  "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/banner.jpg",
  "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/banner.jpg",
  "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
];

const ThumbnailCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 3 : 4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showNext = () => {
    if (startIndex + visibleCount < thumbnails.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const showPrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleThumbnails = thumbnails.slice(
    startIndex,
    startIndex + visibleCount,
  );

  return (
    <div className="relative mt-6 flex items-center">
      {/* Back Arrow */}
      {startIndex > 0 && (
        <button
          onClick={showPrev}
          className="mr-2 rounded-full bg-gray-200 p-1 hover:bg-gray-300"
        >
          <ChevronLeft />
        </button>
      )}

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-hidden">
        {visibleThumbnails.map((src, index) => {
          const actualIndex = startIndex + index;
          const isSelected = actualIndex === selectedIndex;
          return (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${actualIndex}`}
              onClick={() => setSelectedIndex(actualIndex)}
              className={`h-20 w-20 cursor-pointer rounded-md border-2 object-cover ${
                isSelected ? "border-black" : "border-gray-300"
              }`}
            />
          );
        })}
      </div>

      {/* Next Arrow */}
      {startIndex + visibleCount < thumbnails.length && (
        <button
          onClick={showNext}
          className="ml-2 rounded-full bg-gray-200 p-1 hover:bg-gray-300"
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default ThumbnailCarousel;
