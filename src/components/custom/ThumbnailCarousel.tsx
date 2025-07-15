import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface ThumbnailCarouselProps {
  images: string[];
  selectedImageIndex?: number;
  onImageSelect?: (index: number) => void;
}

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  images,
  selectedImageIndex = 0,
  onImageSelect,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 3 : 4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset start index when images change
  useEffect(() => {
    setStartIndex(0);
  }, [images]);

  // Auto-scroll to show selected image if it's not visible
  useEffect(() => {
    if (
      selectedImageIndex < startIndex ||
      selectedImageIndex >= startIndex + visibleCount
    ) {
      const newStartIndex = Math.max(
        0,
        Math.min(
          selectedImageIndex - Math.floor(visibleCount / 2),
          images.length - visibleCount,
        ),
      );
      setStartIndex(newStartIndex);
    }
  }, [selectedImageIndex, startIndex, visibleCount, images.length]);

  const showNext = () => {
    if (startIndex + visibleCount < images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const showPrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleImageClick = (index: number) => {
    const actualIndex = startIndex + index;
    onImageSelect?.(actualIndex);
  };

  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  const visibleThumbnails = images.slice(startIndex, startIndex + visibleCount);

  // Don't show carousel if only one image
  if (images.length === 1) {
    return null;
  }

  return (
    <div className="relative mt-6 flex items-center">
      {/* Back Arrow */}
      {startIndex > 0 && (
        <button
          onClick={showPrev}
          className="mr-2 rounded-full bg-gray-200 p-1 transition-colors hover:bg-gray-300"
          aria-label="Previous images"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-hidden">
        {visibleThumbnails.map((src, index) => {
          const actualIndex = startIndex + index;
          const isSelected = actualIndex === selectedImageIndex;
          return (
            <img
              loading="lazy"
              key={actualIndex}
              src={src}
              alt={`Product thumbnail ${actualIndex + 1}`}
              onClick={() => handleImageClick(index)}
              className={`h-20 w-20 cursor-pointer rounded-md border-2 object-cover transition-all duration-200 hover:opacity-80 ${
                isSelected
                  ? "border-black shadow-md"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              loading="lazy"
            />
          );
        })}
      </div>

      {/* Next Arrow */}
      {startIndex + visibleCount < images.length && (
        <button
          onClick={showNext}
          className="ml-2 rounded-full bg-gray-200 p-1 transition-colors hover:bg-gray-300"
          aria-label="Next images"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default ThumbnailCarousel;
