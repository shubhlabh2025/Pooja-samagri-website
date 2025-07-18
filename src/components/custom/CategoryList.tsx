import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";

const CategoryList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCategoriesQuery({
    sort_by: "priority",
    sort_order: "DESC",
  });

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories.</div>;
  if (!data || data.data.length === 0) return <div></div>;

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-5">
        <p className="text-lg leading-4 font-medium break-words whitespace-nowrap text-[#02060cbf]">
          Shop By Category
        </p>
        <div className="h-[1px] flex-1 [background:var(--bg-categroy-line)]"></div>
        <div
          className="flex cursor-pointer items-center gap-0.5"
          onClick={() => navigate("/categories")}
        >
          <p className="text-[13px] leading-[17px] font-semibold tracking-[-0.33px] whitespace-nowrap text-[#ff5200]">
            See All
          </p>
          <ChevronRight color="#ff5200" size={18} />
        </div>
      </div>
      <ScrollArea className="scrollbar-none w-full overflow-x-auto">
        <div className="flex w-max items-start gap-5 px-4">
          {data.data.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center gap-2"
              onClick={() => navigate(`/categories/${category.id}`)}
            >
              <div className="rounded-[37.5px] bg-[#fef3f9]">
                <img
                  loading="lazy"
                  src={category.image}
                  alt={category.name}
                  className="aspect-square w-[100px] rounded-[37.5px] object-cover"
                />
              </div>
              <p className="line-clamp-2 min-h-8.5 w-full text-center text-[13px] leading-[17px] font-light tracking-[-0.33px] break-words text-[#323232]">
                {category.name}
              </p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-0" />
      </ScrollArea>
    </>
  );
};

export default CategoryList;
