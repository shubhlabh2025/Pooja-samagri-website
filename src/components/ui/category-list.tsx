import React, { useState } from 'react';

interface CategoryItem {
  categoryId: string;
  categoryImage: string;
  categoryText: string;
}

interface CategoryListProps {
  categories: CategoryItem[];
  onCategoryClick: (categoryId: string) => void;
}

const PAGE_SIZE = 20;

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategoryClick }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, categories.length));
  };

  const visibleItems = categories.slice(0, visibleCount);

  return (
    <div className="p-4">
   <div className="flex overflow-x-auto gap-4 items-center hide-scrollbar snap-x snap-mandatory scroll-smooth">
  {visibleItems.map((item) => (
<div
  key={item.categoryId}
  className="flex flex-col items-center min-w-[100px] cursor-pointer snap-start"
  onClick={() => onCategoryClick(item.categoryId)}
>
  <div className="h-36 flex flex-col items-center justify-between">
    <div className="bg-[#fff5f8] rounded-xl p-3 w-24 h-24 flex items-center justify-center shadow-sm">
      <img
        src={item.categoryImage}
        alt={item.categoryText}
        className="h-16 object-contain"
      />
    </div>
    <span className="text-sm text-center w-24 font-medium leading-tight mt-1 line-clamp-2">
      {item.categoryText}
    </span>
  </div>
</div>

  ))}

  {/* Load More button also snaps */}
  {visibleCount < categories.length && (
    <button
      onClick={handleLoadMore}
      className="min-w-[100px] h-24 flex flex-col items-center justify-center bg-pink-50 text-pink-800 rounded-xl shadow-sm px-3 py-2 text-sm font-medium hover:bg-pink-100 snap-start"
    >
      Load More
    </button>
  )}
</div>

    </div>
  );
};

export default CategoryList;
