import type { SubCategorySidebarProps } from "@/interfaces/sub-category-sidebar";

const SubCategorySideBar = ({
  selectedCategoryId,
  categoryData,
  subCategoryData,
  handleUpdateCategory,
}: SubCategorySidebarProps) => {
  if (!categoryData?.id) {
    return <div className="p-4">No category data available.</div>;
  }

  if (!selectedCategoryId) {
    return <div className="p-4">No category selected.</div>;
  }

  const isCategorySelected = selectedCategoryId === categoryData.id;

  return (
    <>
      <li
        key={categoryData.id}
        className="relative flex w-full cursor-pointer flex-col items-center gap-2 pr-1 pl-3 sm:flex-row sm:justify-center"
        onClick={() => handleUpdateCategory(categoryData.id)}
      >
        <div
          className={`flex items-center justify-center rounded-[8px] border border-[#02060c26] ${
            isCategorySelected
              ? "bg-[image:var(--bg-selected-subcategory)]"
              : "bg-[#f0f0f5]"
          }`}
        >
          <img
            src={categoryData.image}
            alt={categoryData.name}
            className={`aspect-[100/109] h-fit w-11 min-w-11 origin-bottom rounded-[8px] transition-transform duration-300 ease-out ${
              isCategorySelected ? "scale-[1.3]" : "scale-100"
            }`}
          />
        </div>
        <div
          className={`line-clamp-2 w-full text-center text-[13px] leading-[17px] font-normal tracking-[-0.33px] break-words sm:text-start ${
            isCategorySelected ? "text-[#ff5200]" : "text-[#02060c99]"
          } sm:w-30`}
        >
          {categoryData.name}
        </div>
        <div
          className={`absolute top-1/2 left-[0] h-[80%] w-1 translate-y-[-50%] rounded-tr-full rounded-br-full bg-[#ff5200] ${isCategorySelected ? "visible transition-transform duration-300 ease-in" : "invisible transition-none"}`}
        ></div>
      </li>

      {subCategoryData.map((subCategory) => {
        const isSelected = selectedCategoryId === subCategory.id;

        return (
          <li
            key={subCategory.id}
            className="relative flex w-full cursor-pointer flex-col items-center gap-2 pr-1 pl-3 sm:flex-row sm:justify-center"
            onClick={() => handleUpdateCategory(subCategory.id)}
          >
            <div
              className={`flex items-center justify-center rounded-[8px] border border-[#02060c26] ${
                isSelected
                  ? "bg-[image:var(--bg-selected-subcategory)]"
                  : "bg-[#f0f0f5]"
              }`}
            >
              <img
                src={subCategory.image}
                alt={subCategory.name}
                className={`aspect-[100/109] h-fit w-11 min-w-11 origin-bottom rounded-[8px] transition-transform duration-300 ease-out ${
                  isSelected ? "scale-[1.3]" : "scale-100"
                }`}
              />
            </div>
            <div
              className={`line-clamp-2 w-full text-center text-[13px] leading-[17px] font-normal tracking-[-0.33px] break-words sm:text-start ${
                isSelected ? "text-[#9e1e62]" : "text-[#02060c99]"
              } sm:w-30`}
            >
              {subCategory.name}
            </div>
            <div
              className={`absolute top-1/2 left-0 h-[80%] w-1 translate-y-[-50%] rounded-tr-full rounded-br-full bg-[#9e1e62] ${isSelected ? "visible transition-transform duration-300 ease-in" : "invisible transition-none"}`}
            ></div>
          </li>
        );
      })}
    </>
  );
};

export default SubCategorySideBar;
