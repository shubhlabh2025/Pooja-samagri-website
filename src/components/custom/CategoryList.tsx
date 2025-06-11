import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router";

const CategoryList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCategoriesQuery({});

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories.</div>;
  if (!data || data.data.length === 0) return <div>No categories found.</div>;

  return (
    <ScrollArea className="scrollbar-none w-full overflow-x-auto">
      <div className="flex w-max items-start gap-3 px-4">
        {data.data.map((category) => (
          <div
            key={category.id}
            className="flex w-[100px] shrink-0 flex-col items-center gap-2"
            onClick={() => navigate(`/categories/${category.id}`)}
          >
            <div className="rounded-lg bg-[#fef3f9]">
              <img
                src={category.image}
                alt={category.name}
                className="aspect-[1/1.1] w-full rounded object-cover"
              />
            </div>
            <p className="line-clamp-2 min-h-8.5 w-full text-center text-[13px] leading-[17px] font-semibold tracking-[-0.33px] break-words text-[#02060cbf]">
              {category.name}
            </p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="h-0" />
    </ScrollArea>
  );
};

export default CategoryList;
